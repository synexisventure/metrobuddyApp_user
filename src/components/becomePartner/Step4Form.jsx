import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";

const Step4Form = ({ onNext }) => {
  const { API_BASE_URL, handleApiError } = useContext(AppContext);

  const [timeSlots, setTimeSlots] = useState([{ day: [], openAt: "", closeAt: "" }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ✅ Add / Remove Slot
  const addSlot = () =>
    setTimeSlots([...timeSlots, { day: [], openAt: "", closeAt: "" }]);

  const removeSlot = (index) => {
    const updated = [...timeSlots];
    updated.splice(index, 1);
    setTimeSlots(updated.length ? updated : [{ day: [], openAt: "", closeAt: "" }]);
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    const slotErrors = timeSlots.map((slot) => {
      const sErr = {};
      if (!slot.day.length) sErr.day = "Select at least one day";
      if (!slot.openAt.trim()) sErr.openAt = "Opening time required";
      if (!slot.closeAt.trim()) sErr.closeAt = "Closing time required";
      return sErr;
    });
    if (slotErrors.some((s) => s.day || s.openAt || s.closeAt))
      newErrors.timeSlots = slotErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Save & Continue
  const handleSaveAndContinue = async () => {
    if (!validate()) {
      Alert.alert("Validation Error", "Please fill all required fields properly.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const businessId = await AsyncStorage.getItem("businessId");

      if (!businessId) {
        Alert.alert("Error", "Business ID not found in storage.");
        return;
      }

      const payload = {
        businessId,
        timeSlots: timeSlots.filter((t) => t.day.length && t.openAt && t.closeAt),
      };

      await axios.post(`${API_BASE_URL}/user/partner_forms/business_timing`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("✅ Success", "Business timing saved successfully!");
      onNext && onNext();
    } catch (error) {
      const msg = handleApiError(error, "Failed to save business timing");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render input
  const renderInput = (label, value, setValue, error) => (
    <View style={{ marginBottom: 6 }}>
      <Text style={styles.timeLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error && { borderColor: "#ff4d4d", backgroundColor: "#fff6f6" }]}
        placeholder={label}
        placeholderTextColor="#888"
        value={value}
        onChangeText={setValue}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Business Timing</Text>
      <Text style={styles.subtitle}>Select working days and hours</Text>

      {timeSlots.map((slot, index) => (
        <View key={index} style={styles.slotContainer}>
          {/* Day selection */}
          <Text style={styles.label}>Select Days</Text>
          <View style={styles.dayRow}>
            {days.map((day) => {
              const selected = slot.day.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayBtn, selected && styles.daySelected]}
                  onPress={() => {
                    const updated = [...timeSlots];

                    if (!Array.isArray(updated[index].day)) updated[index].day = [];
                    if (selected) {
                      updated[index].day = updated[index].day.filter((d) => d !== day);
                    } else {
                      updated[index].day = [...updated[index].day, day];
                    }

                    setTimeSlots(updated);
                  }}
                >
                  <Text style={[styles.dayText, selected && styles.dayTextSelected]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {errors.timeSlots?.[index]?.day && (
            <Text style={styles.errorText}>{errors.timeSlots[index].day}</Text>
          )}

          {/* Open / Close time */}
          <View style={styles.timeContainer}>
            <View style={styles.timeBox}>
              {renderInput(
                "Open at",
                slot.openAt,
                (text) => {
                  const updated = [...timeSlots];
                  updated[index].openAt = text;
                  setTimeSlots(updated);
                },
                errors.timeSlots?.[index]?.openAt
              )}
            </View>

            <View style={styles.timeBox}>
              {renderInput(
                "Close at",
                slot.closeAt,
                (text) => {
                  const updated = [...timeSlots];
                  updated[index].closeAt = text;
                  setTimeSlots(updated);
                },
                errors.timeSlots?.[index]?.closeAt
              )}
            </View>
          </View>

          {index > 0 && (
            <TouchableOpacity onPress={() => removeSlot(index)}>
              <Text style={{ color: "red", fontSize: 13 }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addSlot}>
        <Text style={styles.addSlot}>+ Add Another Slot</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveBtn, loading && { opacity: 0.6 }]}
        onPress={handleSaveAndContinue}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading ? "Saving..." : "Save and Continue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step4Form;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", paddingHorizontal: 10 },
  title: { fontSize: 18, fontWeight: "600", color: "#000" },
  subtitle: { fontSize: 13, color: "#555", marginBottom: 20 },
  slotContainer: { marginBottom: 20, borderBottomWidth: 1, borderColor: "#eee", paddingBottom: 15 },
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 8 },
  dayRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  dayBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  daySelected: { backgroundColor: "#0056ff", borderColor: "#0056ff" },
  dayText: { color: "#000", fontWeight: "500" },
  dayTextSelected: { color: "#fff" },
  timeContainer: { flexDirection: "row", justifyContent: "space-between" },
  timeBox: { width: "48%" },
  timeLabel: { color: "#000", fontSize: 13, fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#000",
  },
  errorText: { color: "#ff4d4d", fontSize: 12, marginTop: 2 },
  addSlot: {
    color: "#0056ff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
