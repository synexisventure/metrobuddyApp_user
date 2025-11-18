import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const StarIcon = require('../../assets/images/star.png');
const EditIcon = require('../../assets/images/edit.png');

const BusinessSingleDetails = ({ }) => {
  const navigation = useNavigation();

  const {
    businessDetails,
    businessCategory, 
    IMAGE_BASE_URL
  } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      console.log(`my link  : ${IMAGE_BASE_URL}/uploads/businessImages/${businessDetails?.logo}`);

    })
  )

  const logoUrl = businessDetails?.logo
    ? `${IMAGE_BASE_URL}/uploads/businessImages/${businessDetails?.logo}`
    : null;

  return (
    <View style={styles.cardContainer}>
      {/* Top Row: Logo + Name + Type */}
      <View style={styles.headerRow}>
        {/* Logo with Border */}
        <View style={styles.logoContainer}>
          {logoUrl ? (
            <Image source={{ uri: logoUrl }} style={styles.logo} />
          ) : (
            <View style={styles.placeholderLogo}>
              <Text style={styles.placeholderText}>
                {businessDetails?.businessName?.charAt(0) || 'N'}
              </Text>
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          {/* Business Name with Edit Button */}
          <View style={styles.nameRow}>
            <Text style={styles.hotelName}>{businessDetails?.businessName || "Na"}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('BusinessdetailsScreen')}
            >
              <Image source={EditIcon} style={styles.editIcon} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Category with Edit Button */}
          <View style={styles.categoryRow}>
            <Text style={styles.hotelType}>Category : {businessCategory?.categoryId?.name || " NA "}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('BusinessCategoryScreen')}
            >
              <Image source={EditIcon} style={styles.editIcon} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Rating + Distance */}
      <View style={styles.ratingRow}>
        <Image source={StarIcon} style={styles.starIcon} />
        <Text style={styles.ratingText}>5.0</Text>
      </View>
    </View>
  );
};

export default BusinessSingleDetails;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 2,
    backgroundColor: '#fafafa',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    resizeMode: 'cover',
  },
  placeholderLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  hotelType: {
    fontSize: 14,
    color: '#777',
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e8ecff',
  },
  editIcon: {
    width: 12,
    height: 12,
    tintColor: '#007AFF',
    marginRight: 4,
  },
  editText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 60, // Adjusted for logo container width
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
});