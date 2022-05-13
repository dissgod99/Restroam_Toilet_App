import React, {useState, Component} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-rating';
import { TextInput } from 'react-native-paper';

const RatingToiletScreen = ({ navigation }) => {

    // Stars section
    const defaultRating = 3;
    const maxRating = 5; 
    const [starCount1, setStarCount1] = useState(defaultRating)
    const [starCount2, setStarCount2] = useState(defaultRating)
    const [starCount3, setStarCount3] = useState(defaultRating)

    //Description section
    const [text, setText] = useState('');

    const onStarRatingPress = (rating) => {
        setStarCount1(rating)
    }
    const onStarRatingPress_wt = (rating) => {
        setStarCount2(rating)
    }
    const onStarRatingPress_sec = (rating) => {
        setStarCount3(rating)
    }

    const handleSubmit = () =>{
        // setStarCount1(defaultRating);
        // setStarCount2(defaultRating);
        // setStarCount3(defaultRating);
        navigation.navigate("ThankYou");
    }
    // Average of all ratings
    const total = parseFloat(((starCount1 + starCount2 + starCount3)/3).toFixed(2));

    return (
        <SafeAreaView >
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.rateToilet}>Rate Toilet : </Text> 
                <View style={styles.center}>
                    <Text style={styles.smallMargin}>
                        Cleaness {starCount1} / {maxRating}
                    </Text>
                    <StarRating 
                        maxStars={maxRating}
                        disabled={false}
                        rating={starCount1}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        fullStarColor={"gold"}
                    />
                </View>

                <View style={styles.center}>
                    <Text style={styles.smallMargin}>
                        Waiting time {starCount2} / {maxRating}
                    </Text>
                    <StarRating 
                        maxStars={maxRating}
                        disabled={false}
                        rating={starCount2}
                        selectedStar={(rating) => onStarRatingPress_wt(rating)}
                        fullStarColor={"gold"}
                    />
                </View>
                <View style={styles.center}>
                    <Text style={styles.smallMargin}>
                        Security {starCount3} / {maxRating}
                    </Text>
                    <StarRating 
                        maxStars={maxRating}
                        disabled={false}
                        rating={starCount3}
                        selectedStar={(rating) => onStarRatingPress_sec(rating)}
                        fullStarColor={"gold"}
                    />
                </View>

                <View style={styles.center}>
                    <Text style={styles.smallMargin}>
                        Total {total} / {maxRating}
                    </Text>
                    <StarRating 
                        maxStars={maxRating}
                        disabled={true}
                        rating={total}
                        fullStarColor={"gold"}
                    />
                </View>

                <View style={styles.description}>
                    
                <TextInput style={styles.box}
                    mode="outlined"
                    label="Description"
                    placeholder="Type something"
                    right={<TextInput.Affix text="/250" />}
                    activeOutlineColor="#e6697e"
                />
                </View>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={handleSubmit}
                    >
                    <Text style={styles.stOfSubmit}>
                            Submit

                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
        </SafeAreaView>      
    )
}

export default RatingToiletScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateBlock:{
        marginVertical: 10
    },
    center:{
        alignItems: "center"
    },
    rateToilet:{
        marginVertical: 35,
        fontWeight: "bold",
        fontSize: 20
    },
    smallMargin:{
        marginVertical: 10,
        fontWeight: "bold",
    },
    btn: {
        backgroundColor: "#e6697e",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 30

    },
    stOfSubmit:{
        fontWeight: "bold"
    },
    box:{
        //backgroundColor: "#ded8d9",
        width: 250,
        //marginVertical: 10,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    description:{
        marginVertical: 10
    },
    descriptionTxt:{
        fontWeight: "bold",
        marginBottom: 10
    }
});



