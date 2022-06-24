import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useState, useRef } from 'react';
import Theme from '../../darkMode/Theme';
import ThemeContext from '../../darkMode/ThemeContext';
import { CheckBox } from "@rneui/base";
import TimeSlot from './TimeSlot';

export default function AddToilet({navigation}) {
  const [dayIsChecked, setDayIsChecked] = useState(

    {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false
    }
  )
 
  const theme = useContext(ThemeContext)

  // Use States for Starting hours
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [text, setText] = useState("<Starting Hour>");

  // Use States for Closing hours
  const [dateEnd, setDateEnd] = useState(new Date());
  const [modeEnd, setModeEnd] = useState('time');
  const [showEnd, setShowEnd] = useState(false);
  const [textEnd, setTextEnd] = useState("<Closing Hour>");


  const [hourSlots, setHourSlots] = useState([])

  const[clicked, setClicked] = useState(false)

  const addOneMoreTimeSlot = () =>{
        setClicked(true)
  }

  
  const padTo2Digits= (num)=> {
    return String(num).padStart(2, '0');
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate)
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate();
    let fTime = padTo2Digits(tempDate.getHours()) + ":" + padTo2Digits(tempDate.getMinutes());
    setText(fTime); 
    setShow(!show)
  }

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setDateEnd(currentDate)
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate();

    let hours = tempDate.getHours();
    let fTime = padTo2Digits(tempDate.getHours()) + ":" + padTo2Digits(tempDate.getMinutes());
    
    setTextEnd(fTime); 
    setShowEnd(!showEnd)
  }


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  const displayTimepicker = () => {
    showMode("time");
    setShow(true);
    console.log("show === " + show)
  };
  const displayEndTimepicker = () => {
    showModeEnd("time");
    setShowEnd(true);
    console.log("show === " + showEnd)
  };



  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor: theme.background}}>
      
      <View style={styles.centerTitle}>
        <Text style={[styles.cadre, {color: theme.color}]}>
          Add New Toilet
        </Text>
      </View>
      

      <View style={[styles.hoursContainer, styles.centerTitle] }>
        <Text style={[styles.openingHoursTxt, {color: theme.color}]}>
          Select opening hours
        </Text>


        {/* <TimeSlot />
        <TimeSlot />
        <TimeSlot />
        <TimeSlot />
        <TimeSlot /> */}


        <View style={styles.alignCenter}>
          <View style={styles.alignButtons}>

            <View style={styles.startBox}>
                <Text style={[styles.marginHours, {color: theme.color}]}>From {text}</Text>
                <Button title="Pick Start Time" 
                        onPress={displayTimepicker}
                        color={theme.submitBtn}
                        />
                {show && (
                  <DateTimePicker 
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  
                  />
                )}
            </View>

            <View style={styles.startBox}>
                <Text style={[styles.marginHours, {color: theme.color}]}>To {textEnd}</Text>
                <Button title="Pick End Time" 
                        onPress={displayEndTimepicker}
                        color={theme.submitBtn}
                        />
                {showEnd && (
                  <DateTimePicker 
                    testID='dateTimePicker'
                    value={dateEnd}
                    mode={modeEnd}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEnd}
                    background={"#cc0000 "}
                  
                  />
                )}
            </View>

          </View>
    
          <View style={styles.entireCheckBox}>
            <View style={styles.checkboxes}>
                <CheckBox  
                  title="Mon"
                  textStyle={{color: theme.color}}
                  containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Mon}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Mon: !dayIsChecked.Mon
                  })
                  }
                />
                <CheckBox  
                  title="Tue"
                  textStyle={{color: theme.color}}
                  containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Tue}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Tue: !dayIsChecked.Tue
                  })
                  }
                  
                />
                <CheckBox  
                  title="Wed"
                  textStyle={{color: theme.color}}
                  containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Wed}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Wed: !dayIsChecked.Wed
                  })
                  
                  }
                />
                
            </View>
            <View style={styles.checkboxes}>
            <CheckBox  
                  title="Thu"
                  textStyle={{color: theme.color}}
                  containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Thu}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Thu: !dayIsChecked.Thu
                  })
                  }
                />
              <CheckBox  
                title="Fri"
                textStyle={{color: theme.color}}
                containerStyle={{backgroundColor: theme.background}}  
                checked={dayIsChecked.Fri}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Fri: !dayIsChecked.Fri
                  })
                  }
              />
              <CheckBox  
                title="Sat"
                textStyle={{color: theme.color}}
                containerStyle={{backgroundColor: theme.background}}  
                checked={dayIsChecked.Sat}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Sat: !dayIsChecked.Sat
                  })
                  }
              />
              <CheckBox
                textStyle={{color: theme.color}}
                containerStyle={{backgroundColor: theme.background}}  
                title="Sun"
                checked={dayIsChecked.Sun}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Sun: !dayIsChecked.Sun
                  })
                  }
                  disabled={true}
              />
              
            </View>
            
            </View>
      
      {/* <View style={styles.alignButtons}>

      <View style={styles.startBox}>
          <Text style={[styles.marginHours, {color: theme.color}]}>From {text}</Text>
          <Button title="Pick Start Time" 
                  onPress={displayTimepicker}
                  color={theme.submitBtn}
                  />
          {show && (
            <DateTimePicker 
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            
            />
          )}
      </View>

      <View style={styles.startBox}>
          <Text style={[styles.marginHours, {color: theme.color}]}>To {textEnd}</Text>
          <Button title="Pick End Time" 
                  onPress={displayEndTimepicker}
                  color={theme.submitBtn}
                  />
          {showEnd && (
            <DateTimePicker 
              testID='dateTimePicker'
              value={dateEnd}
              mode={modeEnd}
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
              background={"#cc0000 "}
            
            />
          )}
      </View>

      </View>

      <View style={styles.entireCheckBox}>
      <View style={styles.checkboxes}>
          <CheckBox  
            title="Mon"
            checked={dayIsChecked.Mon}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Mon: !dayIsChecked.Mon
            })
            }
          />
          <CheckBox  
            title="Tue"
            checked={dayIsChecked.Tue}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Tue: !dayIsChecked.Tue
            })
            }
            
          />
          <CheckBox  
            title="Wed"
            checked={dayIsChecked.Wed}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Wed: !dayIsChecked.Wed
            })
            
            }
          />
          <CheckBox  
            title="Thu"
            checked={dayIsChecked.Thu}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Thu: !dayIsChecked.Thu
            })
            }
          />
      </View>
      <View style={styles.checkboxes}>
        <CheckBox  
          title="Fri"
          checked={dayIsChecked.Fri}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Fri: !dayIsChecked.Fri
            })
            }
        />
        <CheckBox  
          title="Sat"
          checked={dayIsChecked.Sat}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Sat: !dayIsChecked.Sat
            })
            }
        />
        <CheckBox  
          title="Sun"
          checked={dayIsChecked.Sun}
            checkedColor={theme.check}
            onPress={() => setDayIsChecked({
              ...dayIsChecked,
              Sun: !dayIsChecked.Sun
            })
            }
        />
      </View>
      </View> */}


        </View>

      
      </View>

        <TouchableOpacity style={styles.addMore} onPress={() => addOneMoreTimeSlot}>
          <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                [+] Add more
          </Text>
      </TouchableOpacity>


      {
        clicked?
        <View>
          <Text>HELOOOOOOOOOOOOOOOOOOOOOOOODFJSHKGVHSDFJK</Text>
        </View> 
        :
        <></>

      }



        <TouchableOpacity 
                style={[styles.btn, {backgroundColor: theme.submitBtn}]}
                onPress={() => {
                  navigation.navigate("More Toilet Infomation")}}
                        >
                <Text style={styles.stOfSubmit}>
                                Next
                </Text>
            </TouchableOpacity>

        
            </ScrollView>
    </View >
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    height: "100%"

  },
  cadre: {
    fontSize: 20,
    fontWeight: "bold"
  },
  centerTitle: {
    alignItems: "center",
    marginTop: 45
  },
  btn: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 75,
    alignItems: "center"

},
stOfSubmit:{
    fontWeight: "bold"
},
openingHoursTxt: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8
},
hoursContainer: {
    marginTop: 10
},
holeContainer:{
  width: "50%"
},
entireCheckBox:{
  justifyContent: "center",
  alignItems: "center",
  
},
checkboxes:{
  flexDirection: "row",
},
safeContainerStyle: {
  flex: 1,
  margin: 20,
  justifyContent: "center",
},
DropDown:{
  flexDirection: "row"
},
addMore:{
  alignItems: "center",
  marginBottom: 20,
},
addMoreTxt:{
  fontWeight: "bold"
},
alignButtons:{
  flexDirection: "row",
  alignItems: "center"
},
startBox:{
  marginHorizontal: 15,
  alignItems: "center"
},
alignCenter:{
  alignItems: "center"
},
marginHours:{
  marginBottom: 3
}
});
