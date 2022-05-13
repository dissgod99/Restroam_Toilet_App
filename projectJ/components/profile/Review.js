import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-rating';


const edit =()=>{

};

const deleteReview =()=>{
    
};
const nothing =()=>{
    
};

const Review = (props) => {
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
            <View style={styles.stars}>
            <StarRating
                maxStars={5}
                disabled={true}
                rating={props.stars}
                selectedStar={(rating) => nothing()}
                fullStarColor={"gold"}
                starSize={20}
            />
            </View>
            <View style={styles.text}>
                <Text>
                   {'\t'} {props.text} {'\n'}
                </Text>
            </View>
            <View style={styles.toolbar}>
                <TouchableOpacity onPress={edit()}>
                    <FontAwesome name="edit" size={25}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteReview()}>
                    <FontAwesome name="trash-o" size={25}/>
                </TouchableOpacity>
                
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