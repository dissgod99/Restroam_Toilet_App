import axios from "axios";
import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { TextInput, Switch } from "react-native-paper";
import { BACKEND_ENDPOINT_TOILETS } from "../../constants";
import ThemeContext from "../../darkMode/ThemeContext";

const EditInfoScreen = ({ route, navigation }) => {

    const { originalTitle,
        originalLocation,
        originalPrice,
        originalDetails,
        originalHandicapAccess, } = route.params;

    const [newHandicapAccess, setNewHandicapAccess] = useState(originalHandicapAccess);
    const [newName, setNewName] = useState(originalTitle);
    const [newAddress, setNewAddress] = useState(originalLocation);
    const [newPrice, setNewPrice] = useState(originalPrice);
    const [newDetails, setNewDetails] = useState(originalDetails);

    function toggleSwitch() {
        setNewHandicapAccess(!newHandicapAccess);
    }

    function changeName(v) {
        setNewName(v);
    }

    function changeAddress(v) {
        setNewAddress(v);
    }

    function changePrice(v) {
        newHandicapAccess(v);
    }

    function changeDetails(v) {
        setNewDetails(v);
    }

    const handleSubmit = () => {
        ToastAndroid.showWithGravity(
            'Please wait until update...',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM);

        axios.post(BACKEND_ENDPOINT_TOILETS + 'edit-toilet', {
            name: originalTitle,
            newName,
            newAddress,
            newPrice,
            newDetails,
            newHandicapAccess,
        })
            .then(({ data }) => {
                console.log(data.message);
                ToastAndroid.showWithGravity(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM);
                navigation.navigate("ThankYou")
            })
            .catch((err) => console.log(err));
    }

    const theme = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.title, {color: theme.color}]}>
                        Edit More Information
                    </Text>
                    <View>
                        <Text style={styles.locationHeader}>
                            Name
                        </Text>
                        <TextInput
                            style={styles.location}
                            defaultValue={originalTitle}
                            placeholder={originalTitle}
                            mode="outlined"
                            // label="Address"
                            // placeholder="Type Place"
                            activeOutlineColor={theme.activeOutColor}
                            right={<TextInput.Affix text="/100" />}
                            onChangeText={changeName}
                        />
                        <Text style={styles.locationHeader}>
                            Location
                        </Text>
                        <TextInput
                            style={styles.location}
                            defaultValue={originalLocation}
                            placeholder={originalLocation}
                            mode="outlined"
                            // label="Address"
                            activeOutlineColor="#e6697e"
                            right={<TextInput.Affix text="/100" />}
                            onChangeText={changeAddress}
                        />
                        
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.position}>
                            <Text style={styles.locationHeader}>
                                Price
                            </Text>
                            <TextInput style={styles.boxPrice}
                                defaultValue={originalPrice}
                                placeholder={originalPrice}
                                mode="outlined"
                                // placeholder="Type place"
                                onChangeText={changePrice}
                                activeOutlineColor={theme.activeOutColor}
                            />
                        </View>
                        <View>
                            <Text style={[styles.locationHeader, {color: theme.color}]}>
                                Handicap Access
                            </Text>
                            <Switch
                                value={newHandicapAccess}
                                onValueChange={toggleSwitch}
                                color= {theme.activeOutColor}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.locationHeader, {color: theme.color}]}>
                            More Details
                        </Text>
                        <TextInput style={styles.location}
                            defaultValue={originalDetails}
                            placeholder={originalDetails}
                            mode="outlined"
                            // label="Other details"
                            // placeholder="Type details"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={changeDetails}
                        />
                    </View>
                    <TouchableOpacity 
                        style={[styles.btn, {backgroundColor: theme.submitBtn}]}
                        onPress={() => handleSubmit()}    
                    >
                        <Text style={styles.submit}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
        </View>
    );

}

export default EditInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    header: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20
    },
    locationHeader: {
        marginVertical: 10,
        fontWeight: "bold"
    },
    location: {
        width: 250,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    details: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    boxPrice: {
        width: 130
    },
    position: {
        marginRight: 10
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row"
    },
    btn:{
        paddingHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 35,
        marginHorizontal: 75,
        alignItems: "center"
    },
    submit: {
        fontWeight: "bold"
    }
});