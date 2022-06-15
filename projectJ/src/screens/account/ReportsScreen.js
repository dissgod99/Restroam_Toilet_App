import React, {useContext} from "react";
import {View, Text,ScrollView} from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";
import Report from "./Report";

const ReportsScreen = ({navigation}) => {

    const theme = useContext(ThemeContext);

    return (
        <ScrollView style={{backgroundColor: theme.background}}>
            <View>
                <Report title="Hauptbahnhof"
                        date="22.02.2022"
                        username= "Ma****99"
                        text="Klopapier alle" />
                        <Report title="Hauptbahnhof"
                        date="22.02.2022"
                        username= "Bs*******69k"
                        text="Klopapier alle" />
                        <Report title="Hauptbahnhof"
                        date="22.02.2022"
                        username= "Bs*******69k"
                        text="Klopapier alle" />
                        <Report title="Hauptbahnhof"
                        date="22.02.2022"
                        username= "Bs*******69k"
                        text="Klopapier alle" />
                        <Report title="Hauptbahnhof"
                        date="22.02.2022"
                        username= "Bs*******69k"
                        text="Klopapier alle" />

            </View>
        </ScrollView>
    )
}

export default ReportsScreen;