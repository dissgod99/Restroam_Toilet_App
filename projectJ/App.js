import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  return(
    <View style={styles.view}>
      <View style={styles.person}>
        <Text style={styles.name}>
          Max Mustermann  
          <Icon name="account-circle-outline" size={50} color="black" />
          {"\n"}
        </Text>
        <Text style={styles.data}>
          E-Mail: max.mustermann@gmx.de
        </Text>
        <Text style={styles.data}>
          Toilets visited: 333 
        </Text>
        <Text style={styles.data}>
          Toilets reviewed: 111 
        </Text>
        <Text style={styles.logoutbtn}>
        <Icon name="logout" size={30} color="#900" />
          Logout
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.menu}>
        <Icon name="toilet" size={35} color='black' />
          Owned Toilets 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.menu}>
        <Icon name="account-star-outline" size={35} color="black" />
          Reviews 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.menu}>
        <Icon name="notebook-outline" size={35} color="black" />
          Reports 
        </Text>
      </TouchableOpacity>
    </View>

  );
};
const styles = StyleSheet.create({
  view:{
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
  },
  menu:{

    borderWidth:1,
    fontSize:25,
    padding:20,
    justifyContent:'center',
    textAlign:'left',
  }
}
)
export default App;