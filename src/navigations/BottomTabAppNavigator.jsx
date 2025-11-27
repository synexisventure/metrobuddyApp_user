import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- Import Screens ---
import HomeScreen from "../screens/home/HomeScreen";
import ProfileStackNavigation from './profile/ProfileStackNavigation';
import CategoryScreen from "../screens/category/CategoryScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import FranchiseScreen from "../screens/franchise/FranchiseScreen"; 
import BecomePartnerScreen from '../screens/BecomePartner/BecomePartnerScreen';

const Tab = createBottomTabNavigator();

// --- Placeholder for Icons (REPLACE WITH ACTUAL ASSETS) ---
const getIconSource = (name) => {

    switch (name) {
        case 'Home':
            return require('../assets/images/home.png');
        case 'Categories':
            return require('../assets/images/category.png');
        case 'Business':
            return require('../assets/images/plus.png');
        case 'Favorites':
            return require('../assets/images/heart.png');
        case 'Franchise':
            return require('../assets/images/franchise.png');
        case 'Profile':
            return require('../assets/images/profile.png');
        case 'Leads':
            return require('../assets/images/leads.png');
        default:
            return null;
    }
}
// ---------------------------------------------------------------



const BottomTabAppNavigator = () => {

    const showLeadsTab = true; // or condition from props/context
    const labelFontSize = showLeadsTab ? 12 : 12;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                // Show labels as per the screenshot
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 70,
                    paddingBottom: 5,
                    paddingTop: 5,
                    // Optional: remove top border line if desired
                    // borderTopWidth: 0,
                },
                // Set colors for the screenshot look (Active: Blue, Inactive: Gray)
                tabBarActiveTintColor: '#155DFC',
                tabBarInactiveTintColor: '#999',
                tabBarLabelStyle: {
                    // fontSize: 18,
                    fontSize: labelFontSize,
                    color : "black",
                    fontWeight: '600', 
                },
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Image
                            // Set size to 20x20
                            source={getIconSource('Home')}
                            style={{ tintColor: color, width: 30, height: 30 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Categories" // Adjusted name to match screenshot label
                component={CategoryScreen}
                options={{
                    tabBarLabel: 'Categories',
                    tabBarIcon: ({ color }) => (
                        <Image
                            // Set size to 20x20
                            source={getIconSource('Categories')}
                            style={{ tintColor: color, width: 30, height: 30 }}
                        />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color }) => (
                        <View style={{ width: 25, height: 25, }}>
                            <Image
                                source={getIconSource('Favorites')}
                                style={{ tintColor: color, width: 25, height: 22 }} // Image is 20x20
                            />
                        </View> // View is 30x30, but how are the contents aligned?
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Business"
                component={BecomePartnerScreen}
                options={{
                    tabBarLabel: 'Business',
                    tabBarIcon: ({ color }) => (
                        <View style={{ width: 25, height: 25, }}>
                            <Image
                                source={getIconSource('Business')}
                                style={{ tintColor: color, width: 30, height: 30 }} // Image is 20x20
                            />
                        </View> // View is 30x30, but how are the contents aligned?
                    ),
                }}
            />
          {/*  <Tab.Screen
                name="Leads"
                component={LeadsScreen}
                options={{
                    tabBarLabel: 'Leads',
                    tabBarIcon: ({ color }) => (
                        <Image
                            // Set size to 20x20
                            source={getIconSource('Leads')}
                            style={{ tintColor: color, width: 20, height: 20 }}
                        />
                    ),
                }}
            />*/}

            <Tab.Screen
                name="Franchise"
                component={FranchiseScreen}
                options={{
                    tabBarLabel: 'Franchise',
                    tabBarIcon: ({ color }) => (
                        <Image
                            // Set size to 20x20
                            source={getIconSource('Franchise')}
                            style={{ tintColor: color, width: 30, height: 30 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigation}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Image
                            // Set size to 20x20
                            source={getIconSource('Profile')}
                            style={{ tintColor: color, width: 30, height: 30 }}
                        />
                    ),
                }}

                listeners={({ navigation }) => ({
                    tabPress: e => {
                        // Prevent default behavior
                        e.preventDefault();
                        // Reset the stack and navigate to main profile screen
                        navigation.navigate('Profile', {
                            screen: 'ProfileMain', // name of the main screen in ProfileStackNavigation
                        });
                    },
                })}
            />
        </Tab.Navigator>
    );
};

export default BottomTabAppNavigator;

// Custom styles are no longer needed for the tab items
const styles = StyleSheet.create({});