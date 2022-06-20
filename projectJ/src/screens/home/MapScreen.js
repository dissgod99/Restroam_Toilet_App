import React,{useState, useRef, useEffect} from 'react';
import { Text,Image,ScrollView,Fragment,FlatList,TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { mapStyle } from '../../global/mapStyle';
import * as Location from 'expo-location'
import renderIf from './renderIf'
import MapViewDirections from 'react-native-maps-directions';
import StarRating from 'react-native-star-rating';
import DropDown from './DropDown';


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

    var item = {
        name: "toilet1",
        location: "kethastraße",
        stars: 2.5,
        description: "very good",
    }

    const [markerclicked,setMarkerlicked]= useState(false);
    
    const markerClick = (item1) => {
        setMarkerlicked(!markerclicked);
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
            >
                {toiletsAround.map((item,index) =>{
                    return <MapView.Marker 
                    coordinate={item} 
                    key={index.toString()}
                    //title={marker.title}
                    //description={marker.description}
                    onPress={() => markerClick(item)}>
                        <Image source={require('../../../assets/toiletMarker.png')}
                        style={styles.toiletsAround}
                        resizeMode="cover"/>
                    </MapView.Marker>
                })}
            <MapViewDirections
            origin={toiletsAround[1]}
            destination={toiletsAround[0]}
            
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
                {renderIf(clicked)(
                    <View style={styles.tophidden}>
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
            
            {renderIf(markerclicked)(
                <View style={styles.bottom}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={{fontSize: 10}}>{item.location}</Text>
                    <View style={styles.stars}>
                        <StarRating
                            maxStars={5}
                            disabled={true}
                            rating={item.stars} 
                            selectedStar={(rating) => {}}
                            fullStarColor={"gold"}
                            starSize={20}
                        />
                    </View>

                    <Text style={styles.item}>{item.description}</Text>
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
            bottom: "0%",
            width: "80%",
            left: "1%",
            borderRadius: 30,
            alignItems: "flex-start",
            alignContent: "center",
            
         },
         title:{
            fontSize:22,
            
        },
         stars:{
            flexDirection:'row',
            alignItems:'center',
            
    
        },
    
    
        });
    