import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Step3Form = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSaveAndContinue = () => {
    onNext(); // move to next step
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Contact Details</Text>
      <Text style={styles.subtitle}>Optional - You can skip this step</Text>

      {/* Email */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address (optional)"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.helperText}>
        We'll use this for important business updates
      </Text>

      {/* Website */}
      <Text style={styles.label}>Website (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter website URL"
        placeholderTextColor="#888"
        keyboardType="url"
        value={website}
        onChangeText={setWebsite}
      />

      {/* WhatsApp Number */}
      <Text style={styles.label}>WhatsApp Number (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter WhatsApp number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      {/* Save & Continue */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndContinue}>
        <Text style={styles.saveText}>Save and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step3Form;

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
    marginBottom: 10,
  },
  helperText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20, 
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
