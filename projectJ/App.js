import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './components/Login/SplashScreen';
import SignUpScreen from './components/Login/SignUpScreen';
import LoginScreen from './components/Login/LoginScreen';


// const SplashScreen_Stack = () =>{
//   return (
//     <View>



//     </View>

//   );

// }


const Stack = createNativeStackNavigator();


export default function App() {
  // return (
  //   <View style={styles.container}>
  //     {/* <Text>Open up App.js to start working on your app!</Text> */}
  //     {/* <LoginScreen /> */}
  //     {/* <SignUpScreen /> */}
  //     <SplashScreen />



  //     <StatusBar style="auto" />
  //   </View>
  // );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome to Restroam'>
          <Stack.Screen
          
            name='Welcome to Restroam'
            component={SplashScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }
            
          />
          <Stack.Screen
          
          name='Login'
          component={LoginScreen}
          options={
            {headerStyle: {
              backgroundColor: "#f28d82"
            }}
          }
          
        />
        <Stack.Screen
          
          name='SignUp'
          component={SignUpScreen}
          options={
            {headerStyle: {
              backgroundColor: "#f28d82"
            }}
          }
          
        />

      </Stack.Navigator>


    </NavigationContainer>


  );


}

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
});
