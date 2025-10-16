import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming MaterialCommunityIcons for the icon type

// --- Local Icon Requirements ---
// NOTE: You must provide these images in your assets folder.
const GROWTH_ICON = require('../../assets/images/franchise.png'); // Placeholder for the small chart/up-arrow icon
const LIGHTNING_ICON = require('../../assets/images/lightning.png'); // Placeholder for the large lightning icon

const FranchiseOpportunityCard = () => {
    return (
        <View style={styles.container}>

            {/* 1. Icon and Title Row */}
            <View style={styles.titleRow}>
                {/* Growth Icon (Small, White) */}
                <Image source={GROWTH_ICON} style={styles.growthIcon} resizeMode="contain" />
                <Text style={styles.titleText}>Franchise Opportunity</Text>
            </View>

            {/* 2. Description Text */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    Start your business with 5.5L {'\n'} investment. High ROI {"\n"}guaranteed!
                </Text>
            </View>

            {/* 3. Learn More Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Learn More</Text>
            </TouchableOpacity>

            {/* 4. Large Circular Lightning Icon (Absolute Positioned) */}
            <View style={styles.lightningCircle}>
                {/* Lightning Icon (Large, White) */}
                <Image source={LIGHTNING_ICON} style={styles.lightningIcon} resizeMode="contain" />
            </View>

        </View>
    );
};

export default FranchiseOpportunityCard;

const styles = StyleSheet.create({
    container: {
        // The main red background card
        backgroundColor: '#FF2D55', // Bright Red color
        borderRadius: 14,
        padding: 10,
        margin: 10, // Add margin to show the card shadow/boundaries
        position: 'relative', // Necessary for the absolute positioning of the lightning icon
        overflow: 'hidden', // Ensures the lightning circle is contained if it overflows slightly

        // Shadow properties for the card lift
        shadowColor: '#FF2D55',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    // --- 1. Title Row ---
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    growthIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: '#fff', // White color for the icon
    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    // --- 2. Description Text ---
    descriptionContainer: {
        // Limits the width so text doesn't clash with the absolute icon on the right
        width: '70%',
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 20,
    },

    // --- 3. Button ---
    button: {
        backgroundColor: '#fff', // White background
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 8,
        height : 32,
        alignSelf: 'flex-start', // Keeps the button width confined to its content
    },
    buttonText: {
        color: '#FF2D55', // Red text color
        fontSize: 14,
        fontWeight: '600', 
    },

    // --- 4. Lightning Icon (Absolute Positioning) ---
    lightningCircle: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30, // Circle
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightningIcon: {
        width: 28,
        height: 28,
        tintColor: '#fff',
    },
});