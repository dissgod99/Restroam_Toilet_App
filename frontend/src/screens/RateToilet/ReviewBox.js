import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView } from "react-native";
import ThemeContext from "../../darkMode/ThemeContext";
import StarRating from 'react-native-star-rating';

import { BACKEND_ENDPOINT_REV_IMAGES } from "../../constants";
import axios from "axios";


export default function ReviewBox({ review }) {

    // Themes (Dark Mode / Default Mode)
    const theme = useContext(ThemeContext);

    const [revImgs, setRevImgs] = useState([]);


    useEffect(() => {
        console.log(review._id);
        axios.post(BACKEND_ENDPOINT_REV_IMAGES + 'get-images-base64', {
            revId: review._id
        })
            .then(({ data }) => {
                console.log('getToiletImages: ');
                setRevImgs(data.payload);
                console.log(data.payload.length);
            })
            .catch(err => console.log('---ReviewBox---useEffect: ' + err));
    }, []);


    return (
        <View>
            <View style={{ backgroundColor: theme.background }}>
                <View style={{
                    display: 'flex',
                    alignItems: "center",
                    borderWidth: 1,
                    margin: 5,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: theme.reviewBorder
                }}>
                    <View style={{
                        width: "95%",
                        margin: 5,
                        //display: 'flex',
                        //flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        
                        <View >
                            <View style={styles.stars}>
                                <Text style={[styles.bold ,{color: theme.icon}]}>Overall rating:</Text>
                                <StarRating
                                    maxStars={5}
                                    disabled={true}
                                    rating={review.rating}
                                    selectedStar={(rating) => { }}
                                    fullStarColor={"gold"}
                                    starSize={20}
                                />
                            </View>
                            <View style={styles.stars}>
                                <Text style={{color: theme.color}}>Cleanliness:</Text>
                                <StarRating
                                    maxStars={5}
                                    disabled={true}
                                    rating={review.cleanliness}
                                    selectedStar={(rating) => { }}
                                    fullStarColor={"gold"}
                                    starSize={20}
                                />
                            </View>
                            <View style={styles.stars}>
                                <Text style={{color: theme.color}}>Security:</Text>
                                <StarRating
                                    maxStars={5}
                                    disabled={true}
                                    rating={review.security}
                                    selectedStar={(rating) => { }}
                                    fullStarColor={"gold"}
                                    starSize={20}
                                />
                            </View>
                            <View style={styles.stars}>
                                <Text style={{color: theme.color}}>Waiting Time:</Text>
                                <StarRating
                                    maxStars={5}
                                    disabled={true}
                                    rating={review.waitingTime}
                                    selectedStar={(rating) => { }}
                                    fullStarColor={"gold"}
                                    starSize={20}
                                />
                            </View>
                        </View>


                        <View style={styles.txt}>
                            <Text style={[styles.bold ,{color: theme.icon}]}>Description</Text>
                            <Text style={[styles.title, { color: theme.color }]}>{review.text}</Text>
                        </View>

                    </View>

                    <ScrollView horizontal={true} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                    }}>
                        {
                            revImgs.map((revImg, idx) => {
                                // console.log('(idx, imgSrc): ' + `(${idx}, ${imgSrc})`);
                                return (
                                    <Image key={idx} source={{ uri: revImg }} style={ styles.image } />
                                );
                            })
                        }

                    </ScrollView>

                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: "center"
    },
    title: {
        fontSize: 15,
        width: '90%'

    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        height: 200,
        width: 100,
        margin: 2
    },
    txt: {
        marginTop: "5%",
        //width: "100%"
    },
    bold: {
        fontWeight: "bold"
    }
});
