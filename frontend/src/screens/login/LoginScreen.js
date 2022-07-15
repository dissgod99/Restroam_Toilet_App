import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { getAsyncStorageItem, setAsyncStorageItem } from '../../util';
import { BACKEND_ENDPOINT_USERS } from '../../constants';

import axios from "axios";



const LoginScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true
    });

    const handleLoginClick = async (event) => {
        event.preventDefault();
        // do some backend logic here
        // console.log(await getAsyncStorageItem('token'));
        let email = data.email;
        let password = data.password;
        axios
            .post(BACKEND_ENDPOINT_USERS + 'login', { email, password })
            .then(async ({ status, data }) => {
                if (status == '200') {
                    // AsyncStorage for phone is the localhost of browser
                    await setAsyncStorageItem('token', data.JWTtoken);
                    // console.log(await getAsyncStorageItem('token'));
                    ToastAndroid.showWithGravity(
                        data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM);
                    // once that is finished navigate to next route
                    clearTimeout();
                    setTimeout(() => {
                        navigation.navigate('Home');
                    }, 3000);
                }
            })
            .catch((err) => {
                if (err.response) {
                    ToastAndroid.showWithGravity(
                        err.response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM);
                }
            });
    }
    

    const textInputChange = (value) => {
        //let regex_email = new RegExp("[a-zA-Z]+[a-z0-9]+@[a-z]+\.[a-z]{2,5}");
        //let regex_email = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}");
        /**
         * Strict Validation: 
         * 1) local-part:
         * uppercase and lowercase Latin letters A to Z and a to z
            digits 0 to 9
            Allow dot (.), underscore (_) and hyphen (-)
            dot (.) is not the first or last character
            dot (.) does not appear consecutively, e.g. mkyong..yong@example.com is not allowed
            Max 64 characters 
         * 
         * 2) Domain:
         * uppercase and lowercase Latin letters A to Z and a to z
            digits 0 to 9
            hyphen (-) is not the first or last character
            dot (.) is not the first or last character
            dot (.) does not appear consecutively
            tld min 2 characters
         * 
         */
        let regex_email = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
        if (value.length != 0 && regex_email.test(value)) {
            setData({
                ...data,
                email: value,
                check_textInputChange: true

            });
        } else {
            setData({
                ...data,
                email: value,
                check_textInputChange: false

            });
        }
    };

    const handleEye = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    };

    const handlePassword = (value) => {
        setData({
            ...data,
            password: value
        })
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image style={styles.logo}
                    source={require("../../../assets/finder.png")}
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite" />
                <Text style={styles.headerMoto}>Login right now</Text>
            </View>
            <Animatable.View style={styles.footer}
                animation="fadeInUpBig">
                <ScrollView>
                    <View style={styles.box}>
                        <Text style={styles.entry}> Email Address</Text>
                        <View style={styles.alignBox}>
                            <FontAwesome name="envelope" size={23} />
                            <TextInput style={styles.enterInputField}
                                placeholder="Enter your Email"
                                autoCapitalize="none"
                                onChangeText={(value) => textInputChange(value)}
                            />
                            {data.check_textInputChange ?
                                <Animatable.View animation="bounceIn">
                                    <Feather
                                        name="check-circle"
                                        color={"green"}
                                        size={20} />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.entry}> Password</Text>
                        <View style={styles.alignBox}>
                            <FontAwesome name="lock" size={23} />
                            <TextInput style={styles.enterInputField}
                                placeholder="Enter your Password"
                                autoCapitalize="none"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                onChangeText={(value) => handlePassword(value)}
                            />
                            <TouchableOpacity onPress={handleEye}>
                                {data.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color={"grey"}
                                        size={20} />
                                    :
                                    <Feather
                                        name="eye"
                                        color={"grey"}
                                        size={20} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.login} onPress={handleLoginClick} >
                            <Text style={{ fontWeight: "bold" }}>Login</Text>
                        </TouchableOpacity>
                        <Text>You don't have an Account ? Sign up now</Text>
                        <TouchableOpacity style={styles.reg}
                            onPress={() => navigation.navigate("SignUp")}>
                            <Text style={{ fontWeight: "bold" }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ddbea9',
        //backgroundColor: "#6b9080",
        //backgroundColor: "#f88b89",
        //backgroundColor: "#ffacaa",
        backgroundColor: "#f28d82",
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: "#fff",
        //paddingBottom: 150,
        //paddingBottom: 50,
        //paddingHorizontal: 30
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //alignItems: "center"
    },
    logo: {
        width: 180,
        height: 180
    },
    headerMoto: {
        fontSize: 20,
        fontWeight: "bold"
    },
    alignBox: {
        flexDirection: "row",
        marginVertical: 12
    },
    box: {
        marginLeft: 25,
        marginTop: 25
    },
    enterInputField: {
        marginLeft: 20,
        width: "70%"
    },
    check: {},
    entry: {
        fontSize: 15,
        fontWeight: "bold"
    },
    login: {
        //backgroundColor: "#f9dcc4",
        backgroundColor: "#fae8e0",
        width: "80%",
        //justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        //marginTop: 9
        marginTop: 30,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15
    },
    buttons: {
        justifyContent: "center",
        alignItems: "center"
    },
    reg: {
        //backgroundColor: "#f9dcc4",
        width: "80%",
        //justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 9,
        borderColor: "black",
        borderWidth: 1
    }
});



