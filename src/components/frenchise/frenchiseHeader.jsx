import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const FranchiseHeader = () => {
  return (
    <LinearGradient
      colors={["#FB2C36", "#E7000B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* --- Limited Time Offer --- */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Limited Time Offer</Text>
      </View>

      {/* --- Heading --- */}
      <Text style={styles.heading}>Start Your MetroBuddy Franchise</Text>

      {/* --- Description --- */}
      <Text style={styles.description}>
        Join India's fastest-growing local business directory and earn ₹2-5L monthly with minimal investment
      </Text>

      {/* --- Investment and ROI --- */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>₹5.5L</Text>
          <Text style={styles.statLabel}>Investment</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>200%</Text>
          <Text style={styles.statLabel}>ROI Potential</Text>
        </View>
      </View>

      {/* --- Apply Button --- */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apply Now →</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default FranchiseHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center", 
  },
  badge: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 15,
  },
  badgeText: {
    color: "#E40000",
    fontSize: 12,
    fontWeight: "600",
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 25,
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 3,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#E40000",
    fontWeight: "700",
    fontSize: 13,
  },
});
