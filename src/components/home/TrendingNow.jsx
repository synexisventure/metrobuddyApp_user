import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// --- Data Structure ---
const trendingData = [
  {
    id: '1',
    name: 'The Grand Plaza Hotel',
    category: 'Hotels',
    rating: 4.8,
    reviews: 1200,
    isHot: true,
    // Assuming your images are named and located correctly
    image: require('../../assets/images/trendingNow/hotel.png'),
  },
  {
    id: '2',
    name: 'Bella Vista Restaurant',
    category: 'Restaurants',
    rating: 4.6,
    reviews: 850,
    isHot: false,
    image: require('../../assets/images/trendingNow/hotel.png'), // Adjusted path for clarity
  },
  {
    id: '3',
    name: 'Serenity Spa & Wellness',
    category: 'Beauty & Spa',
    rating: 4.9,
    reviews: 650,
    isHot: true,
    image: require('../../assets/images/trendingNow/hotel.png'), // Adjusted path for clarity
  },
];

// --- Local Icon Requirements ---
// NOTE: You must provide these images in your assets folder.
const STAR_ICON = require('../../assets/images/star.png');
const CHECKMARK_ICON = require('../../assets/images/check.png');
const ARROW_ICON = require('../../assets/images/forward_icon.png');

// --- Reusable List Item Component ---
const TrendingItem = ({ item }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={
        ()=>{
          navigation.navigate('BusinessSingleScreen')
        }
      }
    >

      {/* Left side: Image and 'Hot' Badge */}
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
        {item.isHot && (
          <View style={styles.hotBadge}>
            <Text style={styles.hotText}>Hot</Text>
          </View>
        )}
      </View>

      {/* Center: Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <View style={styles.ratingRow}>
          {/* Replaced AntDesign Star with local image */}
          <Image source={STAR_ICON} style={styles.ratingIcon} resizeMode="contain" />
          <Text style={styles.itemRating}>{item.rating} ({item.reviews})</Text>
        </View>
      </View>

      {/* Right side: Checkmark */}
      <View style={styles.checkmarkWrapper}>
        {/* Replaced AntDesign Checkmark with local image */}
        <Image source={CHECKMARK_ICON} style={styles.checkmarkIcon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Component ---
const TrendingNow = () => {

  const navigation = useNavigation();

  const handlePressViewAll = () => {
    console.log("view all clicked trending businesses");
    navigation.navigate("TrendingBusinesses")
  }


  return (
    <View style={styles.container}>

      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Now</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={handlePressViewAll}
        >
          <Text style={styles.viewAllText}>View All</Text>
          {/* Replaced MaterialIcons Arrow with local image */}
          <Image source={ARROW_ICON} style={styles.arrowIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* List of Trending Items */}
      <View style={styles.listContainer}>
        {trendingData.map((item) => (
          <TrendingItem key={item.id} item={item} />
        ))}
      </View>

    </View>
  );
};

export default TrendingNow;

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
    marginRight: 4, // Space between text and icon
  },
  arrowIcon: {
    width: 16, // Adjust size to match the original icon size of 20
    height: 16,
    tintColor: '#4A90E2', // Blue tint for the arrow
  },

  // Trending Item Styles
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    // Shadow properties for the 'card' look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    paddingRight: 15,
  },

  // Image and Hot Badge Styles
  imageWrapper: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  hotBadge: {
    position: 'absolute',
    top: 10,
    left: 0,
    backgroundColor: '#FF5733',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  hotText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Details Styles
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFC700', // Yellow tint for the star
  },
  itemRating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },

  // Checkmark Styles
  checkmarkWrapper: {
    marginLeft: 'auto',
    padding: 4,
    // borderWidth : 1,
    backgroundColor: "#DCFCE7",
    borderRadius: 8
  },
  checkmarkIcon: {
    width: 20,
    height: 20,
    tintColor: '#60C872', // Green tint for the checkmark
  }
});