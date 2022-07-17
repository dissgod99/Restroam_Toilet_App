import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

import ThemeContext from '../../darkMode/ThemeContext';


const DropDown = ({ data, setMarker, markerClick }) => {
    const [options, setOptions] = useState(data);
    const FilterList = ['distance', 'rating', 'price'];
    const [filter, setFilter] = useState('distance');
    const [toilet, setToilet] = useState(null);
    const Unit = { distance: 'KM', price: '€', rating: '*' }
    useEffect(() => {
        console.log(options)
    }, [options])
    useEffect(() => {
        var newOptions = [];
        data.sort(function (a, b) {
            return filter != 'rating' ? parseFloat(a[filter]) - parseFloat(b[filter]) : parseFloat(b[filter]) - parseFloat(a[filter]);
        });
        data.forEach(d => {
            newOptions.push(d['name'] + " :" + d[filter].toString().substring(0, 5) + Unit[filter])
        })
        setOptions(newOptions)
    }, [filter, data])

    const theme = useContext(ThemeContext)

    return (
        <View style={[styles.container, { backgroundColor: theme.drop }]}>
            <ModalDropdown style={styles.drop} options={options} defaultValue='Toilet list' onSelect={(idx) => {
                let marker;
                data.forEach((d, i) => {
                    if (d.name + ' ' == options[idx].split(':')[0] && d[filter].toString().substring(0, 5) + Unit[filter] == options[idx].split(':')[1]) {
                        markerClick(d, i)
                        console.log(d)
                    }
                })
            }} dropdownStyle={styles.down} showSearch={false} adjustFrame={(s) => {
            }}
            // renderSearch={<TextInput style={styles.inputStyle} placeholder={'search...'} onChangeText={(value) => {
            //     var newOptions1 = value == '' ? data : data.filter(o => o.Name.includes(value));
            //     var newOptions2 = value == '' ? [] : data.filter(o => !o.Name.includes(value));
            //     newOptions1.sort(function (a, b) {
            //         return filter != 'rating' ? parseFloat(a[filter]) - parseFloat(b[filter]) : parseFloat(b[filter]) - parseFloat(a[filter]);
            //     });
            //     newOptions2.sort(function (a, b) {
            //         return filter != 'rating' ? parseFloat(a[filter]) - parseFloat(b[filter]) : parseFloat(b[filter]) - parseFloat(a[filter]);
            //     });
            //     var tmp = []
            //     newOptions1.forEach(d => {
            //         tmp.push(d['name'] + " :" + d[filter] + Unit[filter])
            //     })
            //     newOptions2.forEach(d => {
            //         tmp.push(d['Name'] + " :" + d[filter] + Unit[filter])
            //     })
            //     console.log(tmp);
            //     setOptions(tmp);
            // }}></TextInput>}
            >
            </ModalDropdown>
            <ModalDropdown style={styles.drop} options={FilterList} defaultValue='Sort by:' onSelect={(idx) => {
                setFilter(FilterList[idx])
            }} dropdownStyle={styles.down} adjustFrame={(s) => {
            }}>
            </ModalDropdown>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 75,
        zIndex: 300,
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    drop: {
        borderWidth: 0.5,
        padding: 10,
        paddingRight: 25,
        paddingLeft: 25,
        padding: 3,
    },
    down: {
        width: 188,
        position: 'absolute',
        left: 112,
        top: 67.5,
    },
    inputStyle: {
        borderWidth: 0.5,
        fontSize: 10,
        paddingLeft: 5,
    }
}
)
export default DropDown;