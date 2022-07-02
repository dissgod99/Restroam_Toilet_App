import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useState, useRef } from 'react';
import Theme from '../../darkMode/Theme';
import ThemeContext from '../../darkMode/ThemeContext';
import { CheckBox } from "@rneui/base";
import TimeSlot from './TimeSlot';

export default function AddToilet({navigation}) {
  
  const theme = useContext(ThemeContext)
  
  const [counter, setCounter] = useState(0);
  
  //let test = [null, null, []]
  const[test, setTest] = useState([{
    start: "",
    end: "",
    days: []
  }])
  const [part, setPart] = useState([])

  const [tableOfCheckedDays, setTableOfCheckedDays] = useState(
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

  const [hourSlots, setHourSlots] = useState([<TimeSlot data={test}/>])

  const MAX_NB_SLOTS = 7;

  const alreadyChecked = () => {
    let out = []
    if(part == []){
      return [];
    }
    part.forEach(obj => 
      {
        obj["days"].forEach(d => {
          out.push(d);
        })
      }
      );
    return out;
  }

  

  const addOneMoreTimeSlot = () =>{
    if(hourSlots.length < MAX_NB_SLOTS){
       // setCounter(counter + 1)
        console.log(counter)
        let checkedDays = alreadyChecked()
        console.log("CHECKED DAYYYS == ", checkedDays)
        console.log("TABLE == ", tableOfCheckedDays)
        console.log(Object.keys(tableOfCheckedDays))

        
        setHourSlots([...hourSlots, <TimeSlot data={test} check={tableOfCheckedDays}/>])
        // let addedItem = {
        //   start: "",
        //   end: "",
        //   days: []
        // }
        //let tmpp = test.push(addedItem);
        //setTest([...test, ["heyyyy"]]);
        if(part != []){
          console.log("NOT EMPTYY")
        
        part.forEach(e => {
          console.log("step ", e)
          let tmpDays = e["days"]
          tmpDays.forEach(d => {
          if(tableOfCheckedDays[d] == false){
            console.log("HERE, ", d)
            switch(d)
            {
              case "Mon":
                setTableOfCheckedDays({...tableOfCheckedDays, Mon:true});
                console.log("set MON");
                break;
              case "Tue":
                setTableOfCheckedDays({...tableOfCheckedDays, Tue:true});
                console.log("set Tue");
                break;
              case "Wed":
                setTableOfCheckedDays({...tableOfCheckedDays, Wed:true});
                console.log("set Wed");
                break;
              case "Thu":
                setTableOfCheckedDays({...tableOfCheckedDays, Thu:true});
                console.log("set Thu");
                break;
              case "Fri":
                setTableOfCheckedDays({...tableOfCheckedDays, Fri:true});
                console.log("set Fri");
                break;
              case "Sat":
                setTableOfCheckedDays({...tableOfCheckedDays, Sat:true});
                console.log("set Sat");
                break;
              case "Sun":
                setTableOfCheckedDays({...tableOfCheckedDays, Sun:true});
                console.log("set Sun");
                break;
              default:
                console.log("default CASE");
          }
        }
      })
      })}


        //console.log(tableOfCheckedDays["Mon"])
        setPart([...part, test])
        console.log("itemmmAfterInsertion == ", part);
        console.log("TableAfter == ", tableOfCheckedDays);
        //setPart([...part, test])
        //console.log("HourSlott == ", hourSlots)
      }
        else{
          return;
        }
  }
  
  const deletePreviousTimeSlot = () =>{
    if(hourSlots.length > 1){
      //setCounter(counter - 1)
      console.log(counter);
      let newList = [...hourSlots].slice(0, [...hourSlots].length-1)
      setHourSlots(newList)
      setPart([...part].slice(0, [...part].length-1))
      console.log("itemmmAfterDeletion == ", part);
    }
    else{
      return;
    }
  }
  
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView>
      
      <View style={styles.centerTitle}>
        <Text style={[styles.cadre, {color: theme.color}]}>
          Add New Toilet
        </Text>
      </View>
      

      <View style={[styles.hoursContainer, styles.centerTitle] }>
        <Text style={[styles.openingHoursTxt, {color: theme.color}]}>
          Select opening hours
        </Text>

        {hourSlots.map(({}, index) => {
          console.log("indexxxx", index)
          return  (<View key={index}>
                    <TimeSlot setData={setTest} data={test}/>
                  </View>)
                 }        
        )}
      </View>
        {hourSlots.length < 7 ?
  
        <TouchableOpacity style={styles.addMore} onPress={() => addOneMoreTimeSlot()}>
          <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                [+] Add more Slots
          </Text>
      </TouchableOpacity>
      :
      <></>
      
      }
      {
        
        hourSlots.length>1 ?
        <TouchableOpacity style={styles.addMore} onPress={() => deletePreviousTimeSlot()}>
          <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                [-] Delete Previous Slot
          </Text>
      </TouchableOpacity>
      :
      <></>
      
      }

        <TouchableOpacity 
                style={[styles.btn, {backgroundColor: theme.submitBtn}]}
                onPress={() => {
                  // code to check hours 
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
    //backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    height: "100%",
    width: "100%"

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
