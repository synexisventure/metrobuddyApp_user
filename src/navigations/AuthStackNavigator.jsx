import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "../screens/startScreens/Screen1";
import Screen2 from "../screens/startScreens/Screen2";
import Screen3 from "../screens/startScreens/Screen3";
import LoginScreen from "../screens/auth/LoginScreen";
import LoadingScreen from "../screens/auth/LoadingScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
