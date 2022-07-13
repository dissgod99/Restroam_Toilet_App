import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import axios from "axios";

// change url backend login api (on heroku)
// for now it is set to the IP address of my machine (192.168.1.100) to test it on yours replace it with your IP
import { BACKEND_ENDPOINT_USERS } from '../../constants';


const LoginScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: "",
        username: "",
        password: "",
        check_textInputChange: false,
        check_username_change: false,
        secureTextEntry: true,
        secureTextEntry_Reenter: true
    });

    const handleSignUpClick = (event) => {
        event.preventDefault();
        // do some backend logic here
        let email = data.email;
        let password = data.password;
        let username = data.username;
        axios
            .post(BACKEND_ENDPOINT_USERS + 'signup', { email, username, password })
            .then(({ status, data }) => {
                if (status == '201') {
                    ToastAndroid.showWithGravity(
                        data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM);
                    // once that is finished navigate to next route
                    clearTimeout();
                    setTimeout(() => {
                        navigation.navigate('Home')
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

    const usernameChange = (usr) => {
        let regex_usr = new RegExp("[A-Za-z0-9]{6,}")
        if (usr.length != 0 && regex_usr.test(usr)) {
            setData({
                ...data,
                username: usr,
                check_username_change: true
            });
        } else {
            setData({
                ...data,
                username: usr,
                check_username_change: false
            });
        }
    }


    const handleEye = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry

        })
    };

    const handleEye_Reenter = () => {
        setData({
            ...data,
            secureTextEntry_Reenter: !data.secureTextEntry_Reenter
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

                <Text style={styles.headerMoto}>Sign up now</Text>
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
                        <Text style={styles.entry}> Username</Text>
                        <View style={styles.alignBox}>
                            <FontAwesome name="user" size={23} />
                            <TextInput style={styles.enterInputField}
                                placeholder="Enter your username"
                                autoCapitalize="none"
                                onChangeText={(usr) => usernameChange(usr)}
                            />
                            {data.check_username_change ?
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
                            <TouchableOpacity
                                onPress={handleEye}
                            >
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
                        <Text style={styles.entry}> Re-enter Password</Text>
                        <View style={styles.alignBox}>
                            <FontAwesome name="lock" size={23} />
                            <TextInput style={styles.enterInputField}
                                placeholder="Enter your Password"
                                autoCapitalize="none"
                                secureTextEntry={data.secureTextEntry_Reenter ? true : false}
                                onChangeText={(value) => handlePassword(value)}
                            />
                            <TouchableOpacity
                                onPress={handleEye_Reenter} >
                                {data.secureTextEntry_Reenter ?
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
                        <TouchableOpacity style={styles.login} onPress={handleSignUpClick} >
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
        backgroundColor: "#f28d82",
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 2,
        backgroundColor: "#fff",
        //paddingBottom: 180,
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    logo: {
        width: 140,
        height: 140

    },
    headerMoto: {
        fontSize: 17,
        fontWeight: "bold"
    },
    alignBox: {
        flexDirection: "row",
        marginVertical: 12,

    },
    box: {
        marginLeft: 25,
        marginTop: 32
    },
    enterInputField: {
        marginLeft: 20,
        width: "70%",
    },
    check: {

    },
    entry: {
        fontSize: 15,
        fontWeight: "bold"
    },
    login: {
        backgroundColor: "#fae8e0",
        width: "80%",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 9,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15

    },
    buttons: {
        justifyContent: "center",
        alignItems: "center"
    },
    reg: {
        width: "80%",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 35,
        borderColor: "black",
        borderWidth: 1

    }
});



