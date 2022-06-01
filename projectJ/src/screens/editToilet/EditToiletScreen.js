import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TimeSelectArray from "../addPage/TimeSelectArray";

const EditToiletScreen = ({navigation}) => {

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.timeSelect}>
                    <Text style={styles.timeSelectHeader}>
                        Edit Opening Hours
                    </Text>
                    <TimeSelectArray></TimeSelectArray>
                </View>
                <TouchableOpacity style={styles.buttonWrapper}>
                    <Text style={styles.button}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start'
    },
    timeSelect:{
        alignItems: "center",
        marginVertical: 20,
        marginTop: 10
    },
    timeSelectHeader:{
        fontWeight: "bold",
        fontSize: 18
    },
    buttonWrapper:{
        backgroundColor: "#e6697e",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 75,
        alignItems: "center"
    },
    button:{
        fontWeight: "bold"
    }
});

export default EditToiletScreen;