import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';

// NOTE: If you are using 'react-native-reanimated', change the above import to:
// import Animated from 'react-native-reanimated';

// Placeholder image sources for the icons
const getIconSource = (name) => {
    switch (name) {
        case 'Location':
            // You'll need a location pin icon
            return require('../../assets/images/location-pin.png');
        case 'Search':
            // You'll need a search magnifying glass icon
            return require('../../assets/images/search.png');
        case 'Notification':
            // You'll need a notification bell icon
            return require('../../assets/images/bell.png');
        default:
            return null;
    }
}

/**
 * CommonHeader component with styling and SAFE scroll animation logic.
 * @param {Animated.Value} animatedScrollY - The animated value from the parent ScrollView/FlatList.
 */
const CommonHeader = ({ animatedScrollY }) => {

    const navigation = useNavigation();

    // --- FIX APPLIED HERE ---
    // Safely use the prop, or create a new non-animated value (0) if the prop is undefined.
    // This prevents the "Cannot read property 'interpolate' of undefined" error.
    const scrollY = animatedScrollY || new Animated.Value(0);

    // 1. Define interpolation for background color change on scroll
    const animatedBGC = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ['#155DFC', '#0E49B3'], // Blue to a slightly darker blue
        extrapolate: 'clamp',
    });

    // We use Animated.View for the main container to apply the animation
    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: animatedBGC } // Apply the animated color
            ]}
        >
            <View style={styles.topSection}>
                {/* 1. Greeting */}
                <Text style={styles.greeting}>Good morning!</Text>

                {/* 2. Location and Notification */}
                <View style={styles.infoRow}>
                    {/* Location */}
                    <View style={styles.locationContainer}>
                        <Image
                            source={getIconSource('Location')}
                            style={styles.locationIcon}
                        />
                        <Text style={styles.locationText}>Mumbai, Maharashtra</Text>
                    </View>

                    {/* Notification Icon and Badge */}
                    <TouchableOpacity
                        style={styles.notificationWrapper}
                        onPress={() => {
                            navigation.navigate("NotificationsScreen");
                        }}
                    >
                        <Image
                            source={getIconSource('Notification')}
                            style={styles.notificationIcon}
                        />
                        {/* Notification Badge */}
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationCount}>2</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 3. Search Bar - NOW A TOUCHABLEOPACITY */}
            <TouchableOpacity
                style={styles.searchContainer}
                onPress={() => {
                    navigation.navigate("SearchScreen");
                }} // Add navigation logic here
                activeOpacity={0.8}
            >
                <Image
                    source={getIconSource('Search')}
                    style={styles.searchIcon}
                />
                <Text style={styles.searchText}>
                    Search for services...
                </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#155DFC',
        paddingTop: 10, // Space for status bar
        paddingHorizontal: 10,
        paddingBottom: 10,
        zIndex: 10,
    },
    topSection: {
        marginBottom: 10,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        // marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 16,
        height: 16,
        tintColor: '#fff',
        marginRight: 5,
    },
    locationText: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
    },
    // --- Notification Styles ---
    notificationWrapper: {
        position: 'relative',
        paddingHorizontal: 5,
    },
    notificationIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    notificationBadge: {
        position: 'absolute',
        top: -6,
        right: 0,
        backgroundColor: '#FF4500',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: '#fff',
    },
    notificationCount: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // --- Search Bar Styles ---
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#999',
        marginRight: 10,
    },
    searchText: {
        flex: 1,
        fontSize: 16,
        color: '#999',
    },
});