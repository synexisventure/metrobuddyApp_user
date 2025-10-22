import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const Step6Form = ({ onNext }) => {
  const handleSaveAndContinue = () => {
    onNext && onNext();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Photos & Videos</Text>
      <Text style={styles.subtitle}>
        Optional - Showcase your business with images
      </Text>

      {/* Pro Tip Card */}
      <View style={styles.proTipCard}>
        <View style={styles.proTipHeader}>
          {/* <Image
            source={require("../../assets/images/uploadIcon.png")}
            style={styles.tipIcon}
          /> */}
          <Text style={styles.proTipTitle}>Pro Tip</Text>
        </View>
        <Text style={styles.proTipText}>
          Businesses with photos get 3x more engagement. Add at least 5 photos of your business.
        </Text>
      </View>

      {/* Business Photos */}
      <Text style={styles.sectionLabel}>Business Photos</Text>
      <Text style={styles.helperText}>
        Add photos of your business, products, or services
      </Text>

      <View style={styles.photoRow}>
        <TouchableOpacity style={styles.photoBox}>
          <Image
            source={require("../../assets/images/gallery.png")}
            style={styles.icon}
          />
          <Text style={styles.photoText}>Add Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoBox}>
          <Image
            source={require("../../assets/images/camera.png")}
            style={styles.icon}
          />
          <Text style={styles.photoText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Business Videos */}
      <Text style={[styles.sectionLabel, { marginTop: 25 }]}>
        Business Videos (Optional)
      </Text>
      <Text style={styles.helperText}>Add a video tour or introduction</Text>

      <TouchableOpacity style={styles.videoBox}>
        <Image
          source={require("../../assets/images/video.png")}
          style={styles.icon}
        />
        <Text style={styles.photoText}>Add Video</Text>
        <Text style={styles.videoHint}>Max 30 seconds</Text>
      </TouchableOpacity>

      {/* Save & Continue Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndContinue}>
        <Text style={styles.saveText}>Save and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step6Form;

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
  proTipCard: {
    backgroundColor: "#f0f5ff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#dce5ff",
    marginBottom: 25,
  },
  proTipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: "#0056ff",
  },
  proTipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0056ff",
  },
  proTipText: {
    fontSize: 13,
    color: "#000",
    lineHeight: 18,
  },
  sectionLabel: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
    marginBottom: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 12,
  },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  photoBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    width: "48%",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#555",
    marginBottom: 8,
  },
  photoText: {
    fontSize: 13,
    color: "#000",
  },
  videoBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  videoHint: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    // marginBottom: 30,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
