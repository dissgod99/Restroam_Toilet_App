import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Toilet from './ownedToilets/Toilet';

const OwnedToiletsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.toiletsWrapper}>
                <Text style={styles.headerText}>
                    Your Owned Toilets:
                </Text>
                <View style={styles.items}>
                    <Toilet 
                        title={'This is a toilet'} 
                        price={'1,00 €'}
                    />
                    <Toilet 
                        title={'This is another toilet'}
                        price={'0,50 €'}    
                    />
                    <Toilet
                        title={'This is a third toilet'}
                        price={'0,00 €'}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fae8e0'
    },
    toiletsWrapper:{
        paddingTop: 40,
        paddingHorizontal: 20
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    items:{
        marginTop: 30
    }
});

export default OwnedToiletsScreen;
