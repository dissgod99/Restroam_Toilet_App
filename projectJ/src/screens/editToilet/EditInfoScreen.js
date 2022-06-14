import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Switch } from "react-native-paper";

const BACKEND_ENDPOINT= 'http://192.168.1.100:3000/api/users/login';

const EditInfoScreen = ({route, navigation}) => {

    const [data, getData] = useState({
        name: "",
        address: ""
    });

    const [isEnabled, setIsEnabled] = useState(false);
    const { editTitle, editLocation, editPrice }  = route.params;

    function toggleSwitch() {
        setIsEnabled(!isEnabled);
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Edit More Information
                    </Text>
                

                    <View>
                        <Text style={styles.locationHeader}>
                            Specify its location
                        </Text>
                        <TextInput
                            style={styles.location}
                            defaultValue={editLocation}
                            mode="outlined"
                            // label="Address"
                            // placeholder="Type Place"
                            activeOutlineColor="#e6697e"
                            right={<TextInput.Affix text="/100" />}
                        />
                    </View>
                    <Text style={styles.details}>
                        Indicate Details
                    </Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.position}>
                            <Text style={styles.locationHeader}>
                                Specify Price
                            </Text>
                            <TextInput style={styles.boxPrice}
                                defaultValue={editPrice}
                                mode="outlined"
                                // placeholder="Type place"
                                activeOutlineColor="#e6697e"
                            />
                        </View>
                        <View>
                            <Text style={styles.locationHeader}>
                                Handicap Access
                            </Text>
                            <Switch
                                value={isEnabled} 
                                onValueChange={toggleSwitch}
                                color= {"red"}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.locationHeader}>
                            More Details
                        </Text>
                        <TextInput style={styles.location}
                            defaultValue={editTitle}
                            mode="outlined"
                            // label="Other details"
                            // placeholder="Type details"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor="#e6697e"
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => navigation.navigate("ThankYou")}    
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
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    header:{
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20
    },
    locationHeader:{
        marginVertical: 10,
        fontWeight: "bold"
    },
    location:{
        width: 250,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    details:{
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    boxPrice: {
        width: 130
    },
    position:{
        marginRight: 10
    },
    detailsContainer:{
        display: "flex",
        flexDirection: "row"
    },
    btn:{
        backgroundColor: "#e6697e",
        paddingHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 35,
        marginHorizontal: 75,
        alignItems: "center"
    },
    submit:{
        fontWeight: "bold"
    }
});