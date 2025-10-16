import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

// --- Data for Categories (Mapping to your local files) ---
// NOTE: You must have image files named exactly as they appear in the 'icon' property
// in the /images/category directory (e.g., b2b_services.png, restaurants.png, etc.)
const categories = [
    // This is the structure you indicated as correct
    { name: 'B2B Services', icon: require('../../assets/images/categories/b2b.png'), color: '#4A90E2', bgColor: '#E6F0FF' },
    { name: 'Restaurants', icon: require('../../assets/images/categories/restaurants.png'), color: '#D9652B', bgColor: '#FFF2E6' },
    { name: 'Hotels', icon: require('../../assets/images/categories/hotels.png'), color: '#9B59B6', bgColor: '#F6E6FF' },
    { name: 'Beauty & Spa', icon: require('../../assets/images/categories/spa.png'), color: '#E91E63', bgColor: '#FFEFF4' },
    { name: 'Education', icon: require('../../assets/images/categories/education.png'), color: '#27AE60', bgColor: '#E6FFF0' },
    { name: 'Healthcare', icon: require('../../assets/images/categories/heart.png'), color: '#E74C3C', bgColor: '#FFF0F0' },
    { name: 'Auto Services', icon: require('../../assets/images/categories/auto.png'), color: '#546E7A', bgColor: '#F0F3F5' },
    { name: 'Cafes', icon: require('../../assets/images/categories/cup.png'), color: '#E67E22', bgColor: '#FFF8E6' },
];

// --- Helper Component for Image and Label ---
const CategoryItem = ({ name, icon, bgColor }) => {
    return (
        <TouchableOpacity style={styles.categoryItemContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
                {/* The 'icon' property is now the result of require() */}
                <Image source={icon} style={styles.iconImage} resizeMode="contain" />
            </View>
            <Text style={styles.categoryName}>{name}</Text>
        </TouchableOpacity>
    );
};

// --- Main Component ---
const BrowseCategory = () => {
    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.header }>
                <Text style={styles.headerTitle}>Browse Categories</Text>
                <TouchableOpacity style={[styles.viewAllButton , {}]}>
                    <Text style={styles.viewAllText}>View All</Text>
                    {/* Using a simple Unicode arrow or a basic Text element for the arrow if not using an icon library */}
                <Image
                source={require("../../assets/images/forward_icon.png")}
                resizeMode='contain'
                style ={{height : 20}}
                />
                </TouchableOpacity>
            </View>

            {/* Categories Grid */}
            <View style={styles.categoriesGrid}>
                {categories.map((category, index) => (
                    <CategoryItem
                        key={index}
                        name={category.name}
                        icon={category.icon}
                        bgColor={category.bgColor}
                    />
                ))}
            </View>
        </View>
    );
};

export default BrowseCategory;

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },

    // Header Styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: '600',
        marginRight: 4, // Space between text and arrow
    },
    arrowText: {
        fontSize: 20,
        color: '#4A90E2',
        fontWeight: 'bold', 
        lineHeight: 20,
        transform: [{ rotate: '90deg' }],  
    },

    // Grid Styles
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

    // Category Item Styles
    categoryItemContainer: {
        width: '25%', // 4 items per row
        alignItems: 'center',
        marginBottom: 16,
    },
    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    }, 
    iconImage: {
        width: 30,  
        height: 30,
        tintColor: undefined, // IMPORTANT: Local images are often colorized by the source file, not tintColor
    },
    categoryName: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
        // The name can wrap to a new line if it's too long, like 'Auto Services'
        width: '90%',
        // borderWidth : 1
    },
});