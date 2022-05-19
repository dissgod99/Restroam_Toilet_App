import React from "react";
import {View, Text, StyleSheet} from 'react-native';



const Report = (props) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title} >
                    {props.title}
                </Text>
                <Text style = {styles.dateWritten}>
                    written on {props.date}
                </Text>
            </View>
            <View style={styles.text}>
                <Text>
                   {'\t'} {props.text} {'\n'}
                </Text>
            </View>
            
        </View>

        
    )
}
const styles = StyleSheet.create({
    container: {
        margin:20,
        borderTopWidth:3,

    },
    title:{
        fontSize:22,
        
    },
    dateWritten:{
        fontStyle:'italic',
        fontSize: 12,

    },
  
    text:{
        
    },
   
  
  }
);

export default Report;