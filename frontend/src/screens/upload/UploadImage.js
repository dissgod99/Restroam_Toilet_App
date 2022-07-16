
import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, View, StyleSheet, Image, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { BACKEND_ENDPOINT_IMAGES } from '../../constants';

export default function UploadImage({ route, navigation }) {

    const { toiletId } = route.params;

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
            console.log(result);
            result.fileName = filename;
            setPhoto(result);
        }
        var legit = await classifyImage(result.base64);

        if (!result.cancelled && legit) {
            for (var i = 0; i < 5; i++) {
                if (imageArray[i][0] == null) {
                    setImageDataArray(oldArray => [].concat([].concat(oldArray.slice(0, i), [result]), oldArray.slice(i + 1, 5)))
                    imageArray[i][1](result.uri);
                    console.log(imageDataArray)
                    break;
                }
            }
        }
        if (!legit) {
            setLegitText("This image contains explicit containt and won't be accepted");
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
        var legit = await classifyImage(result.base64);
        if (!result.cancelled && legit) {
            imageArray[idx][1](result.uri);
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

    const createFormData = (photo, body = {}) => {

        const data = new FormData();
        const tmp = mime.getType(photo.uri);

        data.append('photo', {
            name: photo.uri,
            type: tmp,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        data.append('photoType', tmp);

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
        return data;
    };

    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            // console.log(response);
            if (response) {
                setPhoto(response);
            }
        });
    };

    const handleUploadPhoto = (photo) => {
        let formData = createFormData(photo, { 'toiletId': toiletId });
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        fetch(
            BACKEND_ENDPOINT_IMAGES + 'upload-file',
            {
                method: "POST",
                body: formData,
            }
        )
            .then(({ status, data }) => {
                if (status != 200) {
                    console.log('Refused from server');
                }
                else console.log('Success');
            })
            .catch((err) => {
                console.error(err);
            })
    };

    /* return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             {photo && (
                 <>
                     <Image
                         source={{ uri: photo.uri }}
                         style={{ width: 300, height: 300 }}
                     />
                     <Button title="Upload Photo" onPress={handleUploadPhoto} />
                 </>
             )}
             <Button title="Choose Photo" onPress={pickImage} />
         </View>
     );*/

    function submitData() {
        //submit all the rest of the data too
        console.log(imageDataArray);
        imageDataArray.forEach(d => {
            if (d != null) {
                handleUploadPhoto(d)
            }

        })
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                {imageArray.map((img, idx) => {
                    if (img[0] == null)
                        return (
                            <TouchableOpacity style={{ width: 125, height: 200, backgroundColor: "grey", margin: 5, }} onPress={pickImage} key={idx}>
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
                                <TouchableOpacity key={idx} onPress={() => {
                                    setImageDataArray(oldArray => [].concat([].concat(oldArray.slice(0, idx), [null]), oldArray.slice(idx + 1, 5)))
                                    imageArray[idx][1](null);
                                    console.log(imageDataArray)
                                }} style={{ position: 'absolute', top: 5, left: 100, zIndex: 20 }}>
                                    <Icon name="close" size={30} color={"white"} />
                                </TouchableOpacity>
                                <Image source={{ uri: img[0] }} style={{ width: 125, height: 200, margin: 5 }} onPress={pickImage} />
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
                    navigation.navigate("ThankYou")
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
