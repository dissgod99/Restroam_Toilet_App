import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import TimeSelect from './TimeSelect';

export default function TimeSelectArray({ tempOpeningTimes, updateOpeningTimes }) {

  const weekArray = [
    {
      day: 'Monday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Tuesday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Wednesday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Thursday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Friday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Saturday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Sunday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
  ];

  const updateByDay = (day, hourOrMin, startOrEnd, value) => {
    let tmp1 = {};
    tmp1[[startOrEnd]] = value;
    let tmp2 = {};
    tmp2[hourOrMin] = tmp1;
    tempOpeningTimes[day] = tmp2;
    console.log('inside TimeSelectArray updating to:' + JSON.stringify(tempOpeningTimes));
    updateOpeningTimes(tempOpeningTimes);
  }

  return (
    <View style={styles.cadreInput}>
      {weekArray.map(v => {
        return (
          <TimeSelect day={v.day} startHour={v.startHour}
            startMinute={v.startMinute}
            endHour={v.endHour} endMinute={v.endMinute}
            updateByDay={updateByDay}
            key={v.day}
          >

          </TimeSelect>);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cadreInput: {
    margin: 5,
    borderRadius: 15,
    fontSize: 150,
  },
});
