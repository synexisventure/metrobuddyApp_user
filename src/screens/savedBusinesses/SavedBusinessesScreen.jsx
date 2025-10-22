import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const RIGHT_ARROW = require('../../assets/images/forward_icon.png'); // local arrow icon
const HEART_ICON = require('../../assets/images/redHeart.png'); // red heart icon
const STAR_ICON = require('../../assets/images/star.png'); // yellow star icon
const HOTEL_IMG = require('../../assets/images/trendingNow/hotel.png');
const SPA_IMG = require('../../assets/images/trendingNow/hotel.png');

const SavedBusinessesScreen = () => {
  const businesses = [
    {
      id: 1,
      image: HOTEL_IMG,
      name: 'The Grand Plaza Hotel',
      category: 'Hotels',
      rating: '4.8',
    },
    {
      id: 2,
      image: SPA_IMG,
      name: 'Serenity Spa & Wellness',
      category: 'Beauty & Spa',
      rating: '4.9',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Image source={RIGHT_ARROW} style={styles.arrowIcon} />
        <Text style={styles.headerTitle}>Saved Businesses</Text>
      </View>

      {/* Business Cards */}
      {businesses.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Image */}
          <Image source={item.image} style={styles.cardImage} />

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.businessName}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>

            <View style={styles.ratingRow}>
              <Image source={STAR_ICON} style={styles.starIcon} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          {/* Heart Icon */}
          <TouchableOpacity>
            <Image source={HEART_ICON} style={styles.heartIcon} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default SavedBusinessesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    tintColor: '#111827',
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
    marginBottom: 12,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  infoSection: {
    flex: 1,
    marginLeft: 10,
  },
  businessName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 13,
    height: 13,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
  heartIcon: {
    width: 23,
    height: 20, 
    tintColor: '#EF4444',
    marginLeft: 6,
  },
});
