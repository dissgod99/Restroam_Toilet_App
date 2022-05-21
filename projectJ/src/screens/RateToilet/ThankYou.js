import React from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ThankYou = ({ navigation }) => {

    const handleGoBack = () => {
        // Should go back to Map in Home
        navigation.navigate("Home")
    }

    return (
        <Animatable.View style={styles.container} animation="zoomIn">
            <Image style={styles.check}
                source= {require("../../../assets/green-check.png")}
            />
            <Text style={styles.txt}>
                Thank you for your Submission !
            </Text>
            <TouchableOpacity style={styles.back} onPress={handleGoBack}>
                <Text style={styles.backTxt}>
                    Go back to Map
                </Text>
            </TouchableOpacity>
        </Animatable.View>      
    )
}

export default ThankYou;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#f28d82",
        alignItems: 'center',
        justifyContent: 'center',
    },
    check: {
        width: 200,
        height: 200
    },
    txt: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10
    },
    backTxt: {
        //color: "#5a80ae",
        color: "#038dca",
        fontWeight: "bold"
    },
    back: {
        marginVertical: 15
    }
});



