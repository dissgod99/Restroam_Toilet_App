import React from "react";
import {View, Text,ScrollView} from 'react-native';
import Report from "./Report";

const ReportsScreen = ({navigation}) => {
    return (
        <ScrollView>
            <View>
                <Report title="Hauptbahnhof"
                        date="22.02.2022"
                        text="Klopapier alle" />

            </View>
        </ScrollView>
    )
}

export default ReportsScreen;