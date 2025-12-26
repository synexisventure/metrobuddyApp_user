import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

// Local icons
const BackIcon = require("../../assets/images/backArrow.png");
const HeartIcon = require("../../assets/images/heart.png");
const ShareIcon = require("../../assets/images/share.png");
const SavedIcon = require("../../assets/images/saved.png");

const BusinessSingleHeader = ({ business }) => {
  const { IMAGE_BASE_URL, API_BASE_URL } = useContext(AppContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const getImageUrl = (photo) => {
    if (!photo) return null;

    const urlString =
      typeof photo === "string"
        ? photo
        : typeof photo?.url === "string"
        ? photo.url
        : null;

    if (!urlString) return null;

    if (urlString.startsWith("http")) return urlString;

    const cleanPath = urlString.replace(/^\/?uploads\//, "");
    return `${IMAGE_BASE_URL}/uploads/businessImages/${cleanPath}`;
  };

  const logoUrl = getImageUrl(business?.logo);

  // Save business
  const handleSaveBusinessClick = async () => {
    if (!business?.businessId?._id) {
      Alert.alert("Error", "Business not found.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Please login first.");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/user/saved-businesses`,
        { businessId: business.businessId._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Business saved successfully.",
      });
    } catch (error) {
      console.log("Save business failed:", error?.response || error);

      if (error?.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert(
          "Error",
          "Network error. Please check your internet connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      {logoUrl ? (
        <Image source={{ uri: logoUrl }} style={styles.mainImage} />
      ) : (
        <View style={[styles.mainImage, { backgroundColor: "#ccc" }]} />
      )}

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.circleIcon}
          onPress={() => navigation.goBack()}
        >
          <Image source={BackIcon} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.circleIcon}>
            <Image source={HeartIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIcon}>
            <Image source={ShareIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleIcon}
            onPress={handleSaveBusinessClick}
            disabled={loading}
          >
            <Image source={SavedIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: "#FF8C00" }]}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: "#00B761" }]}>
          <Text style={styles.badgeText}>Verified</Text>
        </View>
      </View>
    </View>
  );
};

export default BusinessSingleHeader;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 240,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topBar: {
    position: "absolute",
    top: 15,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightIcons: {
    flexDirection: "row",
  },
  circleIcon: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  badgeContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
