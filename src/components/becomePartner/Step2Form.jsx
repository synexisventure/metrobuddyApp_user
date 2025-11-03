import React, { useContext, useState, useEffect } from "react";
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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from "@react-native-documents/picker";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import FilePickerModal from "../../components/filePicker/FilePickerModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { requestCameraPermission, requestGalleryPermission } from "../../utils/permissions";

const Step2Form = ({ onNext, userId }) => {
  // ✅ Use from context
  const {
    API_BASE_URL,
    IMAGE_BASE_URL,
    businessDetails,
    businessDetailsLoading,
    fetchBusinessDetails,
    handleApiError,
  } = useContext(AppContext);

  // form states
  const [businessName, setBusinessName] = useState("");
  const [pincode, setPincode] = useState("");
  const [plotNo, setPlotNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const resetForm = () => {
    setBusinessName("");
    setPincode("");
    setPlotNo("");
    setStreet("");
    setLandmark("");
    setArea("");
    setCity("");
    setState("");
    setLogo(null);
  };


  // media states
  const [logo, setLogo] = useState(null);

  // modal + misc
  const [modalVisible, setModalVisible] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🧩 On mount, fetch data from context
  useEffect(() => {
    resetForm();
    fetchBusinessDetails();
  }, []);

  //  business id state 
  const [businessId, setBusinessId] = useState(null);
  useEffect(() => {
    const loadBusinessId = async () => {
      if (!businessId) {
        const savedId = await AsyncStorage.getItem("businessId");
        if (savedId) setBusinessId(savedId);
      }
    };
    loadBusinessId();
  }, []);

  // 🧠 When businessDetails from context updates, fill the form
  useEffect(() => {
    if (businessDetails) {
      setBusinessName(businessDetails.businessName || "");
      const address = businessDetails.address || {};
      setPincode(address.pincode || "");
      setPlotNo(address.plotNo || "");
      setStreet(address.street || "");
      setLandmark(address.landmark || "");
      setArea(address.area || "");
      setCity(address.city || "");
      setState(address.state || "");

      if (businessDetails.logo) {
        setLogo({ uri: `${IMAGE_BASE_URL}/uploads/businessImages/${businessDetails.logo}` });
      }
    }
  }, [businessDetails]);

  // 📂 File Picker
  const handleSelect = async (type) => {
    try {
      if (type === "camera") {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          Alert.alert("Permission Denied", "Camera access is required to take photos.");
          return;
        }

        const result = await launchCamera({ mediaType: "photo", quality: 0.8 });
        if (result.assets?.length) saveFile(result.assets[0]);
      }
      else if (type === "gallery") {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) {
          Alert.alert("Permission Denied", "Gallery access is required to choose photos.");
          return;
        }

        const result = await launchImageLibrary({ mediaType: "photo", quality: 0.8 });
        if (result.assets?.length) saveFile(result.assets[0]);
      }
      else if (type === "pdf") {
        const results = await DocumentPicker.pick({ type: [DocumentPicker.types.pdf] });
        if (results?.length) saveFile(results[0]);
      }
    } catch (err) {
      if (err?.canceled) return;
      console.log("Picker Error:", err);
      Alert.alert("Error", "Failed to pick file");
    }
  };


  const saveFile = (file) => setLogo(file);
  const handleUploadPress = (field) => {
    setActiveType(field);
    setModalVisible(true);
  };

  // ✅ Validation
  const validateFields = () => {
    const newErrors = {};

    if (!businessName.trim()) newErrors.businessName = "Business name is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!logo) newErrors.logo = "Business logo is required";
    if (!plotNo.trim()) newErrors.plotNo = "Plot/Building No. is required";
    if (!street.trim()) newErrors.street = "Street/Road is required";
    if (!landmark.trim()) newErrors.landmark = "Landmark is required";
    if (!area.trim()) newErrors.area = "Area is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧾 Submit
  const handleSaveAndContinue = async () => {
    if (!validateFields()) {
      Alert.alert("Validation", "Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      let currentBusinessId = businessId;
      // If no business id — register first
      if (!currentBusinessId) {
        const registerRes = await axios.post(
          `${API_BASE_URL}/user/partner_forms/register_business`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('====================================');
        console.log("register new business  : ", registerRes.data?.businessId);
        console.log('====================================');

        if (registerRes.data?.businessId) {
          currentBusinessId = registerRes.data.businessId;
          setBusinessId(currentBusinessId);
          await AsyncStorage.setItem("businessId", currentBusinessId);
          console.log("✅ Registered New Business:", currentBusinessId);
        } else {
          throw new Error("Failed to register business");
        }
      }

      // below form submission 
      const formData = new FormData();
      formData.append("businessId", currentBusinessId);
      formData.append("userId", userId);
      formData.append("businessName", businessName);
      formData.append("pincode", pincode);
      formData.append("plotNo", plotNo);
      formData.append("street", street);
      formData.append("landmark", landmark);
      formData.append("area", area);
      formData.append("city", city);
      formData.append("state", state);

      if (logo && !logo.uri.startsWith("http")) {
        formData.append("logo", {
          uri: logo.uri,
          type: logo.type || "image/jpeg",
          name: logo.fileName || "logo.jpg",
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/user/partner_forms/business_details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Business saved:", response.data);
      Alert.alert("Success", "Business details saved successfully!");
      onNext();
    } catch (error) {
      const msg = handleApiError(error, "Failed to save business details");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // 📄 Reusable Input
  const renderInput = (label, value, setValue, key, keyboardType = "default") => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          errors[key] && { borderColor: "#ff4d4d", backgroundColor: "#fff6f6" },
        ]}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        keyboardType={keyboardType}
        onChangeText={(text) => {
          setValue(text);
          if (errors[key]) setErrors({ ...errors, [key]: null });
        }}
      />
      {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
    </>
  );

  // 🌀 Loading
  if (businessDetailsLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#155DFC" />
        <Text style={styles.loaderText}>Loading business details...</Text>
      </View>
    );
  }

  // 🧱 Render Form
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>Add Business Details</Text>
        <Text style={styles.subtitle}>Tell us about your business</Text>

        {renderInput("Business Name", businessName, setBusinessName, "businessName")}
        {renderInput("Pincode", pincode, setPincode, "pincode", "numeric")}

        {/* Logo Upload */}
        <Text style={styles.label}>Upload Logo </Text>
        <TouchableOpacity style={styles.uploadBox} onPress={() => handleUploadPress("logo")}>
          {logo ? (
            <Image source={{ uri: logo.uri }} style={[styles.preview, { width: 100, height: 100 }]} />
          ) : (
            <>
              <Image
                source={require("../../assets/images/uploadIcon.png")}
                style={styles.uploadIcon}
              />
              <Text style={styles.uploadText}>Upload Logo</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Business Address</Text>
        {renderInput("Plot/Building No.", plotNo, setPlotNo, "plotNo")}
        {renderInput("Street/Road", street, setStreet, "street")}
        {renderInput("Landmark", landmark, setLandmark, "landmark")}
        {renderInput("Area", area, setArea, "area")}

        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            {renderInput("City", city, setCity, "city")}
          </View>
          <View style={styles.halfInputContainer}>
            {renderInput("State", state, setState, "state")}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.6 }]}
          onPress={handleSaveAndContinue}
          disabled={loading}
        >
          <Text style={styles.saveText}>{loading ? "Saving..." : "Save and Continue"}</Text>
        </TouchableOpacity>
      </ScrollView>

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

export default Step2Form;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 18, fontWeight: "600", color: "#000" },
  subtitle: { fontSize: 13, color: "#555", marginBottom: 20 },
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#000",
    marginBottom: 10,
  },
  errorText: { color: "#ff4d4d", fontSize: 12, marginBottom: 10, marginLeft: 2 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  uploadIcon: { width: 28, height: 28, marginBottom: 6, tintColor: "#999", resizeMode: "contain" },
  uploadText: { fontSize: 15, color: "#000", fontWeight: "500" },
  sectionTitle: { fontSize: 14, color: "#000", fontWeight: "600", marginTop: 15, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  halfInputContainer: { flex: 1 },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  preview: { width: "100%", height: 150, borderRadius: 8, resizeMode: "cover" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  loaderText: { marginTop: 10, color: "#555" },
});
