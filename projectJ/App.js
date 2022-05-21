import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/login/SplashScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import CustomButtonNavigationBar from './src/navigation/CustomBottomNavigationBar';
import RatingToiletScreen from './src/screens/RateToilet/RatingToiletScreen';
import ThankYou from './src/screens/RateToilet/ThankYou';
import AddInfoPage from './src/screens/addPage/AddInfoPage'


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome to Restroam' >
        <Stack.Screen
          name='Welcome to Restroam'
          component={SplashScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            },
            headerShown: false,
          }} />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
        <Stack.Screen
          name='Home'
          component={CustomButtonNavigationBar}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
        <Stack.Screen 
          name='Rate Toilet'
          component={RatingToiletScreen}
          
         />
         <Stack.Screen 
          name='More Toilet Infomation'
          component={AddInfoPage}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }}
         />

        <Stack.Screen 
              name="Rating"
              component={RatingToiletScreen}
              options={{
                  headerStyle:{
                    backgroundColor: "#f28d82"
                  }
                }
              }
            />

          <Stack.Screen 
            name="ThankYou"
            component={ThankYou}
            options={{
                headerStyle:{
                  backgroundColor: "#f28d82"
                },
                headerShown: false,
              }
            }
            />
      </Stack.Navigator>
    </NavigationContainer>


    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Rating'>
    //     <Stack.Screen 
    //       name="Rating"
    //       component={RatingToiletScreen}
    //       options={{
    //           headerStyle:{
    //             backgroundColor: "#f28d82"
    //           }
    //         }
    //       }
    //     />

    //     <Stack.Screen 
    //       name="ThankYou"
    //       component={ThankYou}
    //       options={{
    //           headerStyle:{
    //             backgroundColor: "#f28d82"
    //           },
    //           headerShown: false,
    //         }
    //       }
    //     />

    //   </Stack.Navigator>

    // </NavigationContainer>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: "black",
  }
});
