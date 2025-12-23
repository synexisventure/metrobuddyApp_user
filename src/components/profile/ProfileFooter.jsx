import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const ProfileFooter = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("isTeamLeader");

      Toast.show({
        type: "success",
        text1: "Logged out",
        text2: "You’ve been logged out successfully.",
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "UserAuth" }],
      });
    } catch (error) {
      console.log("Logout Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to logout. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* --- Divider Line (Above Logout) --- */}
      <View style={styles.divider} />

      {/* --- Logout Row (Left aligned) --- */}
      <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
        <Image
          source={require("../../assets/images/logout.png")}
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* --- Version & Links (Centered) --- */}
      <View style={styles.bottomSection}>
        <Text style={styles.version}>MetroBuddy v2.1.0</Text>
        <View style={styles.linksRow}>
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.linkText}>Terms of Service</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FBFF",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    width: "100%",
    marginBottom: 18,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 22,
  },
  logoutIcon: {
    width: 15,
    height: 15,
    tintColor: "#E53935",
    marginRight: 8,
  },
  logoutText: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomSection: {
    alignItems: "center",
  },
  version: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  linksRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "500",
  },
  dot: {
    color: "#B91C1C",
    marginHorizontal: 5,
  },
});
