import React from "react";
import {View, Text} from 'react-native';
import Review from "./Review";


const ReviewsScreen = ({navigation}) => {
    return (
        <View>
                <Review  title='Am Hauptbahnhof'
                        date='22.02.2022'
                        text='Die Toilette war Scheiße.'
                        />
                <Review  title='Dixie'
                        date='22.02.2022'
                        text='Die Toilette war Scheiße.'
                        />
        </View>
    )
}

export default ReviewsScreen;