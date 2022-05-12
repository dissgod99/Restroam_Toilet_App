import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Toilet = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemHeader}>{props.title}</Text>
                <View style={styles.content}>
                    <Text style={styles.price}>Price: {props.price}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
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