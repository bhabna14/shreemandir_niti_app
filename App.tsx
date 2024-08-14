import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// SplashScreen
import SplashScreen from './src/Screens/SplashScreen/Index'
import Home from './src/Screens/Home/Index'
import ManualNitiPage from './src/Screens/ManualNitiPage/Index'

const Stack = createNativeStackNavigator()

export const base_url = "http://panji.mandirparikrama.com/"

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000)
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="ManualNitiPage" component={ManualNitiPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})