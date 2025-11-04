import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const HeaderCard = ({ name = "My Business",   }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.infoBox}>
        <Image
          source={require("../../assets/images/leads.png")}
          style={styles.businessIcon}
        />
        <View>
          <Text style={styles.businessName}>Manage Your Business</Text>
          <Text style={styles.ownerText}>{name}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bellBox}  >
        <Image
          source={require("../../assets/images/bell.png")}
          style={styles.bellIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0056ff",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  infoBox: { flexDirection: "row", alignItems: "center" },
  businessIcon: { width: 45, height: 45, marginRight: 10, tintColor: "#fff" },
  businessName: { fontSize: 18, fontWeight: "700", color: "#fff" },
  ownerText: { fontSize: 13, color: "#e1e1e1" },
  bellBox: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff20",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: { width: 22, height: 22, tintColor: "#fff" },
});
