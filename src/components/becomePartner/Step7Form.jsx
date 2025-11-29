import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking
} from "react-native";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { pick, types } from "@react-native-documents/picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { requestCameraPermission, requestGalleryPermission } from "../../utils/permissions";
import FilePickerModal from "../../components/filePicker/FilePickerModal";
import { useNavigation } from "@react-navigation/native";

const Step7Form = ({ onSubmit = () => { } }) => {
  const navigation = useNavigation();
  const { API_BASE_URL, IMAGE_BASE_URL, handleApiError, businessDocuments, fetchBusinessDocuments } = useContext(AppContext);

  const [docs, setDocs] = useState({
    msmeCertificate: null,
    cinCertificate: null,
    gstinCertificate: null,
    fssaiCertificate: null,
  });
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    if (businessDocuments) {
      const getFileType = (filename) => {
        if (!filename) return "unknown";
        const ext = filename.split('.').pop().toLowerCase();
        if (ext === "pdf") return "application/pdf";
        if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
        if (ext === "png") return "image/png";
        return "unknown";
      };

      setDocs(prev => ({
        ...prev,
        msmeCertificate: businessDocuments.msmeCertificate?.trim()
          ? {
            name: businessDocuments.msmeCertificate,
            uploaded: true,
            type: getFileType(businessDocuments.msmeCertificate),
            uri: `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.msmeCertificate}`
          }
          : prev.msmeCertificate,
        cinCertificate: businessDocuments.cinCertificate?.trim()
          ? {
            name: businessDocuments.cinCertificate,
            uploaded: true,
            type: getFileType(businessDocuments.cinCertificate),
            uri: `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.cinCertificate}`
          }
          : prev.cinCertificate,
        gstinCertificate: businessDocuments.gstinCertificate?.trim()
          ? {
            name: businessDocuments.gstinCertificate,
            uploaded: true,
            type: getFileType(businessDocuments.gstinCertificate),
            uri: `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.gstinCertificate}`
          }
          : prev.gstinCertificate,
        fssaiCertificate: businessDocuments.fssaiCertificate?.trim()
          ? {
            name: businessDocuments.fssaiCertificate,
            uploaded: true,
            type: getFileType(businessDocuments.fssaiCertificate),
            uri: `${IMAGE_BASE_URL}/uploads/businessDocuments/${businessDocuments.fssaiCertificate}`
          }
          : prev.fssaiCertificate,
      }));
    }
  }, [businessDocuments]);

  // Document list for card view
  const documents = [
    {
      id: 1,
      name: 'MSME Certificate',
      key: 'msmeCertificate',
      uploaded: !!docs.msmeCertificate,
      file: docs.msmeCertificate,
    },
    {
      id: 2,
      name: 'CIN Certificate',
      key: 'cinCertificate',
      uploaded: !!docs.cinCertificate,
      file: docs.cinCertificate,
    },
    {
      id: 3,
      name: 'GSTIN Certificate',
      key: 'gstinCertificate',
      uploaded: !!docs.gstinCertificate,
      file: docs.gstinCertificate,
    },
    {
      id: 4,
      name: 'FSSAI Certificate',
      key: 'fssaiCertificate',
      uploaded: !!docs.fssaiCertificate,
      file: docs.fssaiCertificate,
    },
  ];

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

  // View document function
  const handleViewDocument = async (file) => {
    console.log('Viewing file:', file); // ✅ Debug ke liye

    if (!file?.uri) {
      Alert.alert('Error', 'File URI not found');
      return;
    }

    try {
      const isPdf = file.type.includes('pdf');
      console.log('File URI:', file.uri); // ✅ URI check karo

      const supported = await Linking.canOpenURL(file.uri);
      if (supported) {
        await Linking.openURL(file.uri);
      } else {
        Alert.alert('Error', 'No app available to open this file');
      }
    } catch (error) {
      console.log('Error opening document:', error);
      Alert.alert('Error', 'Could not open document: ' + error.message);
    }
  };

  //  Submit documents to backend
  // const handleSubmit = async () => {
  //   try {
  //     const businessId = await AsyncStorage.getItem("businessId");
  //     const token = await AsyncStorage.getItem("token");

  //     if (!businessId) {
  //       Alert.alert("Error", "Business ID not found.");
  //       return;
  //     }

  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("businessId", businessId);

  //     Object.keys(docs).forEach((key) => {
  //       if (docs[key]) {
  //         formData.append(key, {
  //           uri: docs[key].uri,
  //           name: docs[key].name,
  //           type: docs[key].type,
  //         });
  //       }
  //     });

  //     const res = await axios.post(
  //       `${API_BASE_URL}/user/partner_forms/document_upload`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     Alert.alert("✅ Success", "Documents uploaded successfully!");
  //     fetchBusinessDocuments();
  //     onSubmit && onSubmit();

  //     navigation.navigate("SubscriptionScreen");

  //   } catch (error) {
  //     const msg = handleApiError(error, "Failed to upload documents");
  //     Alert.alert("Error", msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //  Submit documents to backend  
  const handleSubmit = async () => {
    try {
      const businessId = await AsyncStorage.getItem("businessId");
      const token = await AsyncStorage.getItem("token");

      setLoading(true);

      const formData = new FormData();

      const putBusinessId = businessDocuments?.businessId;

      // if (putBusinessId) {
      //   formData.append("businessId", putBusinessId);
      // }

      if (!businessId || !businessDocuments?.businessId) {
        Alert.alert("Error", "Business ID not found.");
        return;
      }

      let hasNewFiles = false;

      Object.keys(docs).forEach((key) => {
        if (docs[key] && docs[key].uri && !docs[key].uri.startsWith("http")) {
          hasNewFiles = true;
          formData.append(key, {
            uri: docs[key].uri,
            name: docs[key].name,
            type: docs[key].type,
          });
        }
      });

      if (!hasNewFiles) {
        Alert.alert("Info", "No new documents to upload.");
        setLoading(false);
        return;
      }

      // ✅ Sirf businessDocuments.businessId se check karo
      const isEditing = !!putBusinessId;

      let url, method;

      if (isEditing) {
        // PUT call
        url = `${API_BASE_URL}/user/partner_forms/document_upload/${putBusinessId}`;
        method = 'put';
      } else {
        // POST call
        url = `${API_BASE_URL}/user/partner_forms/document_upload`;
        method = 'post';
      }

      console.log(`${method.toUpperCase()} call to:`, url);
      console.log("putBusinessId:", putBusinessId);
      console.log("isEditing:", isEditing);

      const res = await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert(
        "Success",
        isEditing ? "Documents updated successfully!" : "Documents submitted successfully!"
      );

      fetchBusinessDocuments();
      onSubmit();
      navigation.navigate("SubscriptionScreen");

    } catch (error) {
      console.log("Upload docs failed:", error?.response);

      if (error?.response) {
        showToast("error", "Error", error?.response?.data?.message);
      } else if (!error?.response) {
        showToast("error", "Error", "Network error. Please check your internet connection.");
      } else {
        showToast("error", "Error", "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Document card component
  const renderDocumentCard = (doc) => (
    <View key={doc.id} style={styles.documentCard}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{doc.name}</Text>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot,
            doc.uploaded ? styles.uploadedDot : styles.notUploadedDot
          ]} />
          <Text style={[
            styles.statusText,
            doc.uploaded ? styles.uploadedText : styles.notUploadedText
          ]}>
            {doc.uploaded ? 'Uploaded' : 'Not Uploaded'}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {doc.uploaded && (
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewDocument(doc.file)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => openPickerModal(doc.key)}
        >
          <Text style={styles.uploadButtonText}>
            {doc.uploaded ? 'Re-upload' : 'Upload'}
          </Text>
        </TouchableOpacity>

        {/* {doc.uploaded && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteDocument(doc.key)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
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

        {/* Documents List */}
        <View style={styles.documentsContainer}>
          {documents.map(renderDocumentCard)}
        </View>

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
          { id: "camera", label: "Camera", },
          { id: "gallery", label: "Gallery", },
          { id: "pdf", label: "Pick PDF", },
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

  // Documents List Styles
  documentsContainer: {
    marginBottom: 20,
  },
  documentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  uploadedDot: {
    backgroundColor: '#34C759',
  },
  notUploadedDot: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  uploadedText: {
    color: '#34C759',
  },
  notUploadedText: {
    color: '#FF3B30',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#155DFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

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