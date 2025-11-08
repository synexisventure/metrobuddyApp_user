// BusinessSingleHeader.js
import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/AppContext"; // Import AppContext for IMAGE_BASE_URL

// Local icons
const BackIcon = require('../../assets/images/backArrow.png');
const HeartIcon = require('../../assets/images/heart.png');
const ShareIcon = require('../../assets/images/share.png');

const BusinessSingleHeader = ({ business }) => {
  const { IMAGE_BASE_URL } = useContext(AppContext);

  const getImageUrl = (photo) => {
    if (!photo) return null;

    const urlString =
      typeof photo === "string"
        ? photo
        : typeof photo?.url === "string"
          ? photo.url
          : null;

    if (!urlString) return null;

    // If it's already a full URL, use it
    if (urlString.startsWith("http")) return urlString;

    const cleanPath = urlString.replace(/^\/?uploads\//, "");
    return `${IMAGE_BASE_URL}/uploads/businessImages/${cleanPath}`;
  };

  const logoUrl = getImageUrl(business?.logo);

  return (
    <View style={styles.container}>
      {/* Background / Main Image */}
      {logoUrl ? (
        <Image source={{ uri: logoUrl }} style={styles.mainImage} />
      ) : (
        <View style={[styles.mainImage, { backgroundColor: "#ccc" }]} />
      )}

      {/* Top Icon Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.circleIcon}>
          <Image source={BackIcon} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.circleIcon}>
            <Image source={HeartIcon} style={styles.icon} />
          </TouchableOpacity>
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
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
});
