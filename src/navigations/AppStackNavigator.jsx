import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabAppNavigator from "./BottomTabAppNavigator";

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="MainTabs" component={BottomTabAppNavigator} />
            
        </Stack.Navigator>
    )
}

export default AppStackNavigator

const styles = StyleSheet.create({})