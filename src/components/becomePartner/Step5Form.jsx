import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";
import { useFocusEffect } from "@react-navigation/native";

const Step5Form = ({ onNext = ()=>{} }) => {
  const { 
    API_BASE_URL,
    handleApiError,

    fetchBusinessGlobalCategory,
    businessGlobalCategory,

    businessCategory,
    fetchBusinessCategory,
    loadingBusinessCategory,

  } = useContext(AppContext);

  const [categoryId, setCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [availableSubs, setAvailableSubs] = useState([]); // fetched subcategories
  const [saving, setSaving] = useState(false);
  const [businessId, setBusinessId] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  // 🧩 Fetch businessId
  useEffect(() => {
    const loadBusinessId = async () => {
      const savedId = await AsyncStorage.getItem("businessId");
      if (savedId) setBusinessId(savedId);
    };
    loadBusinessId();
  }, []);

  // 🧩 Fetch main categories on screen focus
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        fetchBusinessGlobalCategory();
        await fetchBusinessCategory();
        setLoading(false);
      }
      loadData();
    }, [])
  );


  // selecting category and subcategories if already saved
  // useEffect(() => {
  //   if (businessCategory) {
  //     console.log("Preselecting category:", businessCategory); 
  //     if (businessCategory.categoryId) {
  //       setCategoryId(businessCategory.categoryId._id);
  //     }
  //     if (businessCategory.subCategories) {
  //       setSubCategories(businessCategory.subCategories);
  //     }
  //   }
  // }, [businessCategory]);
  useEffect(() => {
    if (businessCategory) {
      // Send only ID
      setCategoryId(businessCategory.categoryId?._id || "");
      // Map subcategories to IDs
      setSubCategories(
        businessCategory.subCategories?.map(sub => sub._id) || []
      );
    }
  }, [businessCategory]);


  // 🧩 Fetch subcategories when categoryId changes
  useEffect(() => {
    if (!categoryId) {
      setAvailableSubs([]);
      return;
    }
    const fetchSubcategories = async () => {
      try {
        setSubLoading(true);
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/user/categories/get-subcategories?categoryId=${categoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data?.data) {
          setAvailableSubs(res.data.data);
        } else {
          setAvailableSubs([]);
        }
      } catch (error) {
        const msg = handleApiError(error, "Failed to load subcategories");
        console.log("error : ", error?.response);

        Alert.alert("Error", msg);
      } finally {
        setSubLoading(false);
      }
    };
    fetchSubcategories();
  }, [categoryId]);

  // 🧩 Select/Deselect subcategory
  const toggleSubCategory = (subId) => {
    if (subCategories.includes(subId)) {
      setSubCategories(subCategories.filter((id) => id !== subId));
    } else {
      setSubCategories([...subCategories, subId]);
    }
  };

  // 🧩 Save selected category + subcategories
  // const handleSaveAndContinue = async () => {
  //   if (!categoryId) {
  //     Alert.alert("Validation", "Please select a category first.");
  //     return;
  //   }
  //   if (subCategories.length === 0) {
  //     Alert.alert("Validation", "Please select at least one subcategory.");
  //     return;
  //   }

  //   try {
  //     setSaving(true);
  //     const token = await AsyncStorage.getItem("token");

  //     const payload = {
  //       categoryId,
  //       subCategories : subCategories.map(sub => typeof sub === 'object' ? sub._id : sub),
  //       businessId,
  //     };

  //     const res = await axios.post(
  //       `${API_BASE_URL}/user/partner_forms/business_category`,
  //       payload,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (res.data) {
  //       Alert.alert("Success", "Business category saved successfully!");
  //       onNext && onNext();
  //     }
  //   } catch (error) {
  //     const msg = handleApiError(error, "Failed to save business category");
  //     Alert.alert("Error", msg);
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleSaveAndContinue = async () => {
    if (!categoryId) {
      Alert.alert("Validation", "Please select a category first.");
      return;
    }
    if (subCategories.length === 0) {
      Alert.alert("Validation", "Please select at least one subcategory.");
      return;
    }

    try {
      setSaving(true);
      const token = await AsyncStorage.getItem("token");

      const payload = {
        categoryId,
        subCategories: subCategories.map(sub => typeof sub === 'object' ? sub._id : sub),
        businessId,
      };

      let res;
      let isUpdate = false;

      if (businessCategory && businessCategory.businessId) {
        // ✅ Use businessId for PUT
        isUpdate = true;
        res = await axios.put(
          `${API_BASE_URL}/user/partner_forms/business_category/${businessCategory.businessId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ✅ Create new entry with POST
        res = await axios.post(
          `${API_BASE_URL}/user/partner_forms/business_category`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (res.data) {
        Alert.alert(
          "Success",
          isUpdate
            ? "Business category updated successfully!"
            : "Business category saved successfully!"
        );
        onNext && onNext();
        fetchBusinessCategory();
      }
      fetchBusinessCategory();
    } catch (error) {
      const msg = handleApiError(error, "Failed to save business category");
      Alert.alert("Error", msg);
    } finally {
      setSaving(false);
    }
  };


  // if (loading) {
// category and subcategory loading 
  if (loadingBusinessCategory || loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#B91C1C" />
        <Text style={styles.loaderText}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Select Category</Text>
      <Text style={styles.subtitle}>
        Choose your business category and services
      </Text>

      {/* Category Selector */}
      <Text style={styles.label}>Select Business Category</Text>
      <View style={styles.quickContainer}>
        {businessGlobalCategory?.map((cat) => (
          <TouchableOpacity
            key={cat._id}
            style={[
              styles.quickItem,
              categoryId === cat._id && styles.quickSelected,
            ]}
            onPress={() => {
              setCategoryId(cat._id);
              setSubCategories([]);
            }}
          >
            <Text
              style={[
                styles.quickText,
                categoryId === cat._id && styles.quickTextSelected,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subcategories */}
      <Text style={[styles.label, { marginTop: 10 }]}>
        Select Subcategories
      </Text>

      {subLoading  ? (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#B91C1C" />
          <Text style={styles.loaderText}>Loading subcategories...</Text>
        </View>
      ) : availableSubs.length > 0 ? (
        <View style={styles.quickContainer}>
          {availableSubs.map((sub) => (
            <TouchableOpacity
              key={sub._id}
              style={[
                styles.quickItem,
                subCategories.includes(sub._id) && styles.quickSelected,
              ]}
              onPress={() => toggleSubCategory(sub._id)}
            >
              <Text
                style={[
                  styles.quickText,
                  subCategories.includes(sub._id) && styles.quickTextSelected,
                ]}
              >
                {sub.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noDataBox}>
          {/* <Image
            source={require("../../assets/images/emptyBox.png")} // 🔹 optional placeholder image
            style={styles.noDataImg}
            resizeMode="contain"
          /> */}
          <Text style={styles.noDataText}>No subcategories available</Text>
        </View>
      )}

      {/* Save and Continue */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.saveBtn, saving && { opacity: 0.6 }]}
        onPress={handleSaveAndContinue}
        disabled={saving}
      >
        <Text style={styles.saveText}>
          {saving ? "Saving..." : "Save and Continue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step5Form;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 18, fontWeight: "600", color: "#000" },
  subtitle: { fontSize: 13, color: "#555", marginBottom: 20 },
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 8 },
  quickContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  quickItem: {
    backgroundColor: "#f3f5f9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  quickSelected: { backgroundColor: "#0056ff" },
  quickText: { color: "#000", fontSize: 13 },
  quickTextSelected: { color: "#fff" },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", marginBottom : 20 },
  loaderText: { marginTop: 10, color: "#555" },
  noDataBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafc",
    borderRadius: 10,
    paddingVertical: 30,
    marginVertical: 10,
  },
  noDataImg: {
    width: 60,
    height: 60,
    tintColor: "#ccc",
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },
});
