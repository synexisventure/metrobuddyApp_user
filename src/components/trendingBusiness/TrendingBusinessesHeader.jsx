import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const TrendingBusinessesHeader = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Left Section: Arrow + Texts */}
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={() => {
          navigation.navigate("MainTabs", { screen: "home" });
          }}
        >
          <Image
            source={require("../../assets/images/backArrow.png")}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Trending Businesses</Text>
          <Text style={styles.subtitle}> Popular businesses</Text>
        </View>
      </View>

      {/* Right Section: Filter Button */}
      <TouchableOpacity style={styles.filterButton}>
        <Image
          source={require("../../assets/images/filter.png")}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TrendingBusinessesHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLeft: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#111",
  },
  title: {
    color: "#111",
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    color: "#6c7a92",
    fontSize: 14,
    marginTop: 2,
    lineHeight: 18,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
