import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";

const TrendingBusinessBody = () => {

  const navigation = useNavigation();

  // 🔥 REAL DATA COMING FROM CONTEXT
  const { trendingBusinesses, trendingLoading } = useContext(AppContext);

  const renderItem = ({ item }) => {

    const business = item.businessDetails;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("BusinessSingleScreen", { key: business.businessId });
        }}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={
              business.logo
                ? { uri: business.logo }
                : require("../../assets/images/placeholder.png")
            }
            style={styles.image}
          />

          {item.trending && (
            <View style={styles.trendingBadge}>
              <Text style={styles.trendingText}>Trending</Text>
            </View>
          )}
        </View>

        {/* Details */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{business.businessName}</Text>

            <View style={styles.checkBadge}>
              <Image
                source={require("../../assets/images/check.png")}
                style={styles.checkIcon}
              />
            </View>
          </View>

          {/* <Text style={styles.category}>{business.category || "Category"}</Text> */}
          <Text style={styles.category}>
            {business.description
              ? business.description.length > 16
                ? business.description.slice(0, 16) + "..."
                : business.description
              : "No description"}
          </Text>

          <View style={styles.row}>
            <Image
              source={require("../../assets/images/star.png")}
              style={styles.iconSmall}
            />
            <Text style={styles.rating}>{item.score || "5.0"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (trendingLoading) {
    return <Text style={{ textAlign: "center", marginTop: 30 }}>Loading...</Text>;
  }

  return (
    <FlatList
      data={trendingBusinesses}
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
