import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Toilet = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemHeader}>{props.title}</Text>
                <View style={styles.content}>
                    <Text style={styles.price}>Price: {props.price}</Text>
                </View>
            </View>
            <View style={styles.itemRight}>
                <TouchableOpacity>
                    <FontAwesome name="edit" size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: '#C0C0C0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
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
    price:{
        fontSize: 18
    }
})

export default Toilet;