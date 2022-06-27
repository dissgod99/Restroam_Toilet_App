import React, { useState, useRef, useEffect } from 'react';
import { Text, Image, ScrollView, Fragment, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from '../../global/mapStyle';
import * as Location from 'expo-location'
import renderIf from './renderIf'
import MapViewDirections from 'react-native-maps-directions';
import StarRating from 'react-native-star-rating';
import DropDown from './DropDown';

const _ = require('lodash');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'expo-location';

import axios from "axios";
import { BACKEND_ENDPOINT_TOILETS } from '../../constants';


export default function MapScreen({ navigation }) {
    const [latlng, setLatLng] = useState({});
    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 100,
    });
    const [toiletsAround, setToiletsAround] = useState([{ latitude: 49.895685, longitude: 8.681163 },
    { latitude: 49.895975, longitude: 8.683416 },
    { latitude: 49.897620, longitude: 8.681999 },
    { latitude: 49.897316, longitude: 8.684767 },
    { latitude: 49.8693297, longitude: 8.6371352 },
    { latitude: 49.865, longitude: 8.6371350 },

    ]);

    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if (hasPermission.status === 'granted') {
            const permission = await askPermission();
            return permission;
        }
    }

    const askPermission = async () => {
        const permission = await Location.requestBackgroundPermissionsAsync();
        return permission.status === 'granted';
    }

    const getLocation = async () => {
        try {
            await Location.enableNetworkProviderAsync();
            let pos = await Location.getCurrentPositionAsync({ highAccuracy: true });
            setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            //await getToiletsAroundUser();

        }
        catch (err) {
            console.log("something went wrong")
        }
    }

    const getToiletsAroundUser = async () => {
        console.log("heree");
            console.log(position);
            axios.post(`${BACKEND_ENDPOINT_TOILETS}/nearestToilets`, {
                latitude: position.latitude,
                longitude: position.longitude
            }).then(
                ({ status, data }) => {
                    console.log(data.payload);
                    //setToiletsAround({latitude:data.latitude, longitude:data.longitude});
                    setToiletsAround(data.payload);
                }
            )
            .catch(err => console.log("error"));
        
    }

    const _map = useRef(1);



    useEffect(() => {
        checkPermission();
        getLocation();

    }, [])


    const [clicked, setClicked] = useState(false);

    const handleSubmit = () => {
        setClicked(!clicked);

    }

    var item = {
        name: "toilet1",
        location: "kethastraße",
        stars: 2.5,
        description: "very good",
        openingHours: {
            Monday: '10:00-17:00',
            Tuesday: '10:00-17:00',
            Wednesday: '10:00-17:00',
            Thursday: '10:00-17:00',
            Friday: '10:00-17:00',
            Saturday: '10:00-17:00',
            Sunday: '10:00-17:00',
        },
    }

    const [markerclicked, setMarkerlicked] = useState(false);
    const [itemclicked, setItemclicked] = useState({});
    const [indexclicked, setIndexclicked] = useState(-1);
    const markerClick = async (item1, index) => {
        console.log(index);
        if (indexclicked == -1) {
            setMarkerlicked(!markerclicked);
            setIndexclicked(index);
        }
        else if (indexclicked == index) {
            setMarkerlicked(!markerclicked);
            setIndexclicked(-1);
        }
        else {
            setIndexclicked(index);
        }
        getToiletsAroundUser();

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <DropDown></DropDown>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={position}
            >
                {toiletsAround.map((item, index) => {
                    return <MapView.Marker
                        coordinate={item}
                        key={index.toString()}
                        //title={marker.title}
                        //description={marker.description}
                        onPress={() => markerClick(item, index)}>
                        <Image source={require('../../../assets/toiletMarker.png')}
                            style={styles.toiletsAround}
                            resizeMode="cover" />
                    </MapView.Marker>
                })}
                <MapViewDirections
                    origin={
                        //latlng
                        toiletsAround[0]
                    }
                    destination={
                        //item
                        toiletsAround[1]}

                    apikey={"AIzaSyCFbwdnUJoJA5FD6NiAwFevhUnU5jHWycA"}
                    strokeWidth={3}
                    strokeColor="#222"
                />
            </MapView>

            {/* <View style={styles.top}>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        >
                        <Text style={styles.textStyle}>Nearby</Text>
                    </TouchableOpacity>
                </View> */}
            {renderIf(markerclicked)(
                <View style={styles.bottom}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            width: '45%'
                        }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={{ fontSize: 10 }}>{item.location}</Text>
                            <View style={styles.stars}>
                                <StarRating
                                    maxStars={5}
                                    disabled={true}
                                    rating={item.stars}
                                    selectedStar={(rating) => { }}
                                    fullStarColor={"gold"}
                                    starSize={20}
                                />
                            </View>

                            <Text style={styles.item}>{item.description}</Text>

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginRight: '15%'
                            }}>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    marginTop: '10%',
                                    alignItems: 'center',
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                    padding: '2%',
                                    width: '32%'
                                }}>
                                    <Icon name="walk" size={25} color={"black"} />
                                    <Text style={{
                                        fontSize: 7.5
                                    }}>Directions</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    marginTop: '10%',
                                    alignItems: 'center',
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                    padding: '2%',
                                    width: '32%'
                                }} onPress={() => {
                                    navigation.navigate("Rating")
                                }
                                }>
                                    <Icon name="pencil-box-multiple" size={25} color={"black"} />
                                    <Text style={{
                                        fontSize: 7.5
                                    }}>Reviews</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    marginTop: '10%',
                                    alignItems: 'center',
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                    padding: '2%',
                                    width: '32%'
                                }}>
                                    <Icon name="alert" size={25} color={"black"} />
                                    <Text style={{
                                        fontSize: 7.5
                                    }}>Report</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            width: '50%',
                            marginRight: '5%'
                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>Opening Hours</Text>
                            {
                                Object.entries(item.openingHours).map((key) => {
                                    return (<View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        fontWeight: '20'
                                    }} key={key}>
                                        <Text>
                                            {key[0] + ': '}
                                        </Text>
                                        <Text>
                                            {key[1]}
                                        </Text>
                                    </View>)
                                })
                            }
                        </View>
                    </View>



                </View>)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.1,
    },

    map: {
        position: 'absolute',
        flex: 1,
        height: "100%",
        width: "100%",
    },

    toiletsAround: {
        width: 30,
        height: 30,

    },

    itemStyle: {
        fontSize: 10,
        color: "#007aff"
    },

    textStyle: {
        fontSize: 16,
    },
    top: {
        position: 'absolute',
        backgroundColor: "#fff",
        //paddingBottom: 150,
        //paddingTop: 220,
        //paddingHorizontal: 30
        width: "70%",
        top: "0%",
        height: "5%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        alignContent: "center",

    },
    tophidden: {
        backgroundColor: "#fff",
        //paddingBottom: 150,
        //paddingTop: 220,
        //paddingHorizontal: 30
        position: 'absolute',
        paddingBottom: 10,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        width: "70%",
        height: "20%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        alignContent: "center",

    },
    bottom: {
        position: 'absolute',
        backgroundColor: "#fff",
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 10,
        flex: 0.2,
        bottom: "1%",
        width: "98%",
        left: "1%",
        borderRadius: 30,
        alignItems: "flex-start",
        alignContent: "center",

    },
    title: {
        fontSize: 22,

    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
    },


});
