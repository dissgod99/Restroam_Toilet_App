import React,{useState, useRef, useEffect} from 'react';
import { Text,Image,ScrollView,Fragment,FlatList,TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { mapStyle } from '../../global/mapStyle';
import * as Location from 'expo-location'
import renderIf from './renderIf'

export default function MapScreen({ navigation }) {
    const [latlng,setLatLng]=useState({});
    const checkPermission = async() => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if(hasPermission.status==='granted'){
            const permission= await askPermission();
            return permission;
        }
    }

    const askPermission = async()=>{
        const permission = await Location.requestBackgroundPermissionsAsync();
        return permission.status==='granted';
    }

    const getLocation = async() =>{
        try{
            const {granted} = await Location.requestBackgroundPermissionsAsync();
            if(!granted){
                return;
            }
            const {
                coords:{latitude,longitude}
            }=await Location.getCurrentPositionAsync();
            setLatLng({latitude:latitude,longitude:longitude});
        }
        catch(err){

        }
    }

    const _map=useRef(1);

    useEffect(() => {
        checkPermission();
        getLocation()
        ,[]})

    const toiletsAround =[{latitude:49.895685,longitude:8.681163},
        {latitude:49.895975,longitude:8.683416},
        {latitude:49.897620,longitude:8.681999},
        {latitude:49.897316,longitude:8.684767},

    
    ]
    const [clicked,setClicked]= useState(false);
    
    const handleSubmit = () =>{
        setClicked(!clicked);
        
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView 
            ref={_map}
            provider={PROVIDER_GOOGLE} 
            style={styles.map} 
            customMapStyle={mapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
            >
                {toiletsAround.map((item,index) =>{
                    return <MapView.Marker coordinate={item} key={index.toString()}>
                        <Image source={require('../../../assets/toiletMarker.png')}
                        style={styles.toiletsAround}
                        resizeMode="cover"/>
                    </MapView.Marker>
                })}
            </MapView>
            <View style={styles.top}>
                <View >
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        >
                        <Text style={styles.textStyle}>Nearby</Text>
                    </TouchableOpacity>
                </View>
                {renderIf(clicked)(
                    <View style={styles.container}>
                        <FlatList
                            data={[
                            {key: 'Devin'},
                            {key: 'Dan'},
                            {key: 'Dominic'},
                            {key: 'Jackson'},
                            {key: 'James'},
                            {key: 'Joel'},
                            {key: 'John'},
                            {key: 'Jillian'},
                            {key: 'Jimmy'},
                            {key: 'Julie'},
                            ]}
                            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                        />
                    </View>)}
            </View>
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
 
    map:{
     position: 'absolute',
     flex:1,
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
        fontSize: 14,
      },
      top: {
        position: 'absolute',
        backgroundColor: "#fff",
        //paddingBottom: 150,
        //paddingTop: 220,
        //paddingHorizontal: 30
        flex: 0.2,
        width: "100%",
        top: "0%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        alignContent: "center",
        
     },

    });
