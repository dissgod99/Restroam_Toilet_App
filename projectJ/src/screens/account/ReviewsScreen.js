import React from "react";
import {View, Text, ScrollView} from 'react-native';
import Review from "./Review";


const ReviewsScreen = ({navigation}) => {
    return (
        <ScrollView>
            <View>
                    <Review  title='Am Hauptbahnhof'
                            date='22.02.2022'
                            stars={3.5}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Dixie'
                            date='22.02.2022'
                            stars={2}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Am Hauptbahnhof'
                            date='22.02.2022'
                            stars={3}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Dixie'
                            date='22.02.2022'
                            stars={2}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Am Hauptbahnhof'
                            date='22.02.2022'
                            stars={3}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Dixie'
                            date='22.02.2022'
                            stars={2}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Am Hauptbahnhof'
                            date='22.02.2022'
                            stars={3}
                            text='Die Toilette war Scheiße.'
                            />
                    <Review  title='Dixie'
                            date='22.02.2022'
                            stars={2}
                            text='Die Toilette war Scheiße.'
                            />
            </View>
        </ScrollView>
    )
}

export default ReviewsScreen;