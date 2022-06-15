import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const OutloggedScreen = ({navigation}) => {

    return(
        <ScrollView>
            <View style={styles.container}>
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
            </View>
        </ScrollView>
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
        marginTop: "50%"
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
        marginTop: 30,
        borderColor: "black",
        borderWidth: 1,
        marginBottom:"100%"
    }
});

export default OutloggedScreen;