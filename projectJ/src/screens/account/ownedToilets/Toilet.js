import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Toilet = (props) => {
    return(
            <View style={styles.itemLeft}>
                <Text style={styles.itemHeader}>{props.title}</Text>
                <View style={styles.content}>
                    <Text style={styles.location}>Location: {props.location}</Text>
                    <Text style={styles.price}>Price: {props.price}</Text>
                </View>
            </View>
            
    );
}

const styles = StyleSheet.create({
    itemLeft:{
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    itemHeader:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        
    },
    location:{
        fontSize: 13
    },
    price:{
        fontSize: 18
    }
})

export default Toilet;