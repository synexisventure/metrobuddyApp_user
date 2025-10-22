// BusinessSingleDetails.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// === LOCAL IMAGES (same as you listed) ===
const HotelLogo = require('../../assets/images/images2/city.png');
const StarIcon = require('../../assets/images/star.png');
const CallIcon = require('../../assets/images/phone.png');
const DirectionsIcon = require('../../assets/images/location.png');
const MessageIcon = require('../../assets/images/mail.png');

const BusinessSingleDetails = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Top Row: Logo + Name + Type */}
      <View style={styles.headerRow}>
        <Image source={HotelLogo} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.hotelName}>The Grand Plaza Hotel</Text>
          <Text style={styles.hotelType}>Hotels</Text>
        </View>
      </View>

      {/* Rating + Distance */}
      <View style={styles.ratingRow}>
        <Image source={StarIcon} style={styles.starIcon} />
        <Text style={styles.ratingText}>4.8</Text>
        <Text style={styles.reviewText}>(1200 reviews)</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.distance}>1.2 km</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        {/* Call Button (Primary Blue) */}
        <TouchableOpacity style={[styles.button, styles.callButton]}>
          <Image source={CallIcon} style={[styles.buttonIcon, { tintColor: '#fff' }]} />
          <Text style={[styles.buttonText, { color: '#fff' }]}>Call</Text>
        </TouchableOpacity>

        {/* Directions */}
        <TouchableOpacity style={styles.button}>
          <Image source={DirectionsIcon} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>

        {/* Message */}
        <TouchableOpacity style={styles.button}>
          <Image source={MessageIcon} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusinessSingleDetails;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    // padding: 15,
    // borderRadius: 12,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.08,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  // --- Logo and Name ---
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
    resizeMode: 'cover',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  hotelType: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },

  // --- Rating Section ---
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 55, // aligns with text start after logo
  },
  starIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  dot: {
    color: '#999',
    marginHorizontal: 6,
    fontSize: 16,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },

  // --- Buttons ---
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 42,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  callButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonIcon: {
    width: 18,
    height: 18,
    tintColor: '#555',
    marginRight: 6,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});
