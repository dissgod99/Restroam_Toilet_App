import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './components/profile/ProfileScreen';
import OwnedToiletsScreen from './components/profile/OwnedToiletsScreen';
import ReviewsScreen from './components/profile/ReviewsScreen';
import ReportsScreen from './components/profile/ReportsScreen';
import WriteReportScreen from './components/profile/WriteReportScreen';

const Stack = createNativeStackNavigator();

const App = () => {
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
export default App;