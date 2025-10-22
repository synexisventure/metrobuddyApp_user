import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const TrendingBusinessBody = () => {
    
  const businesses = [
    {
      id: "1",
      name: "The Grand Plaza Hotel",
      category: "Hotels",
      rating: 4.8,
      reviews: 1200,
      distance: "1.2 km",
      address: "123 Marine Drive, Mumbai",
      hours: "24/7",
      image: require("../../assets/images/images2/city.png"),
      trending: true,
    },
    {
      id: "2",
      name: "Bella Vista Restaurant",
      category: "Restaurants",
      rating: 4.6,
      reviews: 850,
      distance: "0.8 km",
      address: "456 Linking Road, Bandra West, Mumbai",
      hours: "11:00 AM - 11:00 PM",
      image: require("../../assets/images/images2/city.png"),
      trending: false,
    },
    {
      id: "3",
      name: "Serenity Spa & Wellness",
      category: "Beauty & Spa",
      rating: 4.9,
      reviews: 650,
      distance: "1.5 km",
      address: "789 Hill Road, Bandra West, Mumbai",
      hours: "9:00 AM - 9:00 PM",
      image: require("../../assets/images/images2/city.png"),
      trending: true,
    },
    {
      id: "4",
      name: "Bella Vista Restaurant",
      category: "Restaurants",
      rating: 4.6,
      reviews: 850,
      distance: "0.8 km",
      address: "456 Linking Road, Bandra West, Mumbai",
      hours: "11:00 AM - 11:00 PM",
      image: require("../../assets/images/images2/city.png"),
      trending: false,
    },
    {
      id: "5",
      name: "Serenity Spa & Wellness",
      category: "Beauty & Spa",
      rating: 4.9,
      reviews: 650,
      distance: "1.5 km",
      address: "789 Hill Road, Bandra West, Mumbai",
      hours: "9:00 AM - 9:00 PM",
      image: require("../../assets/images/images2/city.png"),
      trending: true,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        {item.trending && (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.checkBadge}>
            <Image
              source={require("../../assets/images/check.png")}
              style={styles.checkIcon}
            />
          </View>
        </View>

        <Text style={styles.category}>{item.category}</Text>

        <View style={styles.row}>
          <Image
            source={require("../../assets/images/star.png")}
            style={styles.iconSmall}
          />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.review}> ({item.reviews}) • {item.distance}</Text>
        </View>

        <View style={styles.row}>
          <Image
            source={require("../../assets/images/location.png")}
            style={styles.iconSmall}
          />
          <Text style={styles.address}>{item.address}</Text>
        </View>

        <View style={styles.row}>
          <Image
            source={require("../../assets/images/clock.png")}
            style={styles.iconSmall}
          />
          <Text style={styles.hours}>{item.hours}</Text>
          <TouchableOpacity style={styles.callButton}>
            <Image
              source={require("../../assets/images/phone.png")}
              style={styles.callIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={businesses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
      }}
    />
  );
};

export default TrendingBusinessBody;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  trendingBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#FF6B00",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendingText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  checkBadge: {
    backgroundColor: "#D0F0C0", // Light green circular background
    padding: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
    tintColor: "#2E8B57", // Deep green check color
  },
  category: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  rating: {
    color: "#000",
    fontWeight: "600",
    marginLeft: 3,
  },
  review: {
    color: "#666",
    fontSize: 12,
  },
  address: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
    flexShrink: 1,
  },
  hours: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
    flex: 1,
  },
  iconSmall: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  callIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  callButton: {
    paddingHorizontal: 5,
  },
});
