import React from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Toilet from './ownedToilets/Toilet';

const OwnedToiletsScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.toiletsWrapper}>
                    <Text style={styles.headerText}>
                        Your Owned Toilets:
                    </Text>
                    <View style={styles.items}>
                        <Toilet 
                            title={'Hauptbahnhof'} 
                            price={'1,00 €'}
                        />
                        <Toilet 
                            title={'Luisencenter'}
                            price={'0,50 €'}    
                        />
                        <Toilet
                            title={'Universität'}
                            price={'0,00 €'}
                        />
                        <Toilet
                            title={'Universität'}
                            price={'0,00 €'}
                        />
                        <Toilet
                            title={'Universität'}
                            price={'0,00 €'}
                        />
                        <Toilet
                            title={'Universität'}
                            price={'0,00 €'}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF'
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
