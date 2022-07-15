import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EventRegister } from "react-native-event-listeners"

import ThemeContext from '../../darkMode/ThemeContext';

import { getAsyncStorageItem, setAsyncStorageItem } from '../../util';
import { BACKEND_ENDPOINT_USERS } from '../../constants';

import axios from "axios";

const AccountScreen = ({ navigation }) => {

  const [token, setToken] = useState();
  const [user_username, set_user_username] = useState('');
  const [user_email, set_user_email] = useState('');

  useEffect(() => {
    getAsyncStorageItem('token')
      .then((tokenFromStorage) => {
        setToken(tokenFromStorage);
        axios
          .post(BACKEND_ENDPOINT_USERS + 'get-user-data', { token: tokenFromStorage })
          .then((response) => {
            const { data } = response;
            set_user_username(data.payload.username);
            set_user_email(data.payload.email);
          }).catch(err => {
            ToastAndroid.showWithGravity(
              err.response.data.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM);
          });
      })
      .catch(err => console.log(err));
  }, []);

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
          {/* <Text style={[styles.data, { color: theme.color }]}>
            Toilets visited: 333
          </Text> */}
          <Text style={[styles.data, styles.dataMargin, { color: theme.color }]}>
            Toilets reviewed: 111
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
        {/* <TouchableOpacity onPress={() => navigation.navigate('WriteReport')}>
          <Text style={[styles.menu, { color: theme.color, backgroundColor: theme.menuBackground }]}>
            <Icon name="flag-outline" size={35} color={theme.color} />
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => navigation.navigate('Reviews')} style={[styles.alignItems, styles.menu, {backgroundColor: theme.menuBackground}]}>
      <Icon name="cog-outline" size={35} color={theme.color} style={styles.paddingIcon} />
        <Text style={{color: theme.color, fontSize: 25}}>
          Settings 
        </Text>
        
      </TouchableOpacity>  */}
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
  },
  dataMargin: {
    marginBottom: 20

  },
  logoutbtn: {
    textAlign: 'center',
    //color:'#900',
    fontSize: 20,
    justifyContent: 'center',
  },
  menu: {
    //backgroundColor: '#fae8e0', 
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