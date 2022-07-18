import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, View, StyleSheet, Image, Platform, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import * as mobilenet from '@tensorflow-models/mobilenet';
import forbidden from '../../../Forbidden.json';
import { fetch } from '@tensorflow/tfjs-react-native';
import ThemeContext from '../../darkMode/ThemeContext';
import mime from 'mime';

import axios from "axios";
import { BACKEND_ENDPOINT_IMAGES, BACKEND_ENDPOINT_REVIEWS, BACKEND_ENDPOINT_REV_IMAGES, BACKEND_ENDPOINT_TOILETS } from '../../constants';

export default function UploadImage({ route, navigation }) {

    const { toiletOrReview, updateOrAdd, revTbAdded, toiletTbAdded, token } = route.params;

    // Dark Mode Variable
    const theme = useContext(ThemeContext);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [load, setLoad] = useState(false);
    const imageArray = [[image1, setImage1], [image2, setImage2], [image3, setImage3], [image4, setImage4], [image5, setImage5]];
    const [model, setModel] = useState(null);
    const [legitText, setLegitText] = useState("");
    const [imageDataArray, setImageDataArray] = useState(Array(5).fill(null));

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                setLoad(true);
                await tf.ready();
                setModel(await mobilenet.load());
                setLoad(false);
            }
        })();
    }, []);

    function _base64ToArrayBuffer(base64) {
        return Buffer.from(base64, 'base64');
    }

    function imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3)
        let offset = 0 // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset]
            buffer[i + 1] = data[offset + 1]
            buffer[i + 2] = data[offset + 2]

            offset += 4
        }
        return tf.tensor3d(buffer, [height, width, 3])
    }

    const pickImage = async () => {
        setLoad(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        }).catch(e => console.log(e));
        if (result.cancelled) {
            setLoad(false)
            return;
        }
        if (!result.cancelled) {
            let filename = result.uri.split('/').pop();
            console.log('result: ' + result);
            result.fileName = filename;
        }
        let legit = await classifyImage(result.base64);

        if (!result.cancelled && legit) {
        for (let i = 0; i < 5; i++) {
            if (imageArray[i][0] == null) {
                setImageDataArray(oldArray => [].concat([].concat(oldArray.slice(0, i), [result]), oldArray.slice(i + 1, 5)))
                imageArray[i][1](result);
                console.log('imageDataArray: ' + imageDataArray.toString());
                break;
            }
        }
        }
        if (!legit) {
            setLegitText("This image contains explicit content and won't be accepted");
            setTimeout(function () {
                setLegitText('')
            }, 30000)
        }
        setLoad(false);
    };

    const pickThisImage = async (idx) => {
        setLoad(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        }).catch(e => console.log(e));
        if (result.cancelled) {
            setLoad(false)
            return;
        }

        // let legit = await classifyImage(result.base64);
        let legit = true;

        if (!result.cancelled && legit) {
            imageArray[idx][1](result);
            setImageDataArray(oldArray => [].concat([].concat(oldArray.slice(0, idx), [result]), oldArray.slice(idx + 1, 5)))
            console.log(imageDataArray)
        }
        if (!legit) {
            setLegitText("This image contains explicit containt and won't be accepted");
            setTimeout(function () {
                setLegitText('')
            }, 30000)
        }

        setLoad(false);
    };

    async function classifyImage(base64) {
        const rawImageData = _base64ToArrayBuffer(base64)

        const imageTensor = imageToTensor(rawImageData);
        const test = await model.classify(imageTensor);
        var classes = "";
        test.forEach(x => {
            classes += x.className + ',';
        })
        console.log(classes)
        var result = true;
        forbidden.forEach(f => {
            if (classes.includes(f)) {
                result = false
            }
        });
        return result
    }

    const createFormData = (photos, body = {}) => {

        const data = new FormData();

        photos.forEach((photo) => {
            console.log('photo: ' + JSON.stringify(photo));
            if (photo)
                data.append('photos', {
                    name: photo.uri,
                    type: mime.getType(photo.uri),
                    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                });
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
        return data;
    };

    const handleUploadPhotos = async (photos, toiletAddr, revId) => {
        console.log('toiletId: ' + toiletAddr);
        console.log('revId: ' + revId);
        let formData;
        if (toiletOrReview) {
            formData = createFormData(photos, { 'toiletAddr': toiletAddr });
        } else {
            formData = createFormData(photos, { 'revId': revId });
        }

        console.log('formData: ' + formData);

        let endpoint;

        if (toiletOrReview) {
            endpoint = BACKEND_ENDPOINT_IMAGES + 'upload-files';
        } else {
            endpoint = BACKEND_ENDPOINT_REV_IMAGES + 'upload-files';
        }

        let uploadWasSuccess = await fetch(endpoint, { method: "POST", body: formData })
            .then(({ status }) => {
                if (status != 200) {
                    throw new Error('Refused from server');
                }
                else {
                    console.log('handleUploadPhotos Success');
                    return true;
                }
            }).catch((err) => {
                ToastAndroid.showWithGravity(
                    err.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM);
                return false;
            });
        console.log('uploadWasSuccess: ' + uploadWasSuccess);

        if (!uploadWasSuccess) {
            if (toiletOrReview) {
                deleteToilet(toiletAddr);
                deleteToiletImgs(toiletAddr);
            } else {
                deleteReview(revTbAdded.address);
                deleteReviewImgs(revId);
            }
            navigation.navigate("Home");
        } else {
            navigation.navigate('ThankYou');
        }
    };

    const removeSelectedPhoto = (idx) => {
        setImageDataArray(oldArray => [].concat([].concat(oldArray.slice(0, idx), [null]), oldArray.slice(idx + 1, 5)))
        imageArray[idx][1](null);
        console.log('imageDataArray: ' + imageDataArray);
    };

    const submitData = () => {
        //submit all the rest of the data too

        let endpoint;
        let reqBody;

        if (toiletOrReview) {
            if (updateOrAdd) {
                endpoint = BACKEND_ENDPOINT_TOILETS + 'edit-toilet';
                let { address, newName, newAddress, newPrice, newDetails, newHandicapAccess, newOpeningHours } = toiletTbAdded;
                reqBody = { address, newName, newAddress, newPrice, newDetails, newHandicapAccess, newOpeningHours };
            } else {
                endpoint = BACKEND_ENDPOINT_TOILETS + "add-toilet";
                reqBody = { token, toiletObj: toiletTbAdded };
            }

        } else {
            endpoint = BACKEND_ENDPOINT_REVIEWS + "addReview";
            reqBody = {
                token,
                address: revTbAdded.address,
                cleanliness: revTbAdded.cleanliness,
                waitingtime: revTbAdded.waitingtime,
                security: revTbAdded.security,
                rating: revTbAdded.rating,
                description: revTbAdded.description,
                date: revTbAdded.date,
            };
        }

        axios.post(endpoint, reqBody)
            .then(({ data }) => {

                ToastAndroid.showWithGravity(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM);
                console.log('imageDataArray: ' + imageDataArray);

                if (toiletOrReview) {
                    handleUploadPhotos(imageDataArray, data.toiletAddr, undefined);
                } else {
                    handleUploadPhotos(imageDataArray, undefined, data.reviewId);
                }
            })
            .catch(err => {
                console.log(err);
                ToastAndroid.showWithGravity(
                    err.response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM);
                navigation.navigate("Home");
            });
    };

    const deleteToilet = async (toiletAddr) => {
        axios.post(BACKEND_ENDPOINT_TOILETS + "delete-toilet", { address: toiletAddr })
            .then()
            .catch(err => console.log('Something went terribly wrong: ' + err));
    };

    const deleteReview = async (toiletAddr) => {
        axios.post(BACKEND_ENDPOINT_REV_IMAGES + "deleteReview", { token, address: toiletAddr })
            .then()
            .catch(err => console.log('Something went terribly wrong: ' + err));
    };

    const deleteToiletImgs = (toiletAddr) => {
        axios.post(BACKEND_ENDPOINT_IMAGES + "delete-images-for-toilet", { address: toiletAddr })
            .then()
            .catch(err => console.log('Something went terribly wrong: ' + err));
    }

    const deleteReviewImgs = (revId) => {
        axios.post(BACKEND_ENDPOINT_REV_IMAGES + "delete-images-for-review", { revId })
            .then()
            .catch(err => console.log('Something went terribly wrong: ' + err));
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                {imageArray.map((img, idx) => {
                    if (img[0] == null)
                        return (
                            <TouchableOpacity
                                style={{ width: 125, height: 200, backgroundColor: "grey", margin: 5, }}
                                onPress={pickImage} key={idx}>

                                <Icon name="file-plus" size={30} color={"white"} />
                                <Text style={{
                                    fontSize: 10,
                                    position: "absolute",
                                    top: 90,
                                    color: "white",
                                    left: 7.5
                                }}>
                                    Press to add an image
                                </Text>

                            </TouchableOpacity>
                        );
                    else
                        return (
                            <TouchableOpacity key={idx} onPress={() => pickThisImage(idx)}>
                                <TouchableOpacity key={idx} onPress={() => removeSelectedPhoto(idx)}
                                    style={{ position: 'absolute', top: 5, left: 100, zIndex: 20 }}>
                                    <Icon name="close" size={30} color={"white"} />
                                </TouchableOpacity>
                                <Image source={{ uri: img[0].uri }} style={{ width: 125, height: 200, margin: 5 }} onPress={pickImage} />
                            </TouchableOpacity>
                        )
                })}
            </View>
            <View>
                <Text style={{ color: "red" }}>
                    {legitText}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: theme.submitBtn }]}
                onPress={() => {
                    if (load) {
                        return;
                    }
                    submitData();
                }
                }
            >
                {
                    load ? <ActivityIndicator color="black">

                    </ActivityIndicator> : <Text style={styles.stOfSubmit}>
                        Submit
                    </Text>
                }

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    containerElements: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20
    },
    box: {
        width: 250,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    btn: {
        paddingHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 35,
        marginHorizontal: 75,
        alignItems: "center"

    },
    stOfSubmit: {
        fontWeight: "bold"
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row"
    },
    boxPrice: {
        width: 130

    },
    txt: {
        marginVertical: 10,
        fontWeight: "bold"

    },
    details: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    full: {
        height: "100%"
    },
    position: {
        marginRight: 10
    },
    fab: {
        backgroundColor: '#EA5B70',
    },
    image: {
        marginVertical: 24,
        alignItems: 'center',
    }
});
