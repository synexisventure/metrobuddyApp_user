import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabAppNavigator from "./BottomTabAppNavigator";

import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import TrendingBusinesses from "../screens/trendingBusinesses/TrendingBusinesses";
import BusinessSingleScreen from "../screens/businessSingleScreen/BusinessSingleScreen";

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="MainTabs" component={BottomTabAppNavigator} />
            <Stack.Screen name="TrendingBusinesses" component={TrendingBusinesses} />
            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
            <Stack.Screen name="BusinessSingleScreen" component={BusinessSingleScreen} />
            
        </Stack.Navigator>
    )
}

export default AppStackNavigator

const styles = StyleSheet.create({})