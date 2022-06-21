import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ThemeContext from "../../darkMode/ThemeContext";

const SettingsScreen = ({ route, navigation }) => {
    const theme = useContext(ThemeContext);
    const navigateToChangePassword = () => {
        navigation.navigate("Change Password", { token: route.params.token });
    }
    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={[styles.container]}>

                <TouchableOpacity style={styles.block}
                    onPress={navigateToChangePassword}>
                    <View style={[styles.menu, { color: theme.color, backgroundColor: theme.menuBackground, flexDirection: "row" }]}>
                        <Icon name="lock-reset" size={25} style={styles.marginIcon} />
                        <Text style={styles.txt}>
                            Change Password
                        </Text>
                    </View>
                </TouchableOpacity>


            </View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    menu: {
        //backgroundColor: '#fae8e0', 
        borderWidth: 1,
        //fontSize:18,
        padding: 15,
        justifyContent: 'center',
        textAlign: 'left',
        marginHorizontal: 23,
        marginVertical: 5,
        borderRadius: 5
    },
    block: {
        width: "100%",
        marginTop: 15
    },
    marginIcon: {
        marginRight: 7
    },
    txt: {
        fontSize: 18
    }

});

export default SettingsScreen;





