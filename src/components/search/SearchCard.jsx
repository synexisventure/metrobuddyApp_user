// BusinessCard.js
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';

const BusinessCard = ({ business }) => {

  const {IMAGE_BASE_URL} = useContext(AppContext);

  const navigation = useNavigation();

  const formatAddress = (address) => {
    if (!address) return 'Address not available';
    
    const parts = [
      address.plotNo,
      address.street,
      address.landmark,
      address.area,
      address.city,
      address.state,
      address.pincode
    ].filter(Boolean);
    
    return parts.length > 0 ? parts.join(', ') : 'Address not available';
  };

  const handlePress =()=>{
    navigation.navigate("BusinessSingleScreen",
      {
        key : business,
      }
    )
  }

  return (
    <TouchableOpacity 
    style={styles.businessCard}
    onPress= {handlePress}
    >
      {/* Business Logo and Basic Info */}
      <View style={styles.cardHeader}>
        <View style={styles.logoContainer}>
          <Image 
            // source={require('../../assets/images/images2/city.png')}
            source={`${IMAGE_BASE_URL}/Uploads/businessImages/${business?.logo}`}
            style={styles.businessLogo}
          />
        </View>
        <View style={styles.businessBasicInfo}>
          <Text style={styles.businessName}>{business.businessName}</Text>
          <Text style={styles.businessCategory}>Business</Text>
          <View style={styles.ratingContainer}>
            <Image 
              source={require('../../assets/images/star.png')} 
              style={styles.starIcon} 
            />
            <Text style={styles.ratingText}>5.0</Text>
          </View>
        </View>
      </View>

      {/* Address */}
      <View style={styles.addressContainer}>
        <Image 
          source={require('../../assets/images/location.png')} 
          style={styles.locationIcon} 
        />
        <Text style={styles.addressText} numberOfLines={2}>
          {formatAddress(business.address)}
        </Text>
      </View>

      {/* Status and Distance */}
      <View style={styles.footer}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, styles.openDot]} />
          <Text style={styles.statusText}>Open Now</Text>
        </View>
        {business.distance && (
          <Text style={styles.distanceText}>{business.distance}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  businessCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8ecf0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  businessLogo: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  businessBasicInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  businessCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: '#666',
    marginRight: 6,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  openDot: {
    backgroundColor: '#34C759',
  },
  statusText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default BusinessCard;