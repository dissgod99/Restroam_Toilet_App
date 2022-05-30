import React, { useState } from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Toilet from './ownedToilets/Toilet';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const OwnedToiletsScreen = (navigation) => {

    const [toiletItems, setToiletItems] = useState([]);

    const deleteToilet = (index) => {
        let toiletsCopy = [...toiletItems];
        toiletsCopy.splice(index, 1);
        setToiletItems(toiletsCopy);
    }

    const updateToilets = () => {
        setToiletItems([...toiletItems, ('Hauptbahnhof', 'Hauptbahnhof', '1.00€')])
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.toiletsWrapper}>
                    <Text style={styles.headerText}>
                        Your Owned Toilets:
                    </Text>
                    <View style={styles.items}>

                        {
                            toiletItems.map((title, location, price, index) => {
                                return(
                                    <View key={index}>
                                        <Toilet
                                            title={title}
                                            location={location}
                                            price={price}
                                        />
                                        <TouchableOpacity>
                                            <FontAwesome name="edit" size={25}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteToilet(index)}>
                                            <FontAwesome name="trash-o" size={25}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }

                        {/* <Toilet 
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
                        /> */}
                    </View>
                    <TouchableOpacity onPress={() => updateToilets()}>
                        <Text>Update</Text>
                    </TouchableOpacity>
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
