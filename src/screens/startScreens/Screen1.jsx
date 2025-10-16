import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Screen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* --- Skip button --- */}
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.skipContainer}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* --- Icon (Search icon) --- */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.icon}
          />
        </View>
      </View>

      {/* --- Image --- */}
      <Image
        source={require("../../assets/images/images2/city.png")}
        style={styles.mainImage}
      />

      {/* --- Text content --- */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Discover Local Businesses Near You</Text>
        <Text style={styles.subtitle}>
          Find the best restaurants, hotels, spas, and services in your area with verified reviews and ratings.
        </Text>
      </View>

      {/* --- Dots --- */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* --- Next button --- */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("Screen2")}
      >
        <Text style={styles.nextText}>Next  ›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFF",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  skipContainer: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  skipText: {
    color: "#111827",
    fontSize: 13,
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2F6FE8",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "white",
  },
  mainImage: {
    width: 260,
    height: 160,
    borderRadius: 12,
    resizeMode: "cover",
  },
  textSection: {
    alignItems: "center",
    marginTop: 25,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C7D2FE",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2F6FE8",
  },
  nextButton: {
    backgroundColor: "#2F6FE8",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
