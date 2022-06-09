import React, { useState } from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Toilet from './ownedToilets/Toilet';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const OwnedToiletsScreen = ({navigation}) => {

    const [toiletItems, setToiletItems] = useState([]);

    const deleteToilet = (index) => {
        let toiletsCopy = [...toiletItems];
        toiletsCopy.splice(index, 1);
        setToiletItems(toiletsCopy);
    }

    const editToilet = (index) => {
        navigation.navigate('Edit Toilet');
    }

    const updateToilets = () => {
        setToiletItems([...toiletItems, ['Hauptbahnhof', 'Hauptbahnhof', '1.00€']])
        console.log(toiletItems);
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
                            toiletItems.map(([title, location, price], index) => {
                                return(
                                    <View key={index} style={styles.item}>
                                        <Toilet
                                            title={title}
                                            location={location}
                                            price={price}
                                        />
                                        <View style={styles.itemRight}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Edit Toilet', {
                                                editTitle: title,
                                                editLocation: location,
                                                editPrice: price
                                            })}>
                                                <FontAwesome name="edit" size={25}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteToilet(index)}>
                                                <FontAwesome name="trash-o" size={25}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
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
    },
    item:{
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 7,
        borderWidth: 4,
        borderColor: '#C0C0C0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    }
});

export default OwnedToiletsScreen;
