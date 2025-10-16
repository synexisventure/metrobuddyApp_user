import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react'; 

import CategoryCard from "../../components/category/CategoryCard"; 
 
const categories = [
  { name: 'Restaurants', subtitle: 'Explore local restaurants', 
    icon: require('../../assets/images/categories/restaurants.png'), color: '#D9652B', bgColor: '#FFF2E6' },
  { name: 'Hotels', subtitle: 'Explore local hotels', 
    icon: require('../../assets/images/categories/hotels.png'), color: '#9B59B6', bgColor: '#F6E6FF' },
  { name: 'Beauty & Spa', subtitle: 'Explore local beauty & spa', 
    icon: require('../../assets/images/categories/spa.png'), color: '#E91E63', bgColor: '#FFEFF4' },
  { name: 'B2B Services', subtitle: 'Explore local b2b services',  
    icon: require('../../assets/images/categories/b2b.png'), color: '#4A90E2', bgColor: '#E6F0FF' },
  { name: 'Education', subtitle: 'Explore local education', 
    icon: require('../../assets/images/categories/education.png'), color: '#27AE60', bgColor: '#E6FFF0' },
  { name: 'Healthcare', subtitle: 'Explore local healthcare', 
    icon: require('../../assets/images/categories/heart.png'), color: '#E74C3C', bgColor: '#FFF0F0' },
  // Adding placeholders for the rest of the 16 categories for completeness
  { name: 'Auto Services', subtitle: 'Repair and maintenance', 
    icon: require('../../assets/images/categories/auto.png'), color: '#546E7A', bgColor: '#F0F3F5' },
  { name: 'Cafes', subtitle: 'Coffee and snacks', 
    icon: require('../../assets/images/categories/cup.png'), color: '#E67E22', bgColor: '#FFF8E6' },
];


const AllCategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      {/* Header Section (Back Arrow and Text) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Back Arrow Icon */}
          <Image source={require("../../assets/images/backArrow.png")} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>All Categories</Text>
          <Text style={styles.headerSubtitle}>{categories.length} categories available</Text>
        </View>
      </View>

      {/* Categories Grid (Scrollable) */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            iconColor={category.color}
            bgColor={category.bgColor}
            title={category.name}
            subtitle={category.subtitle}
          />
        ))}
        {/* Note: If you use a FlatList instead of ScrollView + map, 
            you should set numColumns={2} on the FlatList */}
      </ScrollView>
      
    </View>
  );
};

export default AllCategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: 16, // Padding for safe area / start of content
  },
  
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom : 30,
    borderBottomWidth : 0.5,
    borderColor : "#e2e8f0",
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#000', // Assuming a black arrow icon
  },
  headerTextContainer: {
    // Aligns the title and subtitle
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    lineHeight: 30,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // --- Grid Styles ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures cards are evenly spaced
    paddingHorizontal: 16,
  },
});