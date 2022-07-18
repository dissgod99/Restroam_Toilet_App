import axios from "axios";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ToastAndroid } from "react-native"
import { TextInput } from "react-native-paper";
import ThemeContext from "../../darkMode/ThemeContext";

import { BACKEND_ENDPOINT_USERS } from '../../constants';
import { NavigationHelpersContext } from "@react-navigation/native";


const ChangePasswordScreen = ({ route, navigation }) => {

    const { token } = route.params;

    const theme = useContext(ThemeContext);

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        reenterNewPassword: "",
        secureTextEntryOldPassword: true,
        secureTextEntryNewPassword: true,
        secureTextEntryNewPasswordAgain: true
    });

    const handleConfirm = async (evt) => {

        evt.preventDefault();
        try {
            checkNewPassReenter();
            console.log(token);
            console.log(data.oldPassword);
            console.log(data.newPassword);
            await axios
                .post(BACKEND_ENDPOINT_USERS + 'change-password',
                    { token, oldPassword: data.oldPassword, newPassword: data.newPassword })
                .then(({ data }) => {
                    ToastAndroid.showWithGravity(
                        data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM);
                        navigation.navigate('Home');
                        return;
                })
                .catch(err => {
                    ToastAndroid.showWithGravity(
                        err.response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM);
                });
        } catch (error) {
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM);
        }
    }

    const checkNewPassReenter = () => {
        if (data.newPassword !== data.reenterNewPassword)
            throw new Error('Please make sure noth values for your new password match.');
    }

    const enterOldPassword = (value) => {
        setData({
            ...data,
            oldPassword: value
        })
    };

    const enterNewPassword = (value) => {
        setData({
            ...data,
            newPassword: value
        })
    };

    const renterNewPassword = (value) => {
        setData({
            ...data,
            reenterNewPassword: value
        })
    };

    const showPassword = () => {
        setData({
            ...data,
            secureTextEntryOldPassword: !data.secureTextEntryOldPassword
        })
    };

    const showNewPassword = () => {
        setData({
            ...data,
            secureTextEntryNewPassword: !data.secureTextEntryNewPassword
        })
    };

    const showNewPasswordAgain = () => {
        setData({
            ...data,
            secureTextEntryNewPasswordAgain: !data.secureTextEntryNewPasswordAgain
        })
    };

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={styles.container}>
                <Text style={[styles.mainTxt, { color: theme.color }]}>
                    Change your password in few steps:
                </Text>

                <View style={styles.viewPassword}>
                    <Text style={[styles.txt, { color: theme.color }]}>
                        Enter your current password:
                    </Text>
                    <TextInput
                        style={styles.enterInputField}
                        label="Old Password"
                        placeholder="Enter old password"
                        secureTextEntry={data.secureTextEntryOldPassword}
                        //mode="outlined"
                        activeOutlineColor={theme.activeOutlineColor}
                        onChangeText={(value) => enterOldPassword(value)}
                    />
                    <TouchableOpacity onPress={showPassword}>
                        {data.secureTextEntryOldPassword ?
                            <Text style={[styles.confirmStyle, { color: theme.show }]}>
                                Show password
                            </Text>
                            :
                            <Text style={[styles.confirmStyle, { color: theme.show }]}>
                                Hide password
                            </Text>
                        }
                    </TouchableOpacity>


                </View>

                <View style={styles.viewPassword}>
                    <Text style={[styles.txt, { color: theme.color }]}>
                        Enter your new password:
                    </Text>
                    <TextInput
                        style={styles.enterInputField}
                        label="New Password"
                        placeholder="Enter new password"
                        secureTextEntry={data.secureTextEntryNewPassword}
                        //mode="outlined"
                        activeOutlineColor={theme.activeOutlineColor}
                        onChangeText={(value) => enterNewPassword(value)}
                    />
                    <TouchableOpacity onPress={showNewPassword}>
                        {data.secureTextEntryNewPassword ?
                            <Text style={[styles.confirmStyle, { color: theme.show }]}>
                                Show password
                            </Text>
                            :
                            <Text style={[styles.confirmStyle, { color: theme.show }]}>
                                Hide password
                            </Text>
                        }

                    </TouchableOpacity>

                </View>


                <View style={styles.viewPassword}>
                    <Text style={[styles.txt, { color: theme.color }]}>
                        Re-enter your new password:
                    </Text>
                    <TextInput
                        style={styles.enterInputField}
                        label="New Password Again"
                        placeholder="Re-enter new password"
                        secureTextEntry={data.secureTextEntryNewPasswordAgain}
                        //mode="outlined"
                        activeOutlineColor={theme.activeOutColor}
                        onChangeText={(value) => renterNewPassword(value)}
                    />
                    <TouchableOpacity onPress={showNewPasswordAgain}>
                        {data.secureTextEntryNewPasswordAgain ?
                            <Text style={[styles.confirmStyle, { color: theme.show }]}>
                                Show password
                            </Text>
                            :
                            <Text style={[styles.confirmStyle, { color: theme.show }]}>
                                Hide password
                            </Text>
                        }
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={handleConfirm} style={[styles.btn, { backgroundColor: theme.submitBtn }]}>
                    <Text style={styles.confirmStyle}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    mainTxt: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20
    },
    enterInputField: {
        marginHorizontal: 20,
        width: "80%"
    },
    viewPassword: {
        width: "95%",
        alignItems: "center",
        marginVertical: 15
    },
    txt: {
        marginVertical: 10,
        fontSize: 15,
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    confirmStyle: {
        fontWeight: "bold"
    }

});

export default ChangePasswordScreen;