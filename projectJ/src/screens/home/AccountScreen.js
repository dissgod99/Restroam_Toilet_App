import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import { Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {EventRegister} from "react-native-event-listeners"

import ThemeContext from '../../darkMode/ThemeContext';


const AccountScreen = ({navigation}) => {
  const logout = () => {
    console.log("Transition WORKS");
    navigation.navigate("Login");
  }

  const [mode, setMode] = useState(false);
  const theme = useContext(ThemeContext);

  return(
    <ScrollView>
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.person}>
        <Text style={[styles.name, {color: theme.color}]}>
          Max Mustermann  
          <Icon name="account-circle-outline" size={50} color={theme.color} />
          {"\n"}
        </Text>
        <Text style={[styles.data, {color: theme.color}]}>
          E-Mail: max.mustermann@gmx.de
        </Text>
        <Text style={[styles.data, {color: theme.color}]}>
          Toilets visited: 333 
        </Text>
        <Text style={[styles.data, {color: theme.color}]}>
          Toilets reviewed: 111 
        </Text>
        <TouchableOpacity onPress={logout}>
        <Icon name="logout" size={35} color="#900">
          <Text style={styles.logoutbtn}>
            Logout
          </Text>
        </Icon>
        </TouchableOpacity>
        <Switch 
        color='red'
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          EventRegister.emit("changeTheme", value);

        }}
        
        
        />
      </View>
      

    


     <TouchableOpacity onPress={() => navigation.navigate('Owned Toilets')}>
        <Text style={[styles.menu, {color: theme.color, backgroundColor: theme.menuBackground}]}>
        <Icon name="toilet" size={35} color={theme.color} />
          Owned Toilets 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
        <Text style={[styles.menu, {color: theme.color, backgroundColor: theme.menuBackground}]}>
        <Icon name="account-star-outline" size={35} color={theme.color} />
          Reviews 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
        <Text style={[styles.menu, {color: theme.color, backgroundColor: theme.menuBackground}]}>
        <Icon name="notebook-outline" size={35} color={theme.color} />
          Reports 
        </Text>
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => navigation.navigate('WriteReport')}>
        <Text style={[styles.menu, {color: theme.color, backgroundColor: theme.menuBackground}]}>
          <Icon name="flag-outline" size={35} color={theme.color}/>
        </Text>
      </TouchableOpacity>



    </View>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  person:{
    margin:30,
    padding:20,
    borderColor:'lightgrey',
    borderWidth:5,
    borderRadius: 20,
  },
  name:{
    fontSize:20,
    textAlign:'left'
  },
  data:{
    fontSize:15,
    textAlign:'left',
  },
  logoutbtn:{
    textAlign:'center',
    color:'#900',
    fontSize:20,
    justifyContent:'center',
  },
  menu:{
    //backgroundColor: '#fae8e0', 
    borderWidth:1,
    fontSize:25,
    padding:20,
    justifyContent:'center',
    textAlign:'left',
  }
}
)
export default AccountScreen;