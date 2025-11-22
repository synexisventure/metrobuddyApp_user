import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext'; // adjust path
// Local icons
const STAR_ICON = require('../../assets/images/star.png');
const CHECKMARK_ICON = require('../../assets/images/check.png');
const ARROW_ICON = require('../../assets/images/forward_icon.png');

const TrendingItem = ({ item }) => {

  const {IMAGE_BASE_URL} = useContext(AppContext);

  const navigation = useNavigation();
  const business = item.businessDetails;

  // Handle image: use local placeholder if logo is missing
  const imageSource =
    business.logo && business.logo !== "not available"
      ? { uri: `${IMAGE_BASE_URL}/uploads/businessImages/${business.logo}` }
      : require('../../assets/images/placeholder.png');

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        console.log("sending details:", business.businessId );
        navigation.navigate('BusinessSingleScreen', { key : business.businessId });
      }}
    >
      {/* Left side: Image */}
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.itemImage} resizeMode="cover" />
        {/* Optional Hot Badge if you have a flag */}
        {item.isHot && (
          <View style={styles.hotBadge}>
            <Text style={styles.hotText}>Hot</Text>
          </View>
        )}
      </View>

      {/* Center: Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
          {business.businessName}
        </Text>
        <Text style={styles.itemCategory}>
          {business.description
            ? business.description.length > 16
              ? business.description.slice(0, 16) + "..."
              : business.description
            : "No description"}
        </Text>

        <View style={styles.ratingRow}>
          <Image source={STAR_ICON} style={styles.ratingIcon} resizeMode="contain" />
          <Text style={styles.itemRating}>{item.score || "5.0"}</Text>
        </View>
      </View>

      {/* Right side: Checkmark */}
      <View style={styles.checkmarkWrapper}>
        <Image source={CHECKMARK_ICON} style={styles.checkmarkIcon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};


// --- Main Component ---
const TrendingNow = () => {
  const navigation = useNavigation();
  const { trendingBusinesses, trendingLoading, fetchTrendingBusinesses } = useContext(AppContext);

  useEffect(() => {
    fetchTrendingBusinesses();
  }, []);

  const handlePressViewAll = () => {
    navigation.navigate("TrendingBusinesses");
  };

  return (
    <View style={styles.container}>

      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Now</Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={handlePressViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <Image source={ARROW_ICON} style={styles.arrowIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* List of Trending Items */}
      {trendingLoading ? (
        <View style={{ paddingVertical: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#4A90E2" />
        </View>
      ) : trendingBusinesses.length === 0 ? (
        <Text style={{ color: '#666', textAlign: 'center', marginVertical: 20 }}>
          No trending businesses available.
        </Text>
      ) : (
        <View style={styles.listContainer}>
          {trendingBusinesses.map((item) => (
            <TrendingItem key={item._id} item={item} />
          ))}
        </View>
      )}

    </View>
  );
};

export default TrendingNow;

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#000' },
  viewAllButton: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { fontSize: 16, color: '#4A90E2', fontWeight: '500', marginRight: 4 },
  arrowIcon: { width: 16, height: 16, tintColor: '#4A90E2' },
  listContainer: {},
  itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1, paddingRight: 15 },
  imageWrapper: { width: 100, height: 100, marginRight: 10, borderRadius: 12, overflow: 'hidden' },
  itemImage: { width: '100%', height: '100%' },
  hotBadge: { position: 'absolute', top: 10, left: 0, backgroundColor: '#FF5733', paddingHorizontal: 8, paddingVertical: 3, borderTopRightRadius: 6, borderBottomRightRadius: 6 },
  hotText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  detailsContainer: { flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 2 },
  itemCategory: { fontSize: 13, color: '#666', marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingIcon: { width: 14, height: 14, tintColor: '#FFC700' },
  itemRating: { fontSize: 14, color: '#333', marginLeft: 5 },
  checkmarkWrapper: { marginLeft: 'auto', padding: 4, backgroundColor: "#DCFCE7", borderRadius: 8 },
  checkmarkIcon: { width: 20, height: 20, tintColor: '#60C872' }
});
