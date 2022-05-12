import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const logout = () => {
  
}


const Profile = ({navigation}) => {
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
        
        <Icon name="logout" size={35} color="#900" onPress={()=> logout()}>
          <Text style={styles.logoutbtn}>
            Logout
          </Text>
        </Icon>
      </View>

    


     <TouchableOpacity onPress={() => navigation.navigate('Owned Toilets')}>
        <Text style={styles.menu}>
        <Icon name="toilet" size={35} color='black' />
          Owned Toilets 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
        <Text style={styles.menu}>
        <Icon name="account-star-outline" size={35} color="black" />
          Reviews 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
        <Text style={styles.menu}>
        <Icon name="notebook-outline" size={35} color="black" />
          Reports 
        </Text>
      </TouchableOpacity> 

 {/*  <TouchableOpacity onPress={() => navigate("Owned Toilets")}>
        <Text style={styles.menu}>
        <Icon name="toilet" size={35} color='black' />
          Owned Toilets 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={switchSite('reviews')}>
        <Text style={styles.menu}>
        <Icon name="account-star-outline" size={35} color="black" />
          Reviews 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={switchSite('reports')}>
        <Text style={styles.menu}>
        <Icon name="notebook-outline" size={35} color="black" />
          Reports 
        </Text>
    </TouchableOpacity>*/}



    </View>

  );
};
const styles = StyleSheet.create({
  view:{
    flexDirection:'column',
    backgroundColor: '#f28d82',
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
    backgroundColor: '#fae8e0', 
    borderWidth:1,
    fontSize:25,
    padding:20,
    justifyContent:'center',
    textAlign:'left',
  }
}
)
export default Profile;