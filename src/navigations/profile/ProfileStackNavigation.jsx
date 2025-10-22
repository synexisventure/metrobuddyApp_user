import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ProfileScreen from '../../screens/profile/ProfileScreen'; 
import SavedBusinessesScreen from "../../screens/savedBusinesses/SavedBusinessesScreen";
import RecentScreachesScreen from "../../screens/recentSearches/RecentSearchesScreen";
import OfferAndDealsScreen from "../../screens/offerAndDeals/OfferAndDealsScreen";
import BecomePartnerScreen from "../../screens/BecomePartner/BecomePartnerScreen";
import NotificationsScreen from "../../screens/notifications/NotificationsScreen";
import HelpAndSupportScreen from "../../screens/helpAndSupport/HelpAndSupportScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";
import PrivacyAndSecurityScreen from "../../screens/privacyAndSecurity/PrivacyAndSecurityScreen";


const ProfileStackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
            <Stack.Screen name="ProfileMain" component={ProfileScreen} /> 

            <Stack.Screen name="SavedBusinessesScreen" component={SavedBusinessesScreen} /> 
            <Stack.Screen name="RecentScreachesScreen" component={RecentScreachesScreen} /> 
            <Stack.Screen name="OfferAndDealsScreen" component={OfferAndDealsScreen} />  
            <Stack.Screen name="BecomePartnerScreen" component={BecomePartnerScreen} />
            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} /> 
            <Stack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} /> 
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="PrivacyAndSecurityScreen" component={PrivacyAndSecurityScreen} /> 


        </Stack.Navigator>
    )
}

export default ProfileStackNavigation

const styles = StyleSheet.create({})