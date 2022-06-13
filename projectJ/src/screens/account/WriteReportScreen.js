import React,{ useState, useEffect, useContext } from "react";
import {View, Text, TouchableOpacity,StyleSheet, KeyboardAvoidingView} from 'react-native';
import { CheckBox } from "@rneui/base";
import { TextInput } from 'react-native-paper';
import ThemeContext from "../../darkMode/ThemeContext";



const handleSubmit = ()=>{

}

const ReportsScreen = ({navigation}) => {
    const [notFound, setNotFound]=React.useState(false);
    const [clogged, setClogged]=React.useState(false);
    const [damaged, setDamaged]=React.useState(false);
    const [dirty, setDirty]=React.useState(false);


    const [text, onChangeText] = React.useState("");
    const theme = useContext(ThemeContext)
    return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.headline}>
                    Report a toilet
                </Text>
                <Text style={styles.text}>
                    Please select the reason for your report as precisely as possible. If you want to provide additional information, please use the text field.
                </Text>
                <View style={styles.checkboxes}>
                    <CheckBox
                        title='The toilet can no longer be found in its specified position.'
                        checked={notFound}
                        onPress={()=> setNotFound(!notFound)}
                        checkedColor="#e6697e"
                        textStyle={styles.checkbox}
                        />
                    <CheckBox
                        title='The toilet is clogged so that it is no longer usable.'
                        checked={clogged}
                        onPress={()=> setClogged(!clogged)}
                        checkedColor="#e6697e"
                        textStyle={styles.checkbox}
                        />
                    <CheckBox
                        title='There are serious damages on the toilet that need to be repaired.'
                        checked={damaged}
                        onPress={()=> setDamaged(!damaged)}
                        checkedColor="#e6697e"
                        textStyle={styles.checkbox}
                        />
                    <CheckBox
                        title='The toilet is dirty that it requires substantial cleaning.'
                        checked={dirty}
                        onPress={()=> setDirty(!dirty)}
                        checkedColor="#e6697e"
                        textStyle={styles.checkbox}
                        />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Your report"
                    multiline={true}
                    activeOutlineColor="#e6697e"
                    />
                <View style={styles.buttonFlex}>
                <TouchableOpacity 
                            style={[styles.btn, {backgroundColor: theme.submitBtn}]}
                            onPress={handleSubmit}
                            >
                            <Text style={styles.submit}>
                                    Submit

                            </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'column',

    },
    headline:{
        flex: 1,
        fontSize:25,
        fontWeight:'bold',
        marginTop:10,
    },
    checkboxes:{
        flex:5,
        marginHorizontal:5,
    },
    checkbox:{
        fontWeight:'normal',
        },
    text:{
        flex:2,
        margin:10,
        fontSize:14,
        justifyContent:'center',
    },
    input:{
        flex:2,
        borderWidth: 1,
        padding:10,
        width:300,
        
    },
    buttonFlex:{
        flex:2,
    },
    btn: {
        //backgroundColor: "#e6697e",
        paddingHorizontal:100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 30,
        justifyContent: "center",


    },

    submit:{
        textAlign:'center',
        fontWeight: "bold",
    },
});

export default ReportsScreen;