import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";
import Report from "./Report";
import { getAsyncStorageItem } from "../../util";
import axios from "axios";


import { BACKEND_ENDPOINT_REPORTS, BACKEND_ENDPOINT_TOILETS } from '../../constants';

const ReportsScreen = ({ route, navigation }) => {

    const theme = useContext(ThemeContext);

    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const FetchReportsForToilet = async (toilet) => {
        axios
            .post(BACKEND_ENDPOINT_REPORTS + 'fetchReportsForToilet', { address: toilet.address })
            .then(({ status, data }) => {
                updateReports(data.payload);
            })
            .catch(err => console.log(err));
    }
    const fetchReports = async () => {
        const token = await getAsyncStorageItem('token');
        axios
            .post(BACKEND_ENDPOINT_TOILETS + 'user-owned-toilets', { token })
            .then(({ status, data }) => {
                //setToiletItems(data.payload);
                data.payload.map(toilet => FetchReportsForToilet(toilet));
            }).catch(err => console.log(err));

    }

    const updateReports = v => {
        setReports(reports.concat(v));

    }
    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={[styles.container]}>
                {reports.length < 1 ?
                    <View style={[styles.border]}>
                        <Text style={[styles.data, { color: theme.color }]}>
                            Good news! You haven't received any complaints yet. Keep up the good work!
                        </Text>
                    </View>
                    :
                    reports.map(({ address, username, description, date }, index) => {
                        console.log("username === ", username)
                        return (
                            <Report
                                key={index}
                                title={address}
                                date={date}
                                username={username}
                                text={description} />
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

export default ReportsScreen;