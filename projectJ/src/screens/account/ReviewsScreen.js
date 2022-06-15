import React, {useContext, useState} from "react";
import {View, Text, ScrollView} from 'react-native';
import Review from "./Review";
import ThemeContext from "../../darkMode/ThemeContext";

const ReviewsScreen = ({navigation}) => {

        const theme = useContext(ThemeContext);
    return (
        <ScrollView>
            <View style={{backgroundColor: theme.background}}>
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