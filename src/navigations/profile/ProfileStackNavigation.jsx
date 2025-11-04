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
import BecomePartnerFormScreen from "../../screens/BecomePartner/BecomePartnerFormScreen"; 
import SubscriptionScreen from "../../screens/Subscription/SubscriptionScreen";

// dashboard
import DashboardScreen from "../../screens/businessDashboard/BusinessDashboardScreen";

// forms Screens
import BusinessDetailsScreen from "../../screens/stepFormsScreen/BusinessDetailsScreen";
import ContactDetailsScreen from "../../screens/stepFormsScreen/ContactDetailsScreen";
import BusinessTimingScreen from "../../screens/stepFormsScreen/BusinessTimingScreen";
import BusinessCategoryScreen from "../../screens/stepFormsScreen/BusinessCategoryScreen";
import AddProductScreen from "../../screens/stepFormsScreen/AddProductScreen";
import UploadDocumentScreen from "../../screens/stepFormsScreen/UploadDocumentScreen";
import PhotosVideoScreen from "../../screens/stepFormsScreen/PhotosVideoScreen";




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
            <Stack.Screen name="BecomePartnerFormScreen" component={BecomePartnerFormScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />

            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
            <Stack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="PrivacyAndSecurityScreen" component={PrivacyAndSecurityScreen} />

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

        </Stack.Navigator>
    )
}

export default ProfileStackNavigation

const styles = StyleSheet.create({})