import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../../context/AppContext";

const ProductCard = () => {
  const { businessProducts } = useContext(AppContext);
  const navigation = useNavigation();

  const onEdit = () => {
    navigation.navigate("AddProductScreen");
  };

  // 🌀 Loader
  if (!businessProducts) {
    return (
      <View style={[styles.card, { alignItems: "center", paddingVertical: 30 }]}>
        <ActivityIndicator size="small" color="#0056ff" />
        <Text style={{ marginTop: 8, color: "#555" }}>Loading products...</Text>
      </View>
    );
  }

  // 📦 Extract product list
  const productList = businessProducts?.products || [];

  const renderItem = ({ item }) => (
    <View style={styles.productRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.productName}>{item.productName}</Text>
        {item.shortDescription ? (
          <Text style={styles.shortDesc}>{item.shortDescription}</Text>
        ) : null}
      </View>
      <Text style={styles.productPrice}>
        {/* {item.pricing > 0 ? `₹${item.pricing}` : "—"} */}
      </Text>
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity onPress={onEdit}>
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      {productList.length > 0 ? (
        <FlatList
          data={productList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.value}>No products added yet.</Text>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  editIcon: { width: 18, height: 18, tintColor: "#0056ff" },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  productName: { color: "#000", fontSize: 15, fontWeight: "500" },
  shortDesc: { color: "#666", fontSize: 13, marginTop: 2 },
  productPrice: { color: "#0056ff", fontSize: 14, fontWeight: "600" },
  separator: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginVertical: 4,
  },
  value: {
    color: "#666",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 10,
  },
});
