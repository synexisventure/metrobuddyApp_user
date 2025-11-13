import React, { useContext, useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity,
  ScrollView 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CategorySearchScreen = () => {
  const { API_BASE_URL, IMAGE_BASE_URL } = useContext(AppContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId, categoryName } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    if (categoryId) fetchBusinesses();
  }, [categoryId]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/user/search/by-category`,
        {
          categoryId: categoryId,
          city: "anywhere",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("my category wise search data : ", response);

      if (response.data.success) {
        setBusinesses(response.data.data);
      } else {
        setBusinesses([]);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const getBusinessImage = (logo) => {
    if (!logo) return "https://via.placeholder.com/300x200?text=No+Image";
    return `${IMAGE_BASE_URL}/uploads/businessImages/${logo.replace(/^\/?uploads\//, "")}`;
  };

  const handleBusinessPress = (business) => {
    // Navigate to business detail screen
    navigation.navigate("BusinessSingleScreen", { key: business._id });
  };

  const renderBusinessCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.businessCard}
      onPress={() => handleBusinessPress(item)}
      activeOpacity={0.9}
    >
      {/* Business Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getBusinessImage(item.logo) }}
          style={styles.businessImage}
          resizeMode="cover"
        />
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: '#FF8C00' }]}>
            <Text style={styles.badgeText}>Featured</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#00B761' }]}>
            <Text style={styles.badgeText}>Verified</Text>
          </View>
        </View>
      </View>

      {/* Business Info */}
      <View style={styles.businessInfo}>
        <Text style={styles.businessName} numberOfLines={1}>
          {item.businessName || "Business Name"}
        </Text>
        
        {/* <Text style={styles.businessDescription} numberOfLines={2}>
          {item.description || "No description available"}
        </Text> */}

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>city : {item.address?.city || "City not specified"}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ 5.0</Text>
          </View>
        </View>

        {/* Categories/Tags */}
        {item.categories && item.categories.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.categories.slice(0, 2).map((category, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{category}</Text>
              </View>
            ))}
            {item.categories.length > 2 && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>+{item.categories.length - 2}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Finding businesses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {categoryName || "Category"}
        </Text>
        <Text style={styles.headerSubtitle}>
          {businesses.length} businesses found
        </Text>
      </View>

      {/* Content */}
      {businesses.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataEmoji}>🏢</Text>
          <Text style={styles.noDataTitle}>No Businesses Found</Text>
          <Text style={styles.noDataText}>
            We couldn't find any businesses in this category.
          </Text>
        </View>
      ) : (
        <FlatList
          data={businesses}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={renderBusinessCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

export default CategorySearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#7f8c8d",
  },
  listContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  businessCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16, 
    overflow: "hidden",
    borderWidth:0.5,
    borderColor: "black"
  },
  imageContainer: {
    position: "relative",
  },
  businessImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f8f9fa",
  },
  badgeContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "600",
  },
  businessInfo: {
    padding: 12,
  },
  businessName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 4,
  },
  businessDescription: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 8,
    lineHeight: 16,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  metaItem: {
    flex: 1,
  },
  metaText: {
    fontSize: 10,
    color: "#666",
  },
  ratingContainer: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#2c3e50",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 8,
    color: "#1976d2",
    fontWeight: "500",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  noDataEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  noDataTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7f8c8d",
    marginBottom: 8,
  },
  noDataText: { 
    fontSize: 14,
    color: "#bdc3c7",
    textAlign: "center",
    lineHeight: 20,
  },
});