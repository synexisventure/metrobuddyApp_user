import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { pick, types } from "@react-native-documents/picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { requestCameraPermission, requestGalleryPermission } from "../../utils/permissions";
import FilePickerModal from "../../components/filePicker/FilePickerModal";
import { useNavigation } from "@react-navigation/native";

const Step7Form = ({ onSubmit }) => {
  const navigation = useNavigation();
  const { API_BASE_URL, handleApiError } = useContext(AppContext);

  const [docs, setDocs] = useState({
    msmeCertificate: null,
    cinCertificate: null,
    gstinCertificate: null,
    fssaiCertificate: null,
  });
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  //  Show modal and store active doc key
  const openPickerModal = (key) => {
    setActiveKey(key);
    setPickerVisible(true);
  };

  // selection logic
  const handleSelect = async (id) => {
    try {
      if (!activeKey) return;

      if (id === "camera") {
        const granted = await requestCameraPermission();
        if (!granted) return;
        const res = await launchCamera({ mediaType: "photo" });
        if (res?.assets?.length) {
          const asset = res.assets[0];
          setDocs((prev) => ({
            ...prev,
            [activeKey]: {
              uri: asset.uri,
              name: asset.fileName || "camera_image.jpg",
              type: asset.type || "image/jpeg",
            },
          }));
        }
      }

      if (id === "gallery") {
        const granted = await requestGalleryPermission();
        if (!granted) return;
        const res = await launchImageLibrary({ mediaType: "photo" });
        if (res?.assets?.length) {
          const asset = res.assets[0];
          setDocs((prev) => ({
            ...prev,
            [activeKey]: {
              uri: asset.uri,
              name: asset.fileName || "gallery_image.jpg",
              type: asset.type || "image/jpeg",
            },
          }));
        }
      }

      if (id === "pdf") {
        try {
          const [res] = await pick({ type: [types.pdf] });
          if (res) {
            setDocs((prev) => ({
              ...prev,
              [activeKey]: {
                uri: res.uri,
                name: res.name,
                type: res.type || "application/pdf",
              },
            }));
          }
        } catch (err) {
          if (err.message !== "User canceled document picker") {
            Alert.alert("Error", "Failed to pick file");
            console.log("Document Picker Error:", err);
          }
        }
      }
    } catch (error) {
      console.log("Picker select error:", error);
    }
  };

  //  Submit documents to backend
  const handleSubmit = async () => {
    try {
      const businessId = await AsyncStorage.getItem("businessId");
      const token = await AsyncStorage.getItem("token");

      if (!businessId) {
        Alert.alert("Error", "Business ID not found.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("businessId", businessId);

      Object.keys(docs).forEach((key) => {
        if (docs[key]) {
          formData.append(key, {
            uri: docs[key].uri,
            name: docs[key].name,
            type: docs[key].type,
          });
        }
      });

      const res = await axios.post(
        `${API_BASE_URL}/user/partner_forms/document_upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      ); 

        Alert.alert("✅ Success", "Documents uploaded successfully!");
        onSubmit && onSubmit();
      
        navigation.navigate("SubscriptionScreen");

    } catch (error) {
      const msg = handleApiError(error, "Failed to upload documents");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false); 
    }
  };

  // 📦 Reusable file box
  const renderUploadBox = (label, key) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={() => openPickerModal(key)}>
        {docs[key] ? (
          <View style={styles.filePreview}>
            <Image
              source={
                docs[key].type.includes("pdf")
                  ? require("../../assets/images/uploadIcon.png")
                  : require("../../assets/images/uploadIcon.png")
              }
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText} numberOfLines={1}>
              {docs[key].name}
            </Text>
          </View>
        ) : (
          <>
            <Image
              source={require("../../assets/images/uploadIcon.png")}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadText}>Choose File</Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>Verification Documents</Text>
        <Text style={styles.subtitle}>
          Upload documents to verify your business
        </Text>

        <View style={styles.secureCard}>
          <View style={styles.secureHeader}>
            <Image
              source={require("../../assets/images/security.png")}
              style={styles.secureIcon}
            />
            <Text style={styles.secureTitle}>Secure Upload</Text>
          </View>
          <Text style={styles.secureText}>
            Your documents are encrypted and secure.
          </Text>
        </View>

        {renderUploadBox("MSME Certificate", "msmeCertificate")}
        {renderUploadBox("CIN Certificate", "cinCertificate")}
        {renderUploadBox("GSTIN Certificate", "gstinCertificate")}
        {renderUploadBox("FSSAI License (Optional)", "fssaiCertificate")}

        <View style={styles.guidelinesBox}>
          <Text style={styles.guidelineTitle}>Document Guidelines</Text>
          <Text style={styles.guidelineItem}>• Clear and readable scans only</Text>
          <Text style={styles.guidelineItem}>• Supported: JPG, PNG, PDF</Text>
          <Text style={styles.guidelineItem}>• Max 5 MB per document</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Registration</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* 📂 Modal Integration */}
      <FilePickerModal
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={handleSelect}
        options={[
          { id: "camera", label: "Camera",   },
          { id: "gallery", label: "Gallery",  },
          { id: "pdf", label: "Pick PDF",  },
        ]} 
      />
    </>
  );
};

export default Step7Form;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 18, fontWeight: "600", color: "#000", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#555", marginBottom: 20 },
  secureCard: {
    backgroundColor: "#fff8e5",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#f8e3b0",
    marginBottom: 25,
  },
  secureHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  secureIcon: { width: 20, height: 20, marginRight: 6, tintColor: "#ffb100" },
  secureTitle: { fontSize: 14, fontWeight: "600", color: "#ffb100" },
  secureText: { fontSize: 13, color: "#000", lineHeight: 18 },
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 6 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  uploadIcon: { width: 20, height: 20, tintColor: "#555", marginRight: 8 },
  uploadText: { color: "#0056ff", fontSize: 14, fontWeight: "500", flex: 1 },
  filePreview: { flexDirection: "row", alignItems: "center", flex: 1 },
  guidelinesBox: {
    backgroundColor: "#f5f7fb",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e1e5ec",
    marginTop: 15,
    marginBottom: 25,
  },
  guidelineTitle: { fontSize: 13, fontWeight: "600", color: "#000", marginBottom: 8 },
  guidelineItem: { fontSize: 12, color: "#555", marginBottom: 3 },
  submitBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
