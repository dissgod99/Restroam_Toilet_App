import React, { useContext } from "react";
import {View, Text, StyleSheet} from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";

const Report = (props) => {
    const theme = useContext(ThemeContext)
    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundToilet}]}>
            <View>
                <Text style={styles.title} >
                    {props.title}
                </Text>
                <Text style = {styles.dateWritten}>
                    written on {props.date} by {props.username}
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
        marginHorizontal:20,
        marginVertical: 10,
        borderTopWidth:3,
        borderRadius: 5,
        padding: 5

    },
    title:{
        fontSize:22,
        fontWeight: "bold"
        
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