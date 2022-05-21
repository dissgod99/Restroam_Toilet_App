import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity } from 'react-native';
import TimeSelectArray from './TimeSelectArray';
import { useState } from 'react';

export default function AddToilet({navigation}) {
  
  return (
      
    <View style={styles.container}>
        <ScrollView>
      
      <View style={styles.centerTitle}>
        <Text style={styles.cadre}>
          Add New Toilet
        </Text>
        </View>
      

      <View style={[styles.hoursContainer, styles.centerTitle] }>
        <Text style={styles.openingHoursTxt}>
          Select opening hours
        </Text>
        
        <TimeSelectArray></TimeSelectArray>
        
      </View>
        <TouchableOpacity 
                style={styles.btn}
                onPress={() => navigation.navigate("More Toilet Infomation")}
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
    justifyContent: 'flex-start'

  },
  cadre: {
    //borderWidth: 1,
    //backgroundColor: "#fae8e0",
    //padding: "2%",
    //paddingLeft: "35%",
    //paddingRight: "35%",
    //marginTop: "2.5%",
    fontSize: 20,
    fontWeight: "bold"
  },
  centerTitle: {
    alignItems: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "#e6697e",
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
    fontSize: 18
},
hoursContainer: {
    marginTop: 10
}
});
