import React, { useContext, useState, useEffect, } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import Review from "./Review";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-rating';
import ThemeContext from "../../darkMode/ThemeContext";
import { getAsyncStorageItem } from "../../util";
import axios from "axios";


import { BACKEND_ENDPOINT_REVIEWS } from '../../constants';

const ReviewsScreen = ({ route, navigation }) => {
    //console.log(route.params);
    const { token } = route.params;

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const token = await getAsyncStorageItem('token');
        axios
            .post(BACKEND_ENDPOINT_REVIEWS + 'userReviews', { token })
            .then(({ status, data }) => {
                setReviews(data.payload);
            })
            .catch(err => console.log(err));
    };

    const alertConfirmDeleteToilet = (index) =>
        Alert.alert(
            "Remove Review?",
            "Are sure you want to remove this review? This action may not be reversible!",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Yes",
                    // still no backend state save
                    onPress: () => deleteReview(index),
                    style: "default",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        );

    const deleteReview = (index) => {
        let reviewTbDeleted = reviews[index];
        let reviewsCopy = [...reviews];
        reviewsCopy.splice(index, 1);
        setReviews(reviewsCopy);
        console.log(JSON.stringify(reviewTbDeleted));
        console.log(reviewsCopy);
        console.log(token);
        console.log(BACKEND_ENDPOINT_REVIEWS);
        axios
            .post(BACKEND_ENDPOINT_REVIEWS + 'deleteReview', { token, address: reviewTbDeleted.address })
            .then(({ data }) => {
                ToastAndroid.showWithGravity(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM);
            })
            .catch(err => console.log(err.response.data.message));
    };

    const nothing = () => {

    };

    const edit = () => {

    };

    const theme = useContext(ThemeContext);

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={[styles.container]}>
                {reviews.length < 1 ?
                    <View style={[styles.border]}>
                        <Text style={[styles.data, { color: theme.color }]}>
                            You haven't submitted any reviews yet. Toilet reviews are encouraged as they provide an overall better user experience.
                        </Text>
                    </View>
                    :
                    reviews.map(({ address, rating, description, date }, index) => {
                        return (
                            <View key={index} style={[styles.reviewContainer, { backgroundColor: theme.backgroundToilet }]}>
                                <View>
                                    <Text style={styles.title} >
                                        {address}
                                    </Text>
                                    <Text style={styles.dateWritten}>
                                        written on {date}
                                    </Text>
                                </View>
                                <View style={styles.stars}>
                                    <StarRating
                                        maxStars={5}
                                        disabled={true}
                                        rating={rating}
                                        selectedStar={(rating) => nothing()}
                                        fullStarColor={"gold"}
                                        starSize={20}
                                    />
                                </View>
                                <View style={styles.text}>
                                    <Text>
                                        {'\t'} {description} {'\n'}
                                    </Text>
                                </View>
                                <View style={styles.toolbar}>
                                    {/* <TouchableOpacity onPress={edit}>
                                        <FontAwesome name="edit" size={25} />
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => alertConfirmDeleteToilet(index)}>
                                        <FontAwesome name="trash-o" size={25} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )
                    }
                    )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    reviewContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderTopWidth: 3,
        borderRadius: 3,
        padding: 10
    },
    title: {
        fontSize: 22,
    },
    dateWritten: {
        fontStyle: 'italic',
        fontSize: 12,
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    border: {
        margin: 15,
        padding: 10,
        borderColor: 'lightgrey',
        borderWidth: 5,
        borderRadius: 20,
        opacity: .9
    },
    data: {
        fontSize: 20,
        textAlign: 'left',
    },
});

export default ReviewsScreen;