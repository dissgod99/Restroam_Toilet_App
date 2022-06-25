import React, {useState,useEffect,useContext} from "react";
import {View, Text,ScrollView} from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";
import Report from "./Report";
import {getAsyncStorageItem} from "../../util";
import axios from "axios";


import { BACKEND_ENDPOINT_REPORTS, BACKEND_ENDPOINT_TOILETS } from '../../constants';

const ReportsScreen = ({route, navigation}) => {

    const theme = useContext(ThemeContext);

    const [reports, setReports] = useState([]);

    useEffect(() => {
            fetchReports();
        }, []);
        
    const FetchReportsForToilet = async (toilet) => {
        axios
            .post(BACKEND_ENDPOINT_REPORTS + 'fetchReportsForToilet', { address: toilet.address })
            .then(({ status, data }) => {
            console.log(data.payload);
            updateReports(data.payload);
            })
            .catch(err => console.log(err));
    }
    const fetchReports = async () => {
    const token= await getAsyncStorageItem('token');
    console.log("token",token);
    axios
        .post(BACKEND_ENDPOINT_TOILETS + 'user-owned-toilets', { token })
        .then(({ status, data }) => {
            console.log(data.payload);
            //setToiletItems(data.payload);
            data.payload.map(toilet => FetchReportsForToilet(toilet));
        }).catch(err => console.log(err));
    
    }

    const updateReports = v =>{
        console.log(reports);
        setReports(reports.concat(v));
        console.log(reports);
        
    }
    return (
        <ScrollView style={{backgroundColor: theme.background}}>
            <View>
            { reports.map(({address,username, description ,date}) => {
                return (
                    <Report title={address}
                        date={date}
                        username= {username}
                        text={description}/>
                            )
                        }            
                )}
            </View>
        </ScrollView>
    )
}

export default ReportsScreen;