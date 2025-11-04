import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppContext } from "../../context/AppContext"; // ✅ import context

const BusinessDetailsCard = () => {

  const navigation = useNavigation();
  const { businessDetails } = useContext(AppContext); // ✅ get data from context

  const onEdit = () => {
    navigation.navigate("BusinessdetailsScreen");
  };

  // ✅ fallback if no data
  if (!businessDetails) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Business Details</Text>
        <Text style={{ color: "#999", marginTop: 5 }}>No data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Details</Text>
        <TouchableOpacity onPress={onEdit}>
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Business Id</Text>
      <Text style={styles.value}>{businessDetails.businessId || "—"}</Text>

      <Text style={styles.label}>Business Name</Text>
      <Text style={styles.value}>{businessDetails.businessName || "—"}</Text>

      <Text style={styles.label}>Address</Text>
      <Text style={styles.value}>
        {businessDetails.address
          ? `${businessDetails.address.plotNo || ""}, ${businessDetails.address.street || ""}, ${businessDetails.address.city || ""}`
          : "—"}
      </Text>

      <Text style={styles.label}>Pincode</Text>
      <Text style={styles.value}>{businessDetails.address?.pincode || "—"}</Text>
    </View>
  );
};

export default BusinessDetailsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  editIcon: { width: 18, height: 18, tintColor: "#0056ff" },
  label: { fontSize: 12, color: "#666", marginTop: 6 },
  value: { fontSize: 14, fontWeight: "500", color: "#000" },
});
