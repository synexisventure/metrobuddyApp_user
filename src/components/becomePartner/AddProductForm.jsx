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
import { AppContext } from "../../context/AppContext";

const AddProductForm = ({ onNext = ()=>{} }) => {
  const { API_BASE_URL, IMAGE_BASE_URL, handleApiError, businessProducts, fetchBusinessProducts, loadingBusinessProducts } = useContext(AppContext);

  const [products, setProducts] = useState([
    {
      name: "",
      shortDesc: "",
      pricing: "",
      specification: "",
      fullDesc: "",
      tag: "",
      logo: [],
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
        pricing: p.pricing || "",
        specification: p.specification || "",
        fullDesc: p.fullDescription || "",
        tag: p.tags?.[0] || "",
        // logo: Array.isArray(p.images)
        //   ? p.images.map((img) => ({
        //     uri: `${IMAGE_BASE_URL}/uploads/products/${img.url}`,
        //     name: img.url?.split("/").pop() || `existing_${Date.now()}.jpg`,
        //     type: "image/jpeg",
        //   }))
        //   : [],
        logo: Array.isArray(p.images)
          ? p.images.map((img, i) => {
            // console.log(
            //   `Product: ${p.productName || "(no name)"} | Image ${i + 1}:`,
            //   img,
            //   `${IMAGE_BASE_URL}/uploads/products/${img.url}`
            // );

            return {
              uri: img.url?.startsWith("http")
                ? img.url
                : `${IMAGE_BASE_URL}/uploads/products/${img.url}`,
              name: img.url?.split("/").pop() || `existing_${Date.now()}.jpg`,
              type: "image/jpeg",
            };
          })
          : [],

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
    } finally {
      setModalVisible(false);
    }
  };

  const saveFile = (file) => {
    if (!file?.uri || activeIndex === null) return;
    const updated = [...products];
    // updated[activeIndex].logo = {
    //   uri: file.uri,
    //   name: file.fileName || `product_${activeIndex}.jpg`,
    //   type: file.type || "image/jpeg",
    // };
    const newImage = {
      uri: file.uri,
      name: file.fileName || `product_${activeIndex}_${Date.now()}.jpg`,
      type: file.type || "image/jpeg",
    };
    updated[activeIndex].logo = [...(updated[activeIndex].logo || []), newImage];
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
        logo: [],
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


  //  Submit products to backend
  const handleSaveAndContinue = async () => {
    try {
      if (!businessId) {
        Alert.alert("Error", "Business or User ID not found");
        return;
      }

      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const validProducts = products
        .filter((p) => p.name.trim())
        .map((p) => ({
          productName: p.name,
          shortDescription: p.shortDesc,
          // pricing: p.pricing,
          pricing: Number(p.pricing) || 0,
          specification: p.specification,
          fullDescription: p.fullDesc,
          tags: p.tag ? [p.tag] : [],
        }));

      // 🧩 Validate all required fields before submitting
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (
          !p.name.trim() ||
          !p.shortDesc.trim() ||
          !p.pricing.trim() ||
          !p.specification.trim() ||
          !p.fullDesc.trim()
        ) {
          Alert.alert(
            "Validation Error",
            `Please fill all fields for Product ${i + 1}.`
          );
          return;
        }
      }

      const formData = new FormData();
      formData.append("businessId", businessId);
      formData.append("products", JSON.stringify(validProducts));

      validProducts.forEach((p, i) => {
        if (products[i].logo?.length) {
          products[i].logo.forEach((img, j) => {
            formData.append(`images_${i}_${j}`, {
              uri: img.uri,
              name: img.name,
              type: img.type,
            });
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

      console.log("resp add prod : ", res);
      Alert.alert("Success", res.data.message || "Products saved!");
      onNext && onNext();

      fetchBusinessProducts();

    } catch (error) {
      const msg = handleApiError(error, "Failed to save products");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateProducts = async () => {
    try {
      if (!businessId) {
        Alert.alert("Error", "Business ID not found");
        return;
      }

      // 🧩 Validate all required fields before updating
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (
          !p.name?.trim() ||
          !p.shortDesc?.trim() ||
          !p.pricing?.trim() ||
          !p.specification?.trim() ||
          !p.fullDesc?.trim()
        ) {
          Alert.alert(
            "Validation Error",
            `Please fill all fields for Product ${i + 1}.`
          );
          return;
        }
      }

      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

      // ✅ Only send products you actually want to keep
      const activeProducts = products.filter(
        (p) => p.productName || p.name // skip empty rows
      );

      console.log("my active products : ", activeProducts);

      const formattedProducts = activeProducts.map((p, i) => {
        const keepImages = p.logo
          ?.filter((img) => img.uri.startsWith("http"))
          .map((img) => img.uri);

        p.logo
          ?.filter((img) => !img.uri.startsWith("http"))
          .forEach((img, j) => {
            formData.append(`images_${i}_${j}`, {
              uri: img.uri,
              name: img.name || `image_${i}_${j}.jpg`,
              type: img.type || "image/jpeg",
            });
          });

        return {
          // _id: p._id || null,
          index: i,
          productName: p.name,
          shortDescription: p.shortDesc,
          fullDescription: p.fullDesc,
          specification: p.specification,
          // pricing: p.pricing || 0,
          pricing: p.pricing && !isNaN(p.pricing) ? Number(p.pricing) : 0,
          tags: p.tag ? [p.tag] : [],
          keepImages: keepImages || [],
        };
      });

      formData.append("products", JSON.stringify(formattedProducts));

      const res = await axios.put(
        `${API_BASE_URL}/user/partner_forms/business_products/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", res.data);
      Alert.alert("Success", res.data.message || "Products updated successfully!");
      fetchBusinessProducts();
      onNext && onNext();
    } catch (error) {
      const msg = handleApiError(error, "Failed to update products");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingBusinessProducts) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#155DFC" />
        <Text style={styles.loaderText}>Loading business details...</Text>
      </View>
    );
  }

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
              {/* {product.logo ? (
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
              )} */}
              <Image
                source={require("../../assets/images/uploadIcon.png")}
                style={styles.uploadIcon}
              />
              <Text style={styles.uploadText}>Choose Photo</Text>
            </TouchableOpacity>

            {product.logo?.length > 0 && (
              <View style={styles.imagePreviewContainer}>
                {product.logo.map((img, i) => (
                  <View key={i} style={styles.imageWrapper}>
                    <Image source={{ uri: img.uri }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => {
                        const updated = [...products];
                        updated[index].logo = updated[index].logo.filter((_, x) => x !== i);
                        setProducts(updated);
                      }}
                    >
                      <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}


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
            {/* <TextInput
              placeholder="Enter pricing"
              style={styles.input}
              value={product.pricing}
              onChangeText={(v) => handleChange(index, "pricing", v)}
            /> */}
            <TextInput
              placeholder="Enter pricing"
              style={styles.input}
              keyboardType="numeric"
              value={product.pricing.toString()}
              onChangeText={(v) => {
                // Allow only numbers and decimals
                const cleanValue = v.replace(/[^0-9.]/g, "");
                handleChange(index, "pricing", cleanValue);
              }}
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

        {/* <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.7 }]}
          onPress={handleSaveAndContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save and Continue</Text>
          )}
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.7 }]}
          onPress={() => {
            if (businessProducts?.products?.length > 0) {
              console.log("calling update api ");

              handleUpdateProducts(); //  call PUT API if products already exist
            } else {
              handleSaveAndContinue(); //  call POST API for first-time add
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>
              {businessProducts?.products?.length > 0 ? "Update Products" : "Save and Continue"}
            </Text>
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
    marginTop: 10,
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


  // image previewer
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#ff4444",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },


  // loader and loader text 
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  loaderText: { marginTop: 10, color: "#555" },
});
