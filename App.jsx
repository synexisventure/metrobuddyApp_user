import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/context/AppContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaApp />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

// Single-file wrapper handling safe areas and status bar
const SafeAreaApp = () => {
  const insets = useSafeAreaInsets();

  // Top padding logic:
  // iOS: use insets.top
  // Android: only use insets.top if non-zero (notch or overlay), otherwise 0
  const topPadding =
    Platform.OS === 'android'
      ? Math.max(insets.top, 0) // avoids double-padding
      : insets.top;

  const bottomPadding =
    Platform.OS === 'android'
      ? (insets.bottom > 0 ? insets.bottom : 0)
      : insets.bottom;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: topPadding,
        paddingBottom: bottomPadding,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: '#B91C1C', // match your app header bg
      }}
    >
      {/* Status bar styling */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#B91C1C"
      />

      {/* App provider and navigation */}
      <AppProvider>
        <NavigationContainer>
          <Toast position="top" />
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </View>
  );
};

export default App;
