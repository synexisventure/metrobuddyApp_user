import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileCounts = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.number}>28</Text>
        <Text style={styles.label}>Reviews</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>12</Text>
        <Text style={styles.label}>Saved</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>156</Text>
        <Text style={styles.label}>Points</Text>
      </View>
    </View>
  );
};

export default ProfileCounts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", 
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingVertical: 18,
  },
  number: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: "#6B7280",
  },
});
