import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { TimePicker } from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddToilet from '../addPage/AddToilet';


export default function AddScreen({ navigation }) {
    // const defaultHours = 0;
    // const defaultMins = 0;

    // const [selectedHours, setSelectedHours] = useState(0);
    // const [selectedMinutes, setSelectedMinutes] = useState(0);

    // const [selectedHours, setSelectedHours] = useState(0);
    // const [selectedMinutes, setSelectedMinutes] = useState(0);
    // return (
        // <View style={styles.container}>
        //     <Text onPress={() => alert('This is the "Detail" screen')}
        //         style={{ fontSize: 26, fontWeight: 'bold' }} >Add Screen</Text>
        // </View>

        // <View style={styles.container}>
        //     <Text style={styles.title}>
        //         Add new Toilet
        //     </Text>

        //     <View style={styles.openingTimes}>
        //         <Text style={styles.textOpeningHours}>
        //             Opening Hours
        //         </Text>
        //         <View>
        //                 <TimePicker
        //                     selectedHours={selectedHours}
        //                     selectedMinutes={selectedMinutes}
        //                     onChange={(hours, minutes) => {
        //                         setSelectedHours(hours);
        //                         setSelectedMinutes(minutes);
        //                     }}
        //                 />

        //         </View>

        //     </View>

        //     <Button 
        //         title='Press Me'
        //     />
        // </View>

    //     <SafeAreaView style={styles.container}>
    //         <View style={styles.container}>
    //             <Text style={styles.title}>
    //             React Native Time Picker – To Pick the Time using Native Time Picker
    //             </Text>
    //             <Text>
    //             Selected Time: {selectedHours}:{selectedMinutes}
    //             </Text>
    //             <TimePicker
    //             selectedHours={selectedHours}
    //             //initial Hourse value
    //             selectedMinutes={selectedMinutes}
    //             //initial Minutes value
    //             // onChange={(selectedHours, selectedMinutes) => {
    //             //      setSelectedHours(selectedHours);
    //             //      setSelectedMinutes(selectedMinutes);
    //             //  }}
    //             />
    //         </View>
    //     </SafeAreaView>


    // )

    // const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode] = useState('time');
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    // //const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    // //setDate(currentDate);
    // };

    // const showMode = (currentMode) => {
    // setShow(true);
    // setMode(currentMode);
    // };

    // // const showDatepicker = () => {
    // // showMode('date');
    // // };

    // const showTimepicker = () => {
    // showMode('time');
    // };

    // return (
    //     <View>
    //     {/* <View>
    //       <Button onPress={showDatepicker} title="Show date picker!" />
    //     </View> */}
    //     <View>
    //       <Button onPress={showTimepicker} title="Show time picker!" />
    //       <Text></Text>
    //     </View>
    //     {show && (
    //       <DateTimePicker
    //         testID="dateTimePicker"
    //         value={date}
    //         mode={mode}
    //         is24Hour={true}
    //         display="default"
    //         onChange={onChange}
    //       />
    //     )}
    //   </View>


    // );

    return(
        // <View style={styles.container}>
        //     <Text>Add Page</Text>

        // </View>
        <View style= {styles.container}>
            <AddToilet navigation={navigation}/>


        </View>
        
    );


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        
    },
    openingTimes: {
       
    }
});
