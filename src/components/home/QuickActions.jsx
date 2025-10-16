import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

// --- Local Icon Requirements ---
// NOTE: You must provide these images in your assets folder.
const STAR_ICON = require('../../assets/images/star.png'); // Placeholder for the blue star
// const LOCATION_ICON = require('../../assets/images/location_pin.png'); // Placeholder for the green pin
const LOCATION_ICON = require('../../assets/images/location-pin.png'); // Placeholder for the green pin

// --- Helper Component for Action Card ---
const ActionCard = ({ title, subtitle, icon, iconColor, bgColor }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
        {/* Use tintColor to apply the required color to your monochrome icon */}
        <Image source={icon} style={[styles.cardIcon, { tintColor: iconColor }]} resizeMode="contain" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

// --- Main Component ---
const QuickActions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Quick Actions</Text>
      
      <View style={styles.cardsRow}>
        {/* Card 1: Top Rated */}
        <ActionCard
          title="Top Rated"
          subtitle="Highly rated businesses"
          icon={STAR_ICON}
          iconColor="#4A90E2" // Blue
          bgColor="#E6F0FF" // Light Blue
        />

        {/* Card 2: Near Me */}
        <ActionCard
          title="Near Me"
          subtitle="Businesses nearby"
          icon={LOCATION_ICON}
          iconColor="#27AE60" // Green
          bgColor="#E6FFF0" // Light Green
        />
      </View>
    </View>
  );
};

export default QuickActions;

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff', // Assuming this section is on a white background
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  
  // Row to hold the two cards side-by-side
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Card Styles
  card: { 
    width: '48%', 
    height: 160, // Fixed height for a uniform look
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
     
    // 
    borderWidth : 1,
    borderColor : "#e2e8f0"
  },
  
  // Icon Styles
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30, // Fully rounded for a circular background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    width: 28,
    height: 28,
    // tintColor is applied dynamically in the component props
  },
  
  // Text Styles
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    // borderWidth : 1
  },
});