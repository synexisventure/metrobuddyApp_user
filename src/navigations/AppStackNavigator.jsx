import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabAppNavigator from "./BottomTabAppNavigator";

import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import TrendingBusinesses from "../screens/trendingBusinesses/TrendingBusinesses";
import BusinessSingleScreen from "../screens/businessSingleScreen/BusinessSingleScreen";

import BecomePartnerFormScreen from "../screens/BecomePartner/BecomePartnerFormScreen";

// dashboard
import DashboardScreen from "../screens/businessDashboard/BusinessDashboardScreen";

// forms Screens
import BusinessDetailsScreen from "../screens/stepFormsScreen/BusinessDetailsScreen";
import ContactDetailsScreen from "../screens/stepFormsScreen/ContactDetailsScreen";
import BusinessTimingScreen from "../screens/stepFormsScreen/BusinessTimingScreen";
import BusinessCategoryScreen from "../screens/stepFormsScreen/BusinessCategoryScreen";
import AddProductScreen from "../screens/stepFormsScreen/AddProductScreen";
import UploadDocumentScreen from "../screens/stepFormsScreen/UploadDocumentScreen";
import PhotosVideoScreen from "../screens/stepFormsScreen/PhotosVideoScreen";

// subscription 
import CurrentSubscriptionScreen from "../screens/Subscription/CurrentSubcriptionScreen";
import SubscriptionScreen from "../screens/Subscription/SubscriptionScreen";

// search
import SearchScreen from "../screens/search/SearchScreen";

// category search screen
import CategorySearchScreen from "../screens/categorySearch/CategorySearchScreeen";

// leads 
import SingleBusinessLeadScreen from "../screens/leads/SingleBusinessLeadScreen";
import LeadsScreen from '../screens/leads/LeadsScreen'; 

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

            <Stack.Screen name="BecomePartnerFormScreen" component={BecomePartnerFormScreen} />

            {/* dashboard */}
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />

            {/* all forms navigaion */}
            <Stack.Screen name="BusinessdetailsScreen" component={BusinessDetailsScreen} />
            <Stack.Screen name="ContactDetailsScreen" component={ContactDetailsScreen} />
            <Stack.Screen name="BusinessTimingScreen" component={BusinessTimingScreen} />
            <Stack.Screen name="BusinessCategoryScreen" component={BusinessCategoryScreen} />
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
            <Stack.Screen name="PhotosVideoScreen" component={PhotosVideoScreen} />
            <Stack.Screen name="UploadDocumentScreen" component={UploadDocumentScreen} />

            {/* subscription screens */}
            <Stack.Screen name="CurrentSubscriptionScreen" component={CurrentSubscriptionScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />

            {/* search screen */}
            <Stack.Screen name="SearchScreen" component={SearchScreen} />

            {/*  category search screen */}
            <Stack.Screen name="CategorySearchScreen" component={CategorySearchScreen} />

            {/* leads screen */}
            <Stack.Screen name="LeadsScreen" component={LeadsScreen} />
            <Stack.Screen name="SingleLeadScreen" component={SingleBusinessLeadScreen} />

        </Stack.Navigator>
    )
}

export default AppStackNavigator

const styles = StyleSheet.create({})