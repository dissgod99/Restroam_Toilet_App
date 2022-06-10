import React, {useContext, useState} from "react";
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from "react-native"
import { TextInput } from "react-native-paper";
import ThemeContext from "../../darkMode/ThemeContext";


const ChangePasswordScreen = () =>{
    const theme = useContext(ThemeContext);
    const[data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        reenterNewPassword: "",
        secureTextEntryOldPassword: true,
        secureTextEntryNewPassword: true
    })
    const enterOldPassword = (value) =>{
        setData({
            ...data,
            oldPassword: value
        })
    }

    const enterNewPassword = (value) =>{
        setData({
            ...data,
            newPassword: value
        })
    }

    const renterNewPassword = (value) =>{
        setData({
            ...data,
            reenterNewPassword: value
        })
    }

    const showPassword = () =>{
        setData({
            ...data,
            secureTextEntryOldPassword: !data.secureTextEntryOldPassword

        })
    }



    return (
        <ScrollView style={{backgroundColor: theme.background}}>
        <View style={styles.container}>
            <Text style={[styles.mainTxt, {color:theme.color}]}>
                Change your password in few steps:
            </Text>

            <View style={styles.viewPassword}>
                <Text style={[styles.txt, {color:theme.color}]}>
                    Enter your current password:
                </Text>
                <TextInput
                    style={styles.enterInputField}
                    label="Old Password" 
                    placeholder="Enter old password"
                    secureTextEntry={data.secureTextEntryOldPassword}
                    //mode="outlined"
                    activeOutlineColor= {theme.activeOutlineColor}
                    onChangeText={(value) => enterOldPassword(value)}
                />{data.secureTextEntryOldPassword ?
                        <TouchableOpacity onPress={()=> showPassword}>
                            <Text>
                                Show password
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity>
                            <Text>
                                Hide password
                            </Text>
                        </TouchableOpacity>
                    
                    }
            </View>

            <View style={styles.viewPassword}>
                <Text style={[styles.txt, {color:theme.color}]}>
                    Enter your new password:
                </Text>
                <TextInput
                    style={styles.enterInputField}
                    label="New Password" 
                    placeholder="Enter new password"
                    secureTextEntry={data.secureTextEntryOldPassword}
                    //mode="outlined"
                    activeOutlineColor= {theme.activeOutlineColor}
                    onChangeText={(value) => enterNewPassword(value)}
                />
            </View>


            <View style={styles.viewPassword}>
                <Text style={[styles.txt, {color:theme.color}]}>
                    Re-enter your new password again:
                </Text>
                <TextInput
                    style={styles.enterInputField}
                    label="New Password Again" 
                    placeholder="Re-enter new password"
                    secureTextEntry={data.secureTextEntryOldPassword}
                    //mode="outlined"
                    activeOutlineColor= {theme.activeOutlineColor}
                    onChangeText={(value) => renterNewPassword(value)}
                />
            </View>

            <TouchableOpacity style={[styles.btn, {backgroundColor: theme.submitBtn}]}>
                <Text style={styles.confirmStyle}>
                    Confirm
                </Text>


            </TouchableOpacity>
        </View>
        </ScrollView>
        )};

const styles = StyleSheet.create({
    container:{
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    mainTxt:{
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20
    },
    enterInputField: {
        marginHorizontal: 20,
        width: "80%"
    },
    viewPassword:{
        width: "95%",
        alignItems:"center",
        marginVertical: 15
    },
    txt:{
        marginVertical: 10,
        fontSize: 15,
    },
    btn:{
        justifyContent:"center",
        alignItems: "center",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    confirmStyle:{
        fontWeight: "bold"
    }

});

export default ChangePasswordScreen;