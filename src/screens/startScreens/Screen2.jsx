import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Screen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* --- Skip button --- */}
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.skipContainer}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* --- Icon (Profile icon) --- */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Image
            source={require("../../assets/images/team.png")}
            style={styles.icon}
          />
        </View>
      </View>

      {/* --- Image --- */}
      <Image
        source={require("../../assets/images/images2/city.png")}
        style={styles.mainImage}
      />

      {/* --- Text section --- */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Trusted Reviews & Verified Listings</Text>
        <Text style={styles.subtitle}>
          Get honest feedback from real customers and connect with verified businesses you can trust.
        </Text>
      </View>

      {/* --- Dots --- */}
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      {/* --- Next button --- */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("Screen3")}
      >
        <Text style={styles.nextText}>Next  ›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen2;

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
    backgroundColor: "#B91C1C",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
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
    backgroundColor: "#B91C1C",
  },
  nextButton: {
    backgroundColor: "#B91C1C",
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
