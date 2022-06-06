import React, {useState} from "react";
import {Text, ScrollView, View, StyleSheet, TouchableOpacity} from "react-native"
import { TextInput, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

// change url backend login api (on heroku)
// for now it is set to the IP address of my machine (192.168.1.100) to test it on yours replace it with your IP
const BACKEND_ENDPOINT = 'http://192.168.1.100:3000/api/toilets/addToilet';

const AddInfoPage = ({navigation}) =>{
    var numberi = 0;
    const [price, setPrice] = useState('0,00€');
    const [address, setAddress] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    function toggleSwitch() {
        setIsEnabled(!isEnabled);
    }

  function changePrice(v) {
    setPrice(v + '€');
    v = v + '€';
    console.log(price)
  }
  function changeAddress(v) {
    setAddress(v);
  }

    return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.containerElements}>
                    <Text style={styles.title}>
                        Add more information
                    </Text>

                    
                    <View>
                        <Text style={styles.txt}>
                            Specify its location
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            label="Address"
                            placeholder="Type place"
                            right={<TextInput.Affix text="/100" />}
                            activeOutlineColor="#e6697e"
                            onChangeText={(value) => changeAddress(value)}
                        />
                    </View>
                    <Text style={styles.details}>
                            Indicate details
                        </Text>
                    <View style={styles.detailsContainer}>
                    <View style={styles.position}>
                        <Text style={styles.txt}>
                            Specify Price
                        </Text>
                        <TextInput style={styles.boxPrice}
                            defaultValue= "0,00 €"
                            mode="outlined"
                            placeholder="Type place"
                            activeOutlineColor="#e6697e"
                            onChangeText={(value) => changePrice(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.txt}>
                            Handicap Access
                        </Text>
                        <Switch 
                            value={isEnabled} 
                            onValueChange={toggleSwitch}
                            color= {"red"}
                            />
                        
                    </View>
                        


                    </View>

                    <View>
                        <Text style={styles.txt}>
                            More details
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            label="Other details"
                            placeholder="Type details"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor="#e6697e"
                        />
                    </View>
                        
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => navigation.navigate("ThankYou")}
                        >
                        <Text style={styles.stOfSubmit}>
                                Submit
                        </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
            
    );
}

export default AddInfoPage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    containerElements:{
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20
    },
    box:{
        width: 250,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    btn: {
        backgroundColor: "#e6697e",
        paddingHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 35,
        marginHorizontal: 75,
        alignItems: "center"
    
    },
    stOfSubmit:{
        fontWeight: "bold"
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row"
    },
    boxPrice: {
        width: 130

    },
    txt: {
        marginVertical: 10,
        fontWeight: "bold"

    },
    details: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    full:{
        height: "100%"
    },
    position: {
        marginRight: 10
    }



});
