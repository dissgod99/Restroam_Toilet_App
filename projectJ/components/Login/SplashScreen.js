import React from "react";
import {View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Image} from "react-native";
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image style={styles.logo} source={require("../../assets/finder.png")} animation="bounceIn" />
                <Animatable.Text style={styles.moto} animation="bounceIn" >Find toilets nearby</Animatable.Text>
            </View>

            <Animatable.View 
            style={styles.footer}
            animation= "fadeInUpBig">
                <Text style={styles.title}>Welcome to RestRoam</Text>
                <Text style={styles.text}>Locate all the toilet facilities around you in a quick glance!</Text>
                <View style={styles.adjustBtn}>
                    <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate("Login")}>
                        <Text>Get started </Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fae1dd',
      //backgroundColor: "#ddbea9",
      //backgroundColor: "#ffacaa",
      //backgroundColor: "#f0867b",
      backgroundColor: "#f28d82",
      //backgroundColor: "#f59b92",
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    footer:{
        flex:1,
        backgroundColor: "#fff",
        paddingVertical: 50,
        //paddingHorizontal: 30
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //alignItems: "center"
    },
    title:{
        color: "#05375a",
        fontSize: 30,
        marginHorizontal: 20,
        marginBottom: 10,
        fontWeight: "bold"
    },
    text:{
        marginHorizontal: 20,
        fontSize:15,
        color: "grey"

    },
    getStarted:{
        //backgroundColor: "#ddbea9",
        backgroundColor: "#eea990",
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius:12

    },
    adjustBtn:{
        alignItems:"flex-end",
        marginRight: 60,
        marginTop: 25

    },
    logo:{
        // height: 280,
        // width: 300
        height: 180,
        width: 180

    },
    moto:{
        fontSize: 20,
        fontWeight: "bold"
    }
    
  });
  


