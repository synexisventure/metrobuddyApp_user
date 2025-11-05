import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { AppContext } from '../../context/AppContext';

// === LOCAL IMAGES ===
const ShareIcon = require('../../assets/images/share.png');

// === GET VIEWPORT DIMENSIONS ===
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const BusinessSingleHeader = () => {
  const { businessMedia, IMAGE_BASE_URL } = useContext(AppContext);

  // Get photos from businessMedia or use empty array
  const photos = businessMedia?.photos || [];

  // Construct full image URLs
  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return null;

    // Remove optional leading slash and the 'uploads/' folder only
    const cleanPath = photoUrl.replace(/^\/?uploads\//, '');
    const finalUrl = `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`;

    console.log("final header image URL : ", finalUrl);
    return finalUrl;
  };

  // If no photos, return null
  // If no photos, show empty placeholder view with min height
  if (photos.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', fontSize: 14 }}>No Images Available</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Scrollable Images */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: viewportWidth, height: 240 }}
      >
        {photos.map((photo, index) => (
          <View key={photo._id || index} style={{ width: viewportWidth, height: 240 }}>
            <Image
              source={{ uri: getImageUrl(photo.url) }}
              style={{
                width: viewportWidth, // full viewport width (equivalent to 100vw)
                height: 240,          // fixed height
                backgroundColor: '#555', // debug
                resizeMode: "contain",
              }}
              onError={(error) => console.log('Image loading error:', error)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Top Icon Bar */}
      <View style={styles.topBar}>
        <View></View>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.circleIcon}>
            <Image source={ShareIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: '#FF8C00' }]}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: '#00B761' }]}>
          <Text style={styles.badgeText}>Verified</Text>
        </View>
      </View>

      {/* Image Counter */}
      {photos.length > 1 && (
        <View style={styles.imageCounter}>
          <Text style={styles.counterText}>
            {`1 / ${photos.length}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BusinessSingleHeader;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 240,
    overflow: 'hidden',
  },
  topBar: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  circleIcon: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
