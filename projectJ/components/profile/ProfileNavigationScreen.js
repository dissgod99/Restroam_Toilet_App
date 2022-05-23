import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import OwnedToiletsScreen from './OwnedToiletsScreen';
import ReviewsScreen from './ReviewsScreen';
import ReportsScreen from './ReportsScreen';
import WriteReportScreen from './WriteReportScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigationScreen = () => {
  return(
    

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }

          />
          <Stack.Screen
            name='Owned Toilets'
            component={OwnedToiletsScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }

          />
          <Stack.Screen
            name='Reviews'
            component={ReviewsScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }

          />
          <Stack.Screen
            name='Reports'
            component={ReportsScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }
          />
          <Stack.Screen
            name='WriteReport'
            component={WriteReportScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }
          />

        </Stack.Navigator>
      </NavigationContainer>


      

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  top:{
    backgroundColor: "black"

  }

}
)
export default ProfileNavigationScreen;