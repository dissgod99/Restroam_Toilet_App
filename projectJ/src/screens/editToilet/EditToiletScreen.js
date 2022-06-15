import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TimeSelectArray from "../addPage/TimeSelectArray";

const EditToiletScreen = ({route, navigation}) => {

    const { editTitle, editLocation, editPrice }  = route.params;

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Edit Toilet
                    </Text>
                </View>
                <View style={styles.timeSelect}>
                    <Text style={styles.timeSelectHeader}>
                        Opening Hours
                    </Text>
                    <TimeSelectArray></TimeSelectArray>
                </View>
                <TouchableOpacity 
                    style={styles.buttonWrapper} 
                    onPress={() => navigation.navigate('Edit More Information',{
                        editTitle: editTitle,
                        editLocation: editLocation,
                        editPrice: editPrice
                    })}
                >
                    <Text style={styles.button}>
                        Next
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
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
    },
    header:{
        alignItems: "center",
        marginVertical: 20
    },
    title:{
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default EditToiletScreen;