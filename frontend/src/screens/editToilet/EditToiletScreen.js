import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ColorPropType } from "react-native";
import TimeSelectArray from "../addPage/TimeSelectArray";
import TimeSlot from "../addPage/TimeSlot";
import ThemeContext from '../../darkMode/ThemeContext';

const EditToiletScreen = ({ route, navigation }) => {

    const [dayIsChecked, setDayIsChecked] = useState(
        {
            Mon:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            },
            Tue:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            },
            Wed:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            },
            Thu:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            },
            Fri:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            },
            Sat:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            },
            Sun:{
                checked: false,
                startHour: "<Starting Hour>",
                endHour: "<Closing Hour>"
            }
        }
    )

    const theme = useContext(ThemeContext)

    const [counter, setCounter] = useState(0);

    const [test, setTest] = useState([null, null, []])
    const [hourSlots, setHourSlots] = useState([<TimeSlot data={test}/>])

    const MAX_NB_SLOTS = 7;

    const { originalTitle, originalLocation,
        originalPrice, originalDetails, originalHandicapAccess } = route.params;

    const [newOpeningTimes, setNewOpeningTimes] = useState({});

    const addOneMoreTimeSlot = () => {
        if(hourSlots.length < MAX_NB_SLOTS){
            setHourSlots([...hourSlots, <TimeSlot data={test}/>])
        }else{
            return;
        }
    }

    const deletePreviousTimeSlot = () =>{
        if(hourSlots.length > 1){
            let newList = [...hourSlots].slice(0, [...hourSlots].lenght-1)
            setHourSlots(newList)
        }else{
            return;
        }
    }

    const updateOpeningTimes = (someObj) => {
        console.log('inside EditToiletScreen updating to:' + JSON.stringify(someObj));
        setNewOpeningTimes(someObj);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: theme.background}}>
                <View style={styles.header}>
                    <Text style={[styles.title, {color: theme.color}]}>
                        Edit Toilet
                    </Text>
                </View>
                

                <View style={styles.timeSelect}>
                    <Text style={[styles.timeSelectHeader, {color: theme.color}]}>
                        Opening Hours
                    </Text>

                    {hourSlots.map(() =>{
                        return <TimeSlot data={setTest}/>
                    })}
                    {/* <TimeSelectArray tempOpeningTimes={newOpeningTimes} updateOpeningTimes={updateOpeningTimes}></TimeSelectArray> */}
                </View>

                <TouchableOpacity style={styles.addMore} onPress={() => addOneMoreTimeSlot()}>
                    <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                        [+] Add more slots
                    </Text>
                </TouchableOpacity>

                {
                    hourSlots.length>1?
                    <TouchableOpacity style={styles.addMore} onPress={() => deletePreviousTimeSlot()}>
                        <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                            [-] Delete Previous Slot
                        </Text>
                    </TouchableOpacity>
                    :<></>
                }

                <TouchableOpacity
                    style={[styles.buttonWrapper, {backgroundColor: theme.submitBtn}]}
                    onPress={() => navigation.navigate('Edit More Information', {
                        originalTitle,
                        originalLocation,
                        originalPrice,
                        originalDetails,
                        originalHandicapAccess,
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
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start'
    },
    timeSelect: {
        alignItems: "center",
        marginVertical: 20,
        marginTop: 10
    },
    timeSelectHeader: {
        fontWeight: "bold",
        fontSize: 18
    },
    buttonWrapper: {
        backgroundColor: "#e6697e",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 75,
        alignItems: "center"
    },
    button: {
        fontWeight: "bold"
    },
    header: {
        alignItems: "center",
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    addMore:{
        alignItems: "center",
        marginBottom: 20,
    },
    addMoreTxt:{
      fontWeight: "bold"
    }
});

export default EditToiletScreen;