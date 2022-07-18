import React, { useState, useContext, useEffect } from "react";
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native"
import { TextInput, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeContext from "../../darkMode/ThemeContext";
import { getAsyncStorageItem } from "../../util";
import * as Location from "expo-location"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from "axios";

import { Image } from "react-native-animatable";
import Geocoder from "react-native-geocoder";

const AddInfoPage = ({ navigation, route }) => {
    const {timeline} = route.params;
    var numberi = 0;

    let initName, initAddress, initDetails, initCurrentLocation;
    initName = initAddress = initDetails = initCurrentLocation = '';
    let initPrice = '0,00€';
    let initIsEnabled = false;

    const [name, setName] = useState(initName);

    const [address, setAddress] = useState(initAddress);
    const [currentLocation, setCurrentLocation] = useState(initCurrentLocation);

    const [price, setPrice] = useState(initPrice);
    const [isEnabled, setIsEnabled] = useState(initIsEnabled);

    const [details, setDetails] = useState('');

    let times = {
        Monday: "Closed",
        Tuesday: "Closed",
        Wednesday: "Closed",
        Thursday: "Closed",
        Friday: "Closed",
        Saturday: "Closed",
        Sunday: "Closed"
    }


    useEffect(() => {
        getLocation();
    }, []);


    function changeName(v) {
        setName(v);
    }

    function changeAddress(v) {
        setAddress(v);
    }

    const getLocation = async () => {
        let coords = await Location.getCurrentPositionAsync();
        setCurrentLocation(coords)
    };

    function changePrice(v) {
        setPrice(v);
    }

    function toggleSwitch() {
        setIsEnabled(!isEnabled);
    }

    function changeDetails(v) {
        setDetails(v);
    }

    const fillWithCurrentAddress = async () => {
        setAddress('')
        const latitude = currentLocation["coords"]["latitude"]
        const longitude = currentLocation["coords"]["longitude"]

        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });

        for (let item of response) {
            let addresse = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
            setAddress(addresse)
            console.log(addresse)

        }
    };


    const transformHours = () => {
        console.log("Timeline == ", timeline)
        timeline.forEach((obj) => {
            //console.log("Obj == ", obj.days)
            //console.log("True or false == ", obj.days.includes("Mon"))
            if(obj.days.includes("Mon")){
                const hours_Mon = obj.start + "-" + obj.end
                //console.log("hourrrrs == ", hours_Mon)
                //console.log("times in === ", times)
                times.Monday = hours_Mon;
                //console.log("times after === ", times)
            }
            if(obj.days.includes("Tue")){
                const hours_Tue = obj.start + "-" + obj.end
                times.Tuesday = hours_Tue;
            }
            if(obj["days"].includes("Wed")){
                const hours_Wed = obj["start"] + "-" + obj["end"]
                times.Wednesday = hours_Wed;
            }
            if(obj["days"].includes("Thu")){
                const hours_Thu = obj["start"] + "-" + obj["end"]
                times.Thursday = hours_Thu;
            }
            if(obj["days"].includes("Fri")){
                const hours_Fri = obj["start"] + "-" + obj["end"]
                times.Friday = hours_Fri;
            }
            if(obj["days"].includes("Sat")){
                const hours_Sat = obj["start"] + "-" + obj["end"]
                times.Saturday = hours_Sat;
            }
            if(obj["days"].includes("Sun")){
                const hours_Sun = obj["start"] + "-" + obj["end"]
                times.Sunday = hours_Sun;
            }
        })
    }


    const handleNextButton = () => {

        transformHours();

        let toiletTbAdded = {
            name: name,
            address: address,
            price: price,
            openingHours: times,
            handicapAccess: isEnabled,
            details: details
        }
        getAsyncStorageItem('token')
            .then((tokenFromStorage) => {
                //setToken(tokenFromStorage);
                resetAllInputs();
                navigation.navigate("Upload Image", { 
                    toiletOrReview: true,
                    updateOrAdd: false,
                    revTbAdded: undefined,
                    toiletTbAdded, 
                    token: tokenFromStorage });
            })
            .catch(err => console.log(err));
    };

    const resetAllInputs = () => {
        setName(initName);
        setAddress(initAddress);
        setPrice(initPrice);
        setIsEnabled(initIsEnabled);
        setDetails(initDetails);
    }



    const theme = useContext(ThemeContext);
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView>
                <View style={styles.containerElements}>
                    <Text style={[styles.title, { color: theme.color }]}>
                        Add more information
                    </Text>
                    <View>
                        <Text style={[styles.txt, { color: theme.color }]}>
                            Name your Notice *
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            editable={true}
                            placeholder="Enter name"
                            right={<TextInput.Affix text="/100" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeName(value)}
                            value={name}
                        />
                        <Text style={[styles.txt, { color: theme.color }]}>
                            Location *
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            editable={true}
                            //label="Give address"
                            placeholder="Enter address"
                            right={<TextInput.Affix text="/100" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeAddress(value)}
                            value={address}
                        />
                        <TouchableOpacity onPress={async () => fillWithCurrentAddress()}
                            style={[styles.getAddress, { backgroundColor: theme.submitBtn }]}>
                            <Text style={styles.getAddressText}>Get current address</Text>
                            <Icon
                                name="map-marker"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.details, { color: theme.color }]}>
                        Indicate details
                    </Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.position}>
                            <Text style={[styles.txt, { color: theme.color }]}>
                                Price *
                            </Text>
                            <TextInput style={styles.boxPrice}
                                defaultValue= "0,00"
                                mode="outlined"
                                placeholder="0,00"
                                activeOutlineColor={theme.activeOutColor}
                                keyboardType="numeric"
                                onChangeText={(value) => changePrice(value)}
                            />
                        </View>
                        <View>
                            <Text style={[styles.txt, { color: theme.color }]}>
                                Handicap Access *
                            </Text>
                            <Switch
                                value={isEnabled}
                                onValueChange={toggleSwitch}
                                color={theme.activeOutColor}
                            />

                        </View>



                    </View>

                    <View>
                        <Text style={[styles.txt, { color: theme.color }]}>
                            Description
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            label="Other details"
                            placeholder="Type details"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeDetails(value)}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: theme.submitBtn }]}
                        onPress={handleNextButton}
                    >
                        <Text style={styles.stOfSubmit}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
}

export default AddInfoPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        //backgroundColor: "white"
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
        //backgroundColor: "#e6697e",
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
    getAddress: {
        flexDirection: "row",
        marginTop: 8,
        borderRadius: 3,
        width: 185,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    getAddressText: {
        fontWeight: "bold",
        marginRight: 5
    }



});
