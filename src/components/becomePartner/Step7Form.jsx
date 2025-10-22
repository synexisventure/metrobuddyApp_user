import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const Step7Form = ({ onSubmit }) => {
  const handleSubmit = () => {
    onSubmit && onSubmit();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Verification Documents</Text>
      <Text style={styles.subtitle}>
        Upload documents to verify your business
      </Text>

      {/* Secure Upload Card */}
      <View style={styles.secureCard}>
        <View style={styles.secureHeader}>
          <Image
            source={require("../../assets/images/security.png")}
            style={styles.secureIcon}
          />
          <Text style={styles.secureTitle}>Secure Upload</Text>
        </View>
        <Text style={styles.secureText}>
          Your documents are encrypted and kept secure. We only use them for
          verification.
        </Text>
      </View>

      {/* MSME Certificate */}
      <Text style={styles.label}>MSME Certificate</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image
          source={require("../../assets/images/uploadIcon.png")}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Upload MSME Certificate</Text>
      </TouchableOpacity>

      {/* CIN Certificate */}
      <Text style={styles.label}>CIN Certificate</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image
          source={require("../../assets/images/uploadIcon.png")}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Upload CIN Certificate</Text>
      </TouchableOpacity>

      {/* GSTIN Certificate */}
      <Text style={styles.label}>GSTIN Certificate</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image
          source={require("../../assets/images/uploadIcon.png")}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Upload GSTIN Certificate</Text>
      </TouchableOpacity>

      {/* FSSAI Number (Optional) */}
      <Text style={styles.label}>FSSAI License (If Food Type)</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image
          source={require("../../assets/images/uploadIcon.png")}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Upload FSSAI Certificate</Text>
      </TouchableOpacity>

      {/* Document Guidelines */}
      <View style={styles.guidelinesBox}>
        <Text style={styles.guidelineTitle}>Document Guidelines</Text>
        <Text style={styles.guidelineItem}>
          • Documents should be clear and readable
        </Text>
        <Text style={styles.guidelineItem}>
          • File formats: JPG, PNG, or PDF
        </Text>
        <Text style={styles.guidelineItem}>
          • Maximum file size: 5 MB per document
        </Text>
        <Text style={styles.guidelineItem}>
          • All details should be visible
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Registration</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step7Form;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
    // paddingTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 25,
  },
  secureCard: {
    backgroundColor: "#fff8e5",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#f8e3b0",
    marginBottom: 25,
  },
  secureHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  secureIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: "#ffb100",
  },
  secureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffb100",
  },
  secureText: {
    fontSize: 13,
    color: "#000",
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
    marginBottom: 8,
  },
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
  uploadIcon: {
    width: 18,
    height: 18,
    tintColor: "#555",
    marginRight: 8,
  },
  uploadText: {
    color: "#0056ff",
    fontSize: 14,
    fontWeight: "500",
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
  guidelineTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  guidelineItem: {
    fontSize: 12,
    color: "#555",
    marginBottom: 3,
  },
  submitBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    // marginBottom: 30,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
