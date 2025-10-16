import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

// --- Local Icon Requirements ---
const SEARCH_ICON = require('../../assets/images/search.png');
const LIST_ICON = require('../../assets/images/listChanger.png');
const GRID_ICON = require('../../assets/images/gridChanger.png');
 
const FavoritesHeader = ({ totalPlaces, navigation, isGridView, toggleView }) => {

    const totalHotels = 4; // Hardcoded count from the image for simplicity

    return (
        <View style={styles.headerContainer}>

            {/* Title Row: Text and List View Icon */}
            <View style={styles.titleRow}>
                <View>
                    <Text style={styles.headerTitle}>Your Favorites</Text>
                    <Text style={styles.headerSubtitle}>
                        {totalPlaces} saved places • {totalHotels} hotels
                    </Text>
                </View> 
                <TouchableOpacity style={styles.listButton} onPress={toggleView}>
                    <Image
                        source={isGridView ? LIST_ICON : GRID_ICON}
                        style={styles.listIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Image source={SEARCH_ICON} style={styles.searchIcon} resizeMode="contain" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search your favorites..."
                    placeholderTextColor="#999"
                />
            </View>
        </View>
    );
};

export default FavoritesHeader;

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10, // Space before the tabs section
        backgroundColor: '#fff',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    listButton: {
        padding: 5,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#e5e5e5"
    },
    listIcon: {
        width: 24,
        height: 24,
        tintColor: '#000',
    },

    // Search Bar Styles
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#999',
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});