import React from "react";
import {View, Text} from 'react-native';
import Report from "./Report";

const ReportsScreen = ({navigation}) => {
    return (
        <View>
            <Report title="Hauptbahnhof"
                    date="22.02.2022"
                    text="Klopapier alle" />

        </View>
    )
}

export default ReportsScreen;