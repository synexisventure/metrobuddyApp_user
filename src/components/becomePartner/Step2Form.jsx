import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const Step2Form = ({ onNext }) => {
  const [businessName, setBusinessName] = useState("");
  const [pincode, setPincode] = useState("");
  const [plotNo, setPlotNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSaveAndContinue = () => {
    onNext(); // move to next step
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Add Business Details</Text>
      <Text style={styles.subtitle}>Tell us about your business</Text>

      {/* Business Name */}
      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your business name"
        placeholderTextColor="#888"
        value={businessName}
        onChangeText={setBusinessName}
      />

      {/* Upload Cover Image */}
      <Text style={styles.label}>Upload Cover Image</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image
          source={require("../../assets/images/uploadIcon.png")}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Upload Cover Photo</Text>
        <Text style={styles.recommendText}>Recommended: 1200 x 600 px</Text>
      </TouchableOpacity>

      {/* Upload Logo */}
      <Text style={styles.label}>Upload Logo (Optional)</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image
          source={require("../../assets/images/uploadIcon.png")}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Upload Logo</Text>
      </TouchableOpacity>

      {/* Business Address */}
      <Text style={styles.sectionTitle}>Business Address</Text>

      <Text style={styles.label}>Pincode</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pincode"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />

      <Text style={styles.label}>Plot/Building No.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter plot or building number"
        placeholderTextColor="#888"
        value={plotNo}
        onChangeText={setPlotNo}
      />

      <Text style={styles.label}>Street/Road</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter street or road name"
        placeholderTextColor="#888"
        value={street}
        onChangeText={setStreet}
      />

      <Text style={styles.label}>Landmark</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter nearby landmark"
        placeholderTextColor="#888"
        value={landmark}
        onChangeText={setLandmark}
      />

      <Text style={styles.label}>Area</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter area"
        placeholderTextColor="#888"
        value={area}
        onChangeText={setArea}
      />

      {/* City and State (side-by-side) */}
      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#888"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="State"
            placeholderTextColor="#888"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>

      {/* Save & Continue Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndContinue}>
        <Text style={styles.saveText}>Save and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step2Form;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#000",
    marginBottom: 14,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  uploadIcon: {
    width: 28,
    height: 28,
    marginBottom: 6,
    tintColor: "#999",
    resizeMode: "contain",
  },
  uploadText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
  recommendText: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap : 10
  },
  halfInputContainer: {
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    // marginBottom: 20,
  },
  saveText: { 
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
