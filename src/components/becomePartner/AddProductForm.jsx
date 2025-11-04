import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import FilePickerModal from "../../components/filePicker/FilePickerModal";
import { requestCameraPermission, requestGalleryPermission } from "../../utils/permissions";
import { AppContext , IMAGE_BASE_URL} from "../../context/AppContext";

const AddProductForm = ({ onNext }) => {
  const { API_BASE_URL, handleApiError, businessProducts, fetchBusinessProducts } = useContext(AppContext);

  const [products, setProducts] = useState([
    {
      name: "",
      shortDesc: "",
      pricing: "",
      specification: "",
      fullDesc: "",
      tag: "",
      logo: null,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [userId, setUserId] = useState(null);

  // 🧩 Load IDs
  useEffect(() => {
    const loadData = async () => {
      const bId = await AsyncStorage.getItem("businessId");
      const uId = await AsyncStorage.getItem("userId");
      if (bId) setBusinessId(bId);
      if (uId) setUserId(uId);
    };
    loadData();
  }, []);

  // 🧩 Pre-fill products if businessProducts exist
  useEffect(() => {
    if (businessProducts?.products?.length) {
      const mapped = businessProducts.products.map((p) => ({
        name: p.productName || "",
        shortDesc: p.shortDescription || "",
        pricing: String(p.pricing || ""),
        specification: p.specification || "",
        fullDesc: p.fullDescription || "",
        tag: p.tags?.[0] || "",
        logo: p.images?.[0]
          ? { uri: `${IMAGE_BASE_URL}/uploads/products/${p.images[0]}` } // ✅ show existing image
          : null,
    }));
  setProducts(mapped);
}
  }, [businessProducts]);

useEffect(() => {
  if (businessId) {
    fetchBusinessProducts(); // pulls from API into context
  }
}, [businessId]);

// 🧩 Open modal for product index
const handleUploadPress = (index) => {
  setActiveIndex(index);
  setModalVisible(true);
};

// 📂 File selection logic (Camera or Gallery)
const handleSelect = async (type) => {
  try {
    if (type === "camera") {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Camera access is required.");
        return;
      }

      const result = await launchCamera({ mediaType: "photo", quality: 0.8 });
      if (result.assets?.length) saveFile(result.assets[0]);
    } else if (type === "gallery") {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Gallery access is required.");
        return;
      }

      const result = await launchImageLibrary({ mediaType: "photo", quality: 0.8 });
      if (result.assets?.length) saveFile(result.assets[0]);
    }
  } catch (err) {
    console.log("Picker Error:", err);
    Alert.alert("Error", "Failed to pick file");
  }
};

const saveFile = (file) => {
  if (activeIndex === null) return;
  const updated = [...products];
  updated[activeIndex].logo = {
    uri: file.uri,
    name: file.fileName || `product_${activeIndex}.jpg`,
    type: file.type || "image/jpeg",
  };
  setProducts(updated);
};

// 🧩 Handle add new product
const handleAddProduct = () => {
  setProducts([
    ...products,
    {
      name: "",
      shortDesc: "",
      pricing: "",
      specification: "",
      fullDesc: "",
      tag: "",
      logo: null,
    },
  ]);
};

// 🧩 Handle input changes
const handleChange = (index, field, value) => {
  const updated = [...products];
  updated[index][field] = value;
  setProducts(updated);
};

// 🧩 Handle remove product
const handleRemoveProduct = (index) => {
  if (products.length === 1) {
    Alert.alert("Note", "You must have at least one product.");
    return;
  }
  const updated = products.filter((_, i) => i !== index);
  setProducts(updated);
};


// 🧾 Submit products to backend
const handleSaveAndContinue = async () => {
  try {
    if (!businessId) {
      Alert.alert("Error", "Business or User ID not found");
      return;
    }

    // const validProducts = products.filter((p) => p.name.trim());
    // if (validProducts.length === 0) {
    //   Alert.alert("Validation", "Please add at least one product with name");
    //   return;
    // }

    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    // const formData = new FormData();

    // formData.append("buinessId", businessId); 
    // formData.append("products", JSON.stringify(validProducts));

    // validProducts.forEach((p, i) => {
    //   if (p.logo) {
    //     formData.append(`images_${i}`, {
    //       uri: p.logo.uri,
    //       name: p.logo.name,
    //       type: p.logo.type,
    //     });
    //   }
    // });

    const validProducts = products
      .filter((p) => p.name.trim())
      .map((p) => ({
        productName: p.name,
        shortDescription: p.shortDesc,
        pricing: Number(p.pricing) || 0,
        specification: p.specification,
        fullDescription: p.fullDesc,
        tags: p.tag ? [p.tag] : [],
      }));

    const formData = new FormData();
    formData.append("businessId", businessId);
    formData.append("products", JSON.stringify(validProducts));

    validProducts.forEach((p, i) => {
      if (p.logo) {
        formData.append(`images_${i}`, {
          uri: p.logo.uri,
          name: p.logo.name,
          type: p.logo.type,
        });
      }
    });




    const res = await axios.post(
      `${API_BASE_URL}/user/partner_forms/business_product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data?.success) {
      Alert.alert("Success", res.data.message || "Products saved!");
      onNext && onNext();
    } else {
      Alert.alert("Error", "Something went wrong while saving products.");
    }
  } catch (error) {
    const msg = handleApiError(error, "Failed to save products");
    Alert.alert("Error", msg);
  } finally {
    setLoading(false);
  }
};

return (
  <View style={{ flex: 1 }}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {products.map((product, index) => (
        // <View key={index} style={styles.card}>
        //   <Text style={styles.cardTitle}>Product {index + 1}</Text>

        <View key={index} style={styles.card}>

          {/* ❌ Remove Icon (top-right) */}
          {products.length > 1 && (
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10,
              }}
            >
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemoveProduct(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.removeText}>❌</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.cardTitle}>Product {index + 1}</Text>



          {/* Upload Box */}
          <Text style={styles.label}>Product Logo</Text>
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => handleUploadPress(index)}
          >
            {product.logo ? (
              <Image
                source={{ uri: product.logo.uri }}
                style={styles.preview}
              />
            ) : (
              <>
                <Image
                  source={require("../../assets/images/uploadIcon.png")}
                  style={styles.uploadIcon}
                />
                <Text style={styles.uploadText}>Choose Photo</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Inputs */}
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            placeholder="Enter product name"
            style={styles.input}
            value={product.name}
            onChangeText={(v) => handleChange(index, "name", v)}
          />

          <Text style={styles.label}>Short Description</Text>
          <TextInput
            placeholder="Enter short description"
            style={styles.input}
            value={product.shortDesc}
            onChangeText={(v) => handleChange(index, "shortDesc", v)}
          />

          <Text style={styles.label}>Pricing</Text>
          <TextInput
            placeholder="Enter pricing"
            style={styles.input}
            value={product.pricing}
            onChangeText={(v) => handleChange(index, "pricing", v)}
          />

          <Text style={styles.label}>Specification</Text>
          <TextInput
            placeholder="e.g., Size, Material, Color"
            style={styles.input}
            value={product.specification}
            onChangeText={(v) => handleChange(index, "specification", v)}
          />

          <Text style={styles.label}>Full Description</Text>
          <TextInput
            placeholder="Detailed product description"
            multiline
            style={[styles.input, styles.textArea]}
            value={product.fullDesc}
            onChangeText={(v) => handleChange(index, "fullDesc", v)}
          />

          <Text style={styles.label}>Tag (optional)</Text>
          <TextInput
            placeholder="Enter common name"
            style={styles.input}
            value={product.tag}
            onChangeText={(v) => handleChange(index, "tag", v)}
          />
        </View>
      ))}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={handleAddProduct}
        activeOpacity={0.8}
      >
        <Text style={styles.addText}>＋ Add Another Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveBtn, loading && { opacity: 0.7 }]}
        onPress={handleSaveAndContinue}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save and Continue</Text>
        )}
      </TouchableOpacity>
    </ScrollView>

    {/* 📂 File Picker Modal */}
    <FilePickerModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onSelect={handleSelect}
      options={[
        { id: "camera", label: "Camera" },
        { id: "gallery", label: "Gallery" },
      ]}
    />
  </View>
);
};

export default AddProductForm;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 10 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#000", marginBottom: 12 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginBottom: 14,
  },
  uploadIcon: { width: 28, height: 28, tintColor: "#2563EB", marginBottom: 6 },
  uploadText: { fontSize: 14, color: "#000", fontWeight: "500" },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    fontSize: 13,
    color: "#000",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  addBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    marginTop : 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  addText: { color: "#2563EB", fontWeight: "600", fontSize: 14 },
  saveBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
