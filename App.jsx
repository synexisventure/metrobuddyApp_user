import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./src/navigations/RootNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Toast from 'react-native-toast-message';
// import { AppProvider } from './src/context/AppContext';

const App = () => {
  return (
    <GestureHandlerRootView>
      {/* <AppProvider> */}
      <NavigationContainer>
        <RootNavigator />
        {/* <Toast /> */}
      </NavigationContainer>
      {/* </AppProvider> */}
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor : "#000",
  }
})