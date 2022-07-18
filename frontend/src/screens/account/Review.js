import React, { useState, useEffect, useContext } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-rating';
import ThemeContext from "../../darkMode/ThemeContext";

const Review = (props) => {
    const [text, setText] = useState(props.text);
    const theme = useContext(ThemeContext);

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundToilet}]}>
            <View>
                <Text style={styles.title} >
                    {props.title}
                </Text>
                <Text style = {styles.dateWritten}>
                    written on {props.date}
                </Text>
            </View>
            <View style={styles.stars}>
            <StarRating
                maxStars={5}
                disabled={true}
                rating={props.stars}
                fullStarColor={"gold"}
                starSize={20}
            />
            </View>
            <View style={styles.text}>
                <Text>
                   {'\t'} {text} {'\n'}
                </Text>
            </View>
            <View style={styles.toolbar}>
                {/* <TouchableOpacity onPress={edit()}>
                    <FontAwesome name="edit" size={25}/>
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <FontAwesome name="trash-o" size={25}/>
                </TouchableOpacity>
                
            </View>
        </View>

        
    )
}
const styles = StyleSheet.create({
    container: {
        //margin:20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderTopWidth:3,
        borderRadius: 3,
        padding: 10
        

    },
    title:{
        fontSize:22,
        
    },
    dateWritten:{
        fontStyle:'italic',
        fontSize: 12,

    },
    stars:{
        flexDirection:'row',
        alignItems:'center',
        

    },
    text:{
        
    },
    toolbar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    }
   
  
  }
);

export default Review;