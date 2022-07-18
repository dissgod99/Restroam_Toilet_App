import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EventRegister } from "react-native-event-listeners"

import ThemeContext from '../../darkMode/ThemeContext';

import { getAsyncStorageItem, setAsyncStorageItem } from '../../util';
import { BACKEND_ENDPOINT_USERS } from '../../constants';
import { useIsFocused } from "@react-navigation/core";

import axios from "axios";

const AccountScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("HELLO HOME");
      getAsyncStorageItem('token')
      .then((tokenFromStorage) => {
        if(tokenFromStorage == null){
          navigation.navigate("Not logged in");
        }else{
        setToken(tokenFromStorage);
        axios
          .post(BACKEND_ENDPOINT_USERS + 'get-user-data', { token: tokenFromStorage })
          .then((response) => {
            const { data } = response;
            set_user_username(data.payload.username);
            set_user_email(data.payload.email);
          }).catch(err => {
            console.log(err);
          });
          }
      })
      .catch(err => console.log(err));
    }
  }, [isFocused]);


  const [token, setToken] = useState();
  const [user_username, set_user_username] = useState('');
  const [user_email, set_user_email] = useState('');

  const logout = async () => {
    await setAsyncStorageItem('token', null);
    navigation.navigate("Splash");
  }

  const [mode, setMode] = useState(false);
  const theme = useContext(ThemeContext);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={[styles.container]}>
        <View style={styles.person}>
          <Text style={[styles.name, { color: theme.color }]}>
            {user_username}
            <Icon name="account-circle-outline" size={50} color={theme.color} />
            {"\n"}
          </Text>
          <Text style={[styles.data, { color: theme.color }]}>
            E-Mail: {user_email}
          </Text>

          <View style={[styles.alignItems]}>
            <TouchableOpacity onPress={logout} style={styles.marginIcon}>
              <Icon name="logout" size={35} color={theme.logoutColor}>
                <Text style={[styles.logoutbtn, { color: theme.logoutColor }]}>
                  Logout
                </Text>
              </Icon>
            </TouchableOpacity>
            <View style={[styles.alignItems]}>
              <Icon name='white-balance-sunny' size={45} color={theme.day} />
              <Switch
                color="#ae8647"
                value={mode}
                onValueChange={(value) => {
                  setMode(value);
                  EventRegister.emit("changeTheme", value);
                }}

              />
              <Icon name='power-sleep' size={45} color={theme.night} />
            </View>
          </View>

        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Owned Toilets', { token: token })}>
          <Text style={[styles.menu, { color: theme.color, backgroundColor: theme.menuBackground }]}>
            <Icon name="toilet" size={35} color={theme.color} />
            Owned Toilets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Reviews', { token: token })}>
          <Text style={[styles.menu, { color: theme.color, backgroundColor: theme.menuBackground }]}>
            <Icon name="account-star-outline" size={35} color={theme.color} />
            Your Reviews 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Reports', { token: token })}>
          <Text style={[styles.menu, { color: theme.color, backgroundColor: theme.menuBackground }]}>
            <Icon name="notebook-outline" size={35} color={theme.color} />
            Received complaints 
          </Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => navigation.navigate('Settings', { token: token })}>
          <Text style={[styles.menu, { color: theme.color, backgroundColor: theme.menuBackground }]}>
            <Icon name="cog-outline" size={35} color={theme.color} />
            Settings
          </Text>
        </TouchableOpacity>




      </View>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  person: {
    margin: 30,
    marginTop: 60,
    padding: 20,
    borderColor: 'lightgrey',
    borderWidth: 5,
    borderRadius: 20,
    opacity: .9
  },
  name: {
    fontSize: 20,
    textAlign: 'left'
  },
  data: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 4
  },
  dataMargin: {
    marginBottom: 20

  },
  logoutbtn: {
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',
  },
  menu: {
    borderWidth: 1,
    fontSize: 22,
    padding: 15,
    justifyContent: 'center',
    textAlign: 'left',
    marginHorizontal: 30,
    marginVertical: 5,
    borderRadius: 5
  },
  marginIcon: {
    marginRight: 65

  },
  alignItems: {
    flexDirection: "row"
  },

}
)
export default AccountScreen;