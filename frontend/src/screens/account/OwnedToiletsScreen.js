import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";
import Toilet from './ownedToilets/Toilet';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import { BACKEND_ENDPOINT_TOILETS } from '../../constants';

const OwnedToiletsScreen = ({ route, navigation }) => {

    const { token } = route.params;

    const [toiletItems, setToiletItems] = useState([]);

    useEffect(() => {
        fetchToiletsBackend();
    });

    const fetchToiletsBackend = () => {
        axios
            .post(BACKEND_ENDPOINT_TOILETS + 'user-owned-toilets', { token })
            .then((response) => {
                const { data } = response;
                setToiletItems(data.payload);
            }).catch(err => console.log(err));
    }

    const deleteToilet = (index) => {
        let toiletsCopy = [...toiletItems];
        toiletsCopy.splice(index, 1);
        setToiletItems(toiletsCopy);
    }

    const editToilet = (index) => {
        navigation.navigate('Edit Toilet');
    }

    const updateToilets = () => {
        fetchToiletsBackend();
        console.log(toiletItems);
    }

    const theme = useContext(ThemeContext)

    return (
        <ScrollView>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.toiletsWrapper}>
                    <Text style={[styles.headerText, { color: theme.color }]}>
                        Your Owned Toilets:
                    </Text>
                    <View style={styles.items}>
                        {
                            toiletItems.map(([title, location, price], index) => {
                                return (
                                    <View key={index} style={[styles.item, { backgroundColor: theme.backgroundToilet }]}>
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
                                                <FontAwesome name="edit" size={25} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteToilet(index)}>
                                                <FontAwesome name="trash-o" size={25} />
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
    container: {
        flex: 1,
        //backgroundColor: '#FFF'
    },
    toiletsWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30
    },
    item: {
        //backgroundColor: '#FFF',
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
