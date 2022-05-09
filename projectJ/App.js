import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './components/Login/SplashScreen';
import SignUpScreen from './components/Login/SignUpScreen';
import LoginScreen from './components/Login/LoginScreen';



export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <LoginScreen /> */}
      {/* <SignUpScreen /> */}
      <SplashScreen />



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
