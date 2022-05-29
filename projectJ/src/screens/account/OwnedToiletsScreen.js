import React, {useContext} from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";
import Toilet from './ownedToilets/Toilet';

const OwnedToiletsScreen = () => {

    const theme = useContext(ThemeContext)

    return (
        <ScrollView>
            <View style={[styles.container, {backgroundColor: theme.background}]}>
                <View style={styles.toiletsWrapper}>
                    <Text style={[styles.headerText, {color: theme.color}]}>
                        Your Owned Toilets:
                    </Text>
                    <View style={styles.items}>
                        <Toilet 
                            title={'Hauptbahnhof'} 
                            location={'Hauptbahnhof'}
                            price={'1,00 €'}
                        />
                        <Toilet 
                            title={'Luisencenter'}
                            location={'Luisencenter'}
                            price={'0,50 €'}    
                        />
                        <Toilet
                            title={'Universität'}
                            location={'Audimax'}
                            price={'0,00 €'}
                        />
                        <Toilet
                            title={'Universität'}
                            location={'Lichtwiese'}
                            price={'0,00 €'}
                        />
                        <Toilet
                            title={'Universität'}
                            location={'Lichtwiese'}
                            price={'0,00 €'}
                        />
                        <Toilet
                            title={'Universität'}
                            location={'Lichtwiese'}
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
        //backgroundColor: '#FFF'
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
