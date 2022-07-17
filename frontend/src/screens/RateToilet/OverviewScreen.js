import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native";
import ThemeContext from "../../darkMode/ThemeContext";
import StarRating from 'react-native-star-rating';
import ReviewBox from "./ReviewBox";
import axios from "axios";

import { useIsFocused } from "@react-navigation/core";

import { BACKEND_ENDPOINT_REVIEWS } from '../../constants';

const OverviewScreen = ({ route, navigation }) => {
    // Themes (Dark Mode / Default Mode)
    const theme = useContext(ThemeContext);
    const { toilet } = route.params;

    const [reviews, setReviews] = useState([])

    const isFocused = useIsFocused();
    useEffect(() => {
        async function getReviews() {
            let res = axios.post(BACKEND_ENDPOINT_REVIEWS + 'FetchReviewsForToilet', { address: toilet.location })
            res = res.then(({ status, data }) => {
                console.log(data)
                let tmp = data.map(rev => {
                    return {
                        text: rev.description,
                        rating: rev.rating,
                        waitingTime: rev.waitingtime,
                        cleanliness: rev.cleanliness,
                        security: rev.security,
                    }
                })
                console.log(tmp)
                setReviews(tmp)
            }).catch(err => console.log(err));
        }

        getReviews();

        return () => {
            setReviews([])
        }
    }, [isFocused])

    return (
        <View style={{ backgroundColor: theme.background, height: "100%" }}>
            <ScrollView >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    margin: 5,
                    padding: 5,
                    borderRadius: 13,
                    borderColor: theme.reviewBorder,
                    borderWidth: 2
                }}><View style={{
                    width: '45%'
                }}>
                        <Text style={[styles.title, { color: theme.titleReview }]}>{toilet.name}</Text>
                        <Text style={{ fontSize: 10, color: theme.color }}>{toilet.location}</Text>
                        <View style={styles.stars}>
                            <StarRating
                                maxStars={5}
                                disabled={true}
                                rating={toilet.rating}
                                selectedStar={(rating) => { }}
                                fullStarColor={"gold"}
                                starSize={20}
                            />
                        </View>

                        <Text style={styles.item}>{toilet.description}</Text>
                    </View>
                    <View style={{
                        width: '50%',
                        marginRight: '5%'
                    }}>
                        <Text style={{
                            fontWeight: 'bold', color: theme.titleReview
                        }}>Opening Hours</Text>
                        {
                            Object.entries(toilet.openingHours).map((key) => {
                                return (<View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    fontWeight: '20',

                                }} key={key}>
                                    <Text style={{ color: theme.color }}>
                                        {key[0] + ': '}
                                    </Text>
                                    <Text style={{ color: theme.color }}>
                                        {key[1]}
                                    </Text>
                                </View>)
                            })
                        }
                    </View>
                </View>
                <View>
                    <ScrollView horizontal={true} style={{
                        margin: 5,
                        padding: 5,
                    }}>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                    </ScrollView>
                </View>

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: theme.submitBtn }]}
                    onPress={() => {
                        navigation.navigate("Rating", { toilet })
                    }}
                >
                    <Text style={styles.stOfSubmit}>
                        Add Review
                    </Text>
                </TouchableOpacity>

                <View style={{
                    borderTopWidth: 1,
                    borderColor: "#d3d3d3",
                    margin: 5
                }}><Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: theme.titleReview
                }}>
                        Reviews
                    </Text>
                    {
                        reviews.map((r, idx) => {
                            return (
                                <View key={idx}>
                                    <ReviewBox review={r} >
                                    </ReviewBox>
                                </View>
                            );
                        })
                    }</View>
            </ScrollView>
        </View>
    )
}

export default OverviewScreen;

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
        fontSize: 22,

    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    image: {
        height: 200,
        width: 100,
        margin: 2
    },
    stOfSubmit: {
        fontWeight: "bold"
    },
    btn: {
        backgroundColor: "#e6697e",
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        margin: 30
    },
});
