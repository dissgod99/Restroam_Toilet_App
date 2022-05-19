import React,{ useState, useEffect } from "react";
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';



const handleSubmit = ()=>{

}

const ReportsScreen = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Toilet paper is empty', value: 'paper'},
        {label: 'Toilet clogged', value: 'clogged'},
        {label: 'Toilet dirty', value: 'dirty'},
        {label: 'Toilet damaged', value: 'damaged'},
        {label: 'Other', value: 'other'}
    ]);
    const [text, onChangeText] = React.useState("");
    return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Please select the reason for your report
                </Text>
                <DropDownPicker 
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    />

            {value === 'other'&&(
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Your report"
                />)}
            <TouchableOpacity 
                        style={styles.btn}
                        onPress={handleSubmit}
                        >
                        <Text style={styles.submit}>
                                Submit

                        </Text>
                </TouchableOpacity>

            </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text:{
        margin:10,
        fontSize:20,
        fontWeight:'bold',
    },
    dropdown:{
        flex:2,
    },
    input:{
        flex:1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    btn: {
        margin:20,
        backgroundColor: "#e6697e",
        paddingHorizontal: 100,
        paddingVertical: 15,
        borderRadius: 5,
        marginVertical: 30

    },

    submit:{
        textAlign:'center',
        fontWeight: "bold",
    },
});

export default ReportsScreen;