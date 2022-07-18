
import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, Image, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { fetch } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import * as mobilenet from '@tensorflow-models/mobilenet';
import forbidden from '../../../Forbidden.json';

export default function UploadImage(navigation) {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [load, setLoad] = useState(false);
    const imageArray = [[image1, setImage1], [image2, setImage2], [image3, setImage3]];
    const [model, setModel] = useState(null);
    const [legitText, setLegitText] = useState("");

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                await tf.ready()
                setModel(await mobilenet.load());
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
        });
        var legit = await classifyImage(result.base64);

        if (!result.cancelled && legit) {
            for (var i = 0; i < 3; i++) {
                if (imageArray[i][0] == null) {
                    imageArray[i][1](result.uri);
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
        });
        var legit = await classifyImage(result.base64);
        if (!result.cancelled && legit) {
            imageArray[idx][1](result.uri);
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

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                {imageArray.map((img, idx) => {
                    if (img[0] == null)
                        return (
                            <TouchableOpacity style={{ width: 125, height: 200, backgroundColor: "grey", margin: 5, }} onPress={pickImage} key={idx}>
                                <Icon name="file-plus" size={30} color={"white"} />
                                {
                                    load ? <ActivityIndicator color="white">

                                    </ActivityIndicator> : <Text style={{
                                        fontSize: 10,
                                        position: "absolute",
                                        top: 90,
                                        color: "white",
                                        left: 7.5
                                    }}>
                                        Press to add an image
                                    </Text>
                                }


                            </TouchableOpacity>
                        );
                    else
                        return (
                            <TouchableOpacity key={idx} onPress={() => pickThisImage(idx)}>
                                <TouchableOpacity key={idx} onPress={() => {
                                    imageArray[idx][1](null);
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
                style={styles.btn}
                onPress={() => {
                    if (load) {
                        return;
                    }
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
        alignItems: "center",
        backgroundColor: "white"
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
        backgroundColor: "#e6697e",
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
