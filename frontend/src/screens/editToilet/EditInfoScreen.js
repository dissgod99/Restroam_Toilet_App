import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import { TextInput, Switch } from "react-native-paper";
import { BACKEND_ENDPOINT_TOILETS } from "../../constants";
import ThemeContext from "../../darkMode/ThemeContext";
import { getAsyncStorageItem } from "../../util";
import * as Location from "expo-location"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EditInfoScreen = ({ route, navigation }) => {

    const {
        token,
        originalTitle,
        originalLocation,
        originalPrice,
        originalDetails,
        originalHandicapAccess,
        rescue
    } = route.params;

    let initName, initAddress, initDetails, initCurrentLocation;
    initName = initAddress = initDetails = initCurrentLocation = '';
    let initPrice = '0,00€';
    let initIsEnabled = false;

    let initTimes = {
        Monday: "Closed",
        Tuesday: "Closed",
        Wednesday: "Closed",
        Thursday: "Closed",
        Friday: "Closed",
        Saturday: "Closed",
        Sunday: "Closed"
    }

    const [name, setName] = useState(originalTitle);

    const [address, setAddress] = useState(originalLocation);
    const [currentLocation, setCurrentLocation] = useState(initCurrentLocation);

    const [price, setPrice] = useState(originalPrice);
    const [isEnabled, setIsEnabled] = useState(originalHandicapAccess);

    const [details, setDetails] = useState(originalDetails);

    const [openingH, setOpeningH] = useState(initTimes)

    var times = {
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
        rescue.forEach((obj) => {
            if(obj.days.includes("Mon")){
                const hours_Mon = obj.start + "-" + obj.end
                times.Monday = hours_Mon;
                console.log("times after edit === ", times)
            }
            if (obj.days.includes("Tue")) {
                const hours_Tue = obj.start + "-" + obj.end
                times.Tuesday = hours_Tue;
            }
            if (obj["days"].includes("Wed")) {
                const hours_Wed = obj["start"] + "-" + obj["end"]
                times.Wednesday = hours_Wed;
            }
            if (obj["days"].includes("Thu")) {
                const hours_Thu = obj["start"] + "-" + obj["end"]
                times.Thursday = hours_Thu;
            }
            if (obj["days"].includes("Fri")) {
                const hours_Fri = obj["start"] + "-" + obj["end"]
                times.Friday = hours_Fri;
            }
            if (obj["days"].includes("Sat")) {
                const hours_Sat = obj["start"] + "-" + obj["end"]
                times.Saturday = hours_Sat;
            }
            if (obj["days"].includes("Sun")) {
                const hours_Sun = obj["start"] + "-" + obj["end"]
                times.Sunday = hours_Sun;
            }
        })
    }


    const handleNextButton = () => {
        console.log("inside add ");
        getAsyncStorageItem('token')
            .then((tokenFromStorage) => {
                //setToken(tokenFromStorage);

                transformHours();
                let toiletTbUpdated = {
                    address: originalLocation,
                    newName: name,
                    newAddress: address,
                    newPrice: price,
                    newOpeningHours: times,
                    newHandicapAccess: isEnabled,
                    newDetails: details
                }

                if (name != "" && price != "") {

                    resetAllInputs();
                    // navigation.navigate("Upload Image", {
                    //     toiletOrReview: true,
                    //     updateOrAdd: true,
                    //     revTbAdded: undefined,
                    //     toiletTbAdded: toiletTbUpdated,
                    //     token: tokenFromStorage,
                    // });
                    let endpoint = BACKEND_ENDPOINT_TOILETS + 'edit-toilet';
                    let { address, newName, newAddress, newPrice, newDetails, newHandicapAccess, newOpeningHours } = toiletTbUpdated;
                    let reqBody = { address, newName, newAddress, newPrice, newDetails, newHandicapAccess, newOpeningHours };

                    axios.post(endpoint, reqBody)
                        .then(({ data }) => {
                            ToastAndroid.showWithGravity(
                                data.message,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM);

                            navigation.navigate('ThankYou');
                        })
                        .catch(err => {
                            console.log(err);
                            ToastAndroid.showWithGravity(
                                err.response.data.message,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM);
                            navigation.navigate("Home");
                        });
                } else {
                    Alert.alert(
                        "ERROR",
                        "Please fill all mandatory inputs",
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel ERROR Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK ERROR Pressed') },
                        ]
                    );
                }
            }).catch(err => console.log(err));
    };

    const resetAllInputs = () => {
        setName(initName);
        setAddress(initAddress);
        setPrice(initPrice);
        setIsEnabled(initIsEnabled);
        setDetails(initDetails);
        setOpeningH(initTimes)
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
                            right={<TextInput.Affix text="/100" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeAddress(value)}
                            value={address}
                        />
                        <TouchableOpacity
                            onPress={async () => fillWithCurrentAddress()}
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
                                defaultValue={originalPrice}
                                mode="outlined"
                                placeholder="Type price"
                                activeOutlineColor={theme.activeOutColor}
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
                            placeholder="Type details"
                            defaultValue={originalDetails}
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










































        // <View style={styles.container}>
        //     <ScrollView>
        //         <View style={styles.header}>
        //             <Text style={[styles.title, {color: theme.color}]}>
        //                 Edit More Information
        //             </Text>
        //             <View>
        //                 <Text style={styles.locationHeader}>
        //                     Name
        //                 </Text>
        //                 <TextInput
        //                     style={styles.location}
        //                     defaultValue={originalTitle}
        //                     placeholder={originalTitle}
        //                     mode="outlined"
        //                     // label="Address"
        //                     // placeholder="Type Place"
        //                     activeOutlineColor={theme.activeOutColor}
        //                     right={<TextInput.Affix text="/100" />}
        //                     onChangeText={changeName}
        //                 />
        //                 <Text style={styles.locationHeader}>
        //                     Location
        //                 </Text>
        //                 <TextInput
        //                     style={styles.location}
        //                     defaultValue={originalLocation}
        //                     placeholder={originalLocation}
        //                     mode="outlined"
        //                     // label="Address"
        //                     activeOutlineColor="#e6697e"
        //                     right={<TextInput.Affix text="/100" />}
        //                     onChangeText={changeAddress}
        //                 />

        //             </View>

        //             <View style={styles.detailsContainer}>
        //                 <View style={styles.position}>
        //                     <Text style={styles.locationHeader}>
        //                         Price
        //                     </Text>
        //                     <TextInput style={styles.boxPrice}
        //                         defaultValue={originalPrice}
        //                         placeholder={originalPrice}
        //                         mode="outlined"
        //                         // placeholder="Type place"
        //                         onChangeText={changePrice}
        //                         activeOutlineColor={theme.activeOutColor}
        //                     />
        //                 </View>
        //                 <View>
        //                     <Text style={[styles.locationHeader, {color: theme.color}]}>
        //                         Handicap Access
        //                     </Text>
        //                     <Switch
        //                         value={newHandicapAccess}
        //                         onValueChange={toggleSwitch}
        //                         color= {theme.activeOutColor}
        //                     />
        //                 </View>
        //             </View>
        //             <View>
        //                 <Text style={[styles.locationHeader, {color: theme.color}]}>
        //                     More Details
        //                 </Text>
        //                 <TextInput style={styles.location}
        //                     defaultValue={originalDetails}
        //                     placeholder={originalDetails}
        //                     mode="outlined"
        //                     // label="Other details"
        //                     // placeholder="Type details"
        //                     right={<TextInput.Affix text="/250" />}
        //                     activeOutlineColor={theme.activeOutColor}
        //                     onChangeText={changeDetails}
        //                 />
        //             </View>
        //             <TouchableOpacity 
        //                 style={[styles.btn, {backgroundColor: theme.submitBtn}]}
        //                 onPress={() => handleSubmit()}    
        //             >
        //                 <Text style={styles.submit}>
        //                     Submit
        //                 </Text>
        //             </TouchableOpacity>
        //         </View>
        // </ScrollView>
        // </View>
    );

}

export default EditInfoScreen;

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




























    // container: {
    //     flex: 1,
    //     justifyContent: "flex-start",
    //     alignItems: "center"
    // },
    // header: {
    //     justifyContent: "center",
    //     alignItems: "center"
    // },
    // title: {
    //     fontWeight: "bold",
    //     fontSize: 20,
    //     marginVertical: 20
    // },
    // locationHeader: {
    //     marginVertical: 10,
    //     fontWeight: "bold"
    // },
    // location: {
    //     width: 250,
    //     paddingLeft: 8,
    //     fontWeight: "bold"
    // },
    // details: {
    //     marginVertical: 20,
    //     fontSize: 20,
    //     fontWeight: "bold"
    // },
    // boxPrice: {
    //     width: 130
    // },
    // position: {
    //     marginRight: 10
    // },
    // detailsContainer: {
    //     display: "flex",
    //     flexDirection: "row"
    // },
    // btn:{
    //     paddingHorizontal: 80,
    //     paddingVertical: 10,
    //     borderRadius: 5,
    //     marginVertical: 35,
    //     marginHorizontal: 75,
    //     alignItems: "center"
    // },
    // submit: {
    //     fontWeight: "bold"
    // }
});