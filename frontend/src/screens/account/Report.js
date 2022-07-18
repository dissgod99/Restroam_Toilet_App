import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";

const Report = (props) => {
    const theme = useContext(ThemeContext)
    function formatIssues(issues) {
        let tmp = issues.split('.').map(t => { return t.trimLeft() });
        return tmp
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundToilet }]}>
            <View>
                <Text style={styles.title} >
                    {props.title}
                </Text>
                {/* <Text style = {styles.dateWritten}>
                    written on {props.date} by {props.username}
                </Text> */}
            </View>
            {
                formatIssues(props.issues).map((issue, idx) => {
                    return (
                        <View style={styles.viewIssue} key={idx}>
                            <Text style={styles.textIssue} >
                                {issue != '' ? '-' + issue : <></>}
                            </Text>
                        </View>
                    )
                })
            }

            <View style={styles.text}>
                <Text>
                    {'\t'} {props.text} {'\n'}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderTopWidth: 3,
        borderRadius: 5,
        padding: 5

    },
    title: {
        fontSize: 22,
        fontWeight: "bold"

    },
    dateWritten: {
        fontStyle: 'italic',
        fontSize: 12,

    },

    text: {

    },
    textIssue: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    viewIssue: {
        marginHorizontal: 10,
    },


}
);

export default Report;