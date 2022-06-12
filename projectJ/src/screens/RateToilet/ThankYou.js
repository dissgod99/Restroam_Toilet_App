import React, {useContext} from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ThemeContext from "../../darkMode/ThemeContext";



const ThankYou = ({ navigation }) => {

    const handleGoBack = () => {
        // Should go back to Map in Home
        navigation.navigate("Home")
    }

    const theme = useContext(ThemeContext);

    return (
        <Animatable.View style={[styles.container, {backgroundColor: theme.background}]} animation="zoomIn">
            <Image style={[styles.check]}
                source= {require("../../../assets/green-check.png")}
            />
            <Text style={[styles.txt, {color: theme.color}]}>
                Thank you for your Submission !
            </Text>
            <TouchableOpacity style={styles.back} onPress={handleGoBack}>
                <Text style={[styles.backTxt, {color: theme.goBack}]}>
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
        //color: "#038dca",
        fontWeight: "bold"
    },
    back: {
        marginVertical: 15
    }
});



