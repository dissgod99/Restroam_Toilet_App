import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useState, useRef, useEffect } from 'react';
import Theme from '../../darkMode/Theme';
import ThemeContext from '../../darkMode/ThemeContext';
import { CheckBox } from "@rneui/base";
import TimeSlot from './TimeSlot';

export default function AddToilet({navigation}) {
  
  const theme = useContext(ThemeContext)
  
  const [counter, setCounter] = useState(0);
  const [deleteItem, setDeleteItem] = useState(100);
  const [clickNext, setClickNext] = useState(false)
  //let test = [null, null, []]
  const[test, setTest] = useState({
    start: "",
    end: "",
    days: []
  })

  const [part, setPart] = useState([])
  const [rescue, setRescue] = useState([])
  const [out, setOut] = useState([])
    useEffect(() => {
      if(test.days.length==0 || 
        test.end == "<Closing Hour>" ||
        test.start == "<Starting Hour>"
        ){
          return;
        }
        else{ 
          if(counter == 0){
              if(rescue.length > 0){
              const check = rescue[rescue.length-1].days.every(e => {
                return test.days.includes(e);
              })
              console.log("testy", check)
              if(check)
                {setRescue([...rescue.slice(0, rescue.length-1), test]);}}
              else
              {setRescue([...rescue, test]);}}
          
          else{
            const check2 = rescue[rescue.length-1].days.every(e => {
              return test.days.includes(e);
            })
            console.log("testy22", check2)
              if(check2)
                {setRescue([...rescue.slice(0, rescue.length-1), test]);}
              else
              {setRescue([...rescue, test]);}
          }
        
        }
      
  }, [test])

  useEffect(() => {
    setRescue(rescue.slice(0, rescue.length-1));
  }, [deleteItem])

  // useEffect(() => {
  //   if(test.days.length==0 || 
  //           test.end == "<Closing Hour>" ||
  //           test.start == "<Starting Hour>"
  //           ){
  //             return;
  //           }else{
  //   setRescue([...rescue, test])}
  // }, [counter, clickNext])

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

  const [hourSlots, setHourSlots] = useState([<View >
                                                <TimeSlot data={test}/> 
                                              </View>])
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
  const checkBoundaries = (objects) =>{
    let valid = true;
    // if(objects == []){
    //   console.log(" FIRST CASE !!!!!");
    //   return false;
    // }
    objects.forEach(object => {
      valid = object["end"] > object["start"] && object["end"] != "<Closing Hour>" && object["start"] != "<Starting Hour>" 
      //valid = object["end"] > object["start"];
      if(valid == false){
        console.log(" 2nd CASE !!!!!");
        return valid
      }
    })
    console.log(" third CASE !!!!!");
    return valid
  }

  

  const addOneMoreTimeSlot =  () =>{
    if(hourSlots.length < MAX_NB_SLOTS){
       setCounter(counter + 1)
        console.log(counter)
        let checkedDays = alreadyChecked()
        //console.log("CHECKED DAYYYS == ", checkedDays)
        //console.log("TABLE == ", tableOfCheckedDays)
        console.log(Object.keys(tableOfCheckedDays))

        
        
        
        // setTableOfCheckedDays({...tableOfCheckedDays, Mon: true})
        // console.log("TTHISSS == ", tableOfCheckedDays)
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

        setHourSlots([...hourSlots, <TimeSlot data={test} check={["Mon", "Tue"]}/>])
        //console.log(tableOfCheckedDays["Mon"])
        setPart([...part, test])
        //console.log("itemmmAfterInsertion == ", part);
        //console.log("TableAfter == ", tableOfCheckedDays);
        //setPart([...part, test])
        //console.log("HourSlott == ", hourSlots)
        //setOut([...out, rescue[rescue.length-1]])


      }
        else{
          return;
        }






  }
  
  const deletePreviousTimeSlot = () =>{
    if(hourSlots.length > 1){
      //setCounter(counter - 1)
      //console.log(counter);
      let newList = [...hourSlots].slice(0, [...hourSlots].length-1)
      // Check days Array
      setHourSlots(newList)
      setPart([...part].slice(0, [...part].length-1))
      setDeleteItem(deleteItem-1);
      //setRescue([...rescue].slice(0, [...rescue].length-1))
      //console.log("itemmmAfterDeletion == ", part);
      //console.log("TableAfterDeletion == ", tableOfCheckedDays)
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
          //console.log("indexxxx", index)
          return  (
                  <View key={index} pointerEvents={hourSlots.length == index+1 ? "auto" : "none"}>
                    <TimeSlot setData={setTest} data={test}/>
                  </View> 
                  )
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
                  //addOneMoreTimeSlot();
                  // code to check hours 
                  //addOneMoreTimeSlot();
                  //deletePreviousTimeSlot();
                  const emptyHours = [
                    {
                      days: [],
                    }

                  ]
                  // if(rescue[0].days.length==0 && 
                  //   rescue[0].end == "<Closing Hour>" &&
                  //   rescue[0].start == "<Starting Hour>"
                  //   ){
                  //     Alert.alert(
                  //           "ERROR",
                  //           "Please choose opening times and days",
                  //           [
                  //             {  
                  //               text: 'Cancel',  
                  //               onPress: () => console.log('Cancel ERROR Pressed'),  
                  //               style: 'cancel',  
                  //           },  
                  //           {text: 'OK', onPress: () => console.log('OK ERROR Pressed')},  
                  //           ]
                  //         )
                  // }                  
                  // else{
                  console.log("Skipped to the good part") 
                  //setClickNext(!clickNext); 
                  //setCounter(counter + 0.5);
                  //setClickNext(true);
                  console.log("Click SET to TRUE");
                  console.log("Data just before Next Click == ", rescue);
                  //setOut([...out, rescue[rescue.length-1]])
                  //console.log("SSETOUTTT === ", out)
                  // CASE 0: NO PROBLEM
                  // navigation.navigate("More Toilet Infomation");
                
                  if(rescue.length == 0){
                    Alert.alert(
                      "ERROR",
                      "Please choose opening times and days",
                      [
                        {  
                          text: 'Cancel',  
                          onPress: () => console.log('Cancel ERROR Pressed'),  
                          style: 'cancel',  
                      },  
                      {text: 'OK', onPress: () => console.log('OK ERROR Pressed')},  
                      ]
                    )
                  }else{
                    const checkInputs = rescue.every(obj => {
                      const times = (obj["start"] < obj["end"]) && (obj["days"].length!=0)
                      
                      return times;
                    })
                    if(checkInputs){
                      navigation.navigate("More Toilet Infomation");
                    }else{
                      Alert.alert(
                                "Selected times/days problem",
                                "Days must be selected AND End Time cannot be smaller than start time",
                                [
                                  {  
                                    text: 'Cancel',  
                                    onPress: () => console.log('Cancel Pressed'),  
                                    style: 'cancel',  
                                },  
                                {text: 'OK', onPress: () => console.log('OK Pressed')},  
                                ]
                              )
                            }
                    }
                    
                  }
                  
                  
                  // else{
                  //   navigation.navigate("More Toilet Infomation");
                  // }
                
                
                
                
                
                
                
                
                
                  
                  // console.log("PARRRRTRTTT == ", part)
                  //else{
                    //navigation.navigate("More Toilet Infomation");

                  //   if (checkBoundaries(part)){
                  //       //setHourSlots([...hourSlots, <></> ])
                  //       console.log("DATA when CLICK == ", part)
                  //       navigation.navigate("More Toilet Infomation")
                  //     }else{
                  //       Alert.alert(
                  //         "Selected times problem",
                  //         "End Time cannot be smaller than start time OR Times cannot be undefined",
                  //         [
                  //           {  
                  //             text: 'Cancel',  
                  //             onPress: () => console.log('Cancel Pressed'),  
                  //             style: 'cancel',  
                  //         },  
                  //         {text: 'OK', onPress: () => console.log('OK Pressed')},  
                  //         ]
                  //       )
                  //     }

                  // }







                  // else if (checkBoundaries(part)){
                  //   //setHourSlots([...hourSlots, <></> ])
                  //   console.log("DATA when CLICK == ", part)
                  //   navigation.navigate("More Toilet Infomation")
                  // }else{
                  //   Alert.alert(
                  //     "WARNING",
                  //     "End Time cannot be smaller than start time",
                  //     [
                  //       {  
                  //         text: 'Cancel',  
                  //         onPress: () => console.log('Cancel Pressed'),  
                  //         style: 'cancel',  
                  //     },  
                  //     {text: 'OK', onPress: () => console.log('OK Pressed')},  
                  //     ]
                  //   )
                  // }
                }
              
                  
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
