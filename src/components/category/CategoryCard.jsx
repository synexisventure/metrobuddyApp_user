import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// --- Reusable Category Card Component ---
const CategoryCard = ({ categoryId, icon, iconColor, bgColor, title, subtitle }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("CategorySearchScreen",{
          categoryId : categoryId
        })
      }}
    >

      {/* Icon Wrapper */}
      <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
        {/* The icon image, tinted with the specific category color */}
        <Image
          source={icon}
          style={[styles.cardIcon, { tintColor: iconColor }]}
          resizeMode="contain"
        />
      </View>

      {/* Text Details */}
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>

    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    // Defines the card's dimensions for a 2-column grid with spacing
    width: '47%', // Slightly less than 50% to allow space between columns
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16, // Space below each card

    // Shadow properties for the 'lifted' card look
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  // Icon Styles
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 8, // Square-like rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    width: 26,
    height: 26,
    // tintColor is set dynamically to apply the color
  },

  // Text Styles
  textContainer: {
    // Aligns text left
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});