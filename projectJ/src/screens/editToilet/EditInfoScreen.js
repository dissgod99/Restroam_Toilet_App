import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Switch } from "react-native-paper";
import ThemeContext from "../../darkMode/ThemeContext";

import axios from 'axios';

const BACKEND_ENDPOINT= 'http://192.168.1.100:3000/api/toilets';

const EditInfoScreen = ({route, navigation}) => {

    const [data, setData] = useState({
        name: "",
        address: ""
    });

    const [isEnabled, setIsEnabled] = useState(false);
    const { editTitle, editLocation, editPrice }  = route.params;

    const handleSubmit = () => {
        axios
            .post(BACKEND_ENDPOINT, data)
            .then((response) => {
                result = response.data;
                const {message, status, data} = result;
            })
            .catch(error => {
                console.log(error.JSON());
            })

        // Tutorial: 5:13

        navigation.navigate("ThankYou")
    }

    function toggleSwitch() {
        setIsEnabled(!isEnabled);
    }

    const theme = useContext(ThemeContext)
    return(
        <ScrollView style={{backgroundColor: theme.background}}>
            <View style={styles.container}>
            
                <View style={styles.header}>
                    <Text style={[styles.title, {color: theme.color}]}>
                        Edit More Information
                    </Text>
                

                    <View>
                        <Text style={[styles.locationHeader, {color: theme.color}]}>
                            Specify its location
                        </Text>
                        <TextInput
                            style={styles.location}
                            defaultValue={editLocation}
                            mode="outlined"
                            // label="Address"
                            // placeholder="Type Place"
                            activeOutlineColor={theme.activeOutColor}
                            right={<TextInput.Affix text="/100" />}
                        />
                        
                    </View>
                    <Text style={[styles.details, {color: theme.color}]}>
                        Indicate Details
                    </Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.position}>
                            <Text style={[styles.locationHeader, {color: theme.color}]}>
                                Specify Price
                            </Text>
                            <TextInput style={styles.boxPrice}
                                defaultValue={editPrice}
                                mode="outlined"
                                // placeholder="Type place"
                                activeOutlineColor={theme.activeOutColor}
                            />
                        </View>
                        <View>
                            <Text style={[styles.locationHeader, {color: theme.color}]}>
                                Handicap Access
                            </Text>
                            <Switch
                                value={isEnabled} 
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
                            defaultValue={editTitle}
                            mode="outlined"
                            // label="Other details"
                            // placeholder="Type details"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor={theme.activeOutColor}
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
            
        </View>
        </ScrollView>
    );

}

export default EditInfoScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
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