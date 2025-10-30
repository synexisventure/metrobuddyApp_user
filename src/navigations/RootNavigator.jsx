import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStackNavigator from './AuthStackNavigator';
import AppStackNavigator from './AppStackNavigator';
import LoadingScreen from '../screens/auth/LoadingScreen';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="UserAuth" component={AuthStackNavigator} />
            <Stack.Screen name="UserApp" component={AppStackNavigator} />
        </Stack.Navigator>
    )
}

export default RootNavigator

const styles = StyleSheet.create({})