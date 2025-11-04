import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";

const CategoryCard = () => {
  const navigation = useNavigation();
  const {
    businessCategory,
    businessGlobalCategory,
    fetchBusinessGlobalCategory,
    API_BASE_URL,
  } = useContext(AppContext);

  const [subNames, setSubNames] = useState([]);
  const [loading, setLoading] = useState(false);

  // Navigate to edit
  const onEdit = () => {
    navigation.navigate("BusinessCategoryScreen");
  };

  // Fetch categories if not available
  useEffect(() => {
    if (!businessGlobalCategory || businessGlobalCategory.length === 0) {
      fetchBusinessGlobalCategory();
    }
  }, []);

  // Fetch selected subcategory names
  useEffect(() => {
    const fetchSubs = async () => {
      if (!businessCategory?.categoryId) return;
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/user/categories/get-subcategories?categoryId=${businessCategory.categoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data?.data) {
          const matched = res.data.data
            .filter((s) => businessCategory.subCategories.includes(s._id))
            .map((s) => s.name);
          setSubNames(matched);
        }
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, [businessCategory]);

  const mainCatName =
    businessGlobalCategory?.find(
      (cat) => cat._id === businessCategory?.categoryId
    )?.name || "Unknown Category";

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          
          <Text style={styles.title}>Business Category</Text>
        </View>
        <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          /> 
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loader}>
          {/* <ActivityIndicator color="#155DFC" /> */}
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      ) : businessCategory ? (
        <View>
          {/* Main Category */}
          <View style={styles.mainCategoryBox}>
            <Text style={styles.mainCategoryName}>{mainCatName}</Text>
          </View>

          {/* Subcategories */}
          {subNames.length > 0 ? (
            <View style={styles.subCategoryContainer}>
              {subNames.map((name, idx) => (
                <View key={idx} style={styles.subChip}>
                  <Text style={styles.subChipText}>{name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noSub}>No subcategories selected</Text>
          )}
        </View>
      ) : (
        <Text style={styles.value}>No category selected.</Text>
      )}
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e9ecf3",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: "#0056ff",
    marginRight: 6,
  },
  title: { fontSize: 16, color: "#000" },
  editBtn: { flexDirection: "row", alignItems: "center" },
  editIcon: { width: 16, height: 16, tintColor: "#0056ff", marginRight: 4 },
  editText: { color: "#0056ff", fontSize: 13, fontWeight: "500" },

  // Main Category
  mainCategoryBox: {
    backgroundColor: "#f1f5ff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  mainCategoryName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0056ff",
  },

  // Subcategories
  subCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  subChip: {
    backgroundColor: "#f3f5f9",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  subChipText: { color: "#333", fontSize: 13, fontWeight: "500" },
  noSub: {
    fontSize: 13,
    color: "#777",
    marginLeft: 2,
    marginTop: 2,
  },

  loader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loaderText: {
    marginTop: 6,
    fontSize: 13,
    color: "#777",
  },
  value: { fontSize: 14, color: "#000" },
});
