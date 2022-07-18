import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const OutloggedScreen = ({navigation}) => {

    return(
        <View style={styles.container}>
            <View style={styles.icon}>
                <AntDesign name="login" size={100}/>
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Sorry, you have to be logged in for using this feature!
                </Text>
            </View>
            
            <TouchableOpacity 
                style={styles.login}
                onPress={() => navigation.navigate("Login")}    
            >
                <Text style={{ fontWeight: "bold" }}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signup}
                onPress={() => navigation.navigate("SignUp")}
            >
                <Text style={{ fontWeight: "bold" }}>
                    Sign up
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signup}
                onPress={() => navigation.navigate("Map")}
            >
                <Text style={{ fontWeight: "bold" }}>
                    Go back to map
                </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        // marginBottom: "75%"
    },
    header:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%"
    },
    title:{
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20,
        textAlign: "center"
    },
    login:{
        backgroundColor: "#fae8e0",
        width: "80%",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 20,
        borderColor: "black",
        borderWidth: 1,
        marginBottom:"8%"
    },
    signup:{
        width: "80%",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 10,
        borderColor: "black",
        borderWidth: 1,
        marginBottom:"8%"
    },
    icon:{
        marginTop: "50%"
    }
});

export default OutloggedScreen;