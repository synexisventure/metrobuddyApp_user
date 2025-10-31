import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";

const Step4Form = ({ onNext }) => {
  const {
    API_BASE_URL,
    handleApiError,
    fetchBusinessTiming,
    businessTiming,
    businessTimingLoading,
  } = useContext(AppContext);

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [timeSlots, setTimeSlots] = useState([{ openAt: "", closeAt: "" }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ✅ Fetch existing data
  useEffect(() => {
    const loadData = async () => {
      await fetchBusinessTiming();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (businessTiming) {
      setSelectedDays(businessTiming.workingDays || []);
      setSelectAll(
        businessTiming.workingDays?.length === days.length ? true : false
      );
      setTimeSlots(
        businessTiming.timeSlots?.length
          ? businessTiming.timeSlots
          : [{ openAt: "", closeAt: "" }]
      );
    }
  }, [businessTiming]);

  // ✅ Toggle day selection
  const toggleDay = (day) => {
    let updatedDays;
    if (selectedDays.includes(day)) {
      updatedDays = selectedDays.filter((d) => d !== day);
    } else {
      updatedDays = [...selectedDays, day];
    }
    setSelectedDays(updatedDays);
    setSelectAll(updatedDays.length === days.length);
  };

  // ✅ Select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedDays([]);
    } else {
      setSelectedDays(days);
    }
    setSelectAll(!selectAll);
  };

  // ✅ Add/Remove slot
  const addSlot = () =>
    setTimeSlots([...timeSlots, { openAt: "", closeAt: "" }]);
  const removeSlot = (index) => {
    const updated = [...timeSlots];
    updated.splice(index, 1);
    setTimeSlots(updated.length ? updated : [{ openAt: "", closeAt: "" }]);
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!selectedDays.length)
      newErrors.workingDays = "Please select at least one working day.";

    const slotErrors = timeSlots.map((slot) => {
      const sErr = {};
      if (!slot.openAt.trim()) sErr.openAt = "Opening time required.";
      if (!slot.closeAt.trim()) sErr.closeAt = "Closing time required.";
      return sErr;
    });
    if (slotErrors.some((e) => e.openAt || e.closeAt))
      newErrors.timeSlots = slotErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ POST API Integration
  const handleSaveAndContinue = async () => {
    if (!validate()) {
      Alert.alert("Validation", "Please all required fields.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const payload = {
        workingDays: selectedDays,
        timeSlots: timeSlots.filter(
          (t) => t.openAt.trim() && t.closeAt.trim()
        ),
      };

      console.log("payload : " , payload);
      

      await axios.post(
        `${API_BASE_URL}/user/partner_forms/business_timing`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Business timing saved successfully!");
      onNext && onNext();
    } catch (err) {
      const msg = handleApiError(err, "Failed to save business timing");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ renderInput helper
  const renderInput = (label, value, setValue, error) => (
    <View style={{ marginBottom: 6 }}>
      <Text style={styles.timeLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && { borderColor: "#ff4d4d", backgroundColor: "#fff6f6" },
        ]}
        placeholder={label}
        placeholderTextColor="#888"
        value={value}
        onChangeText={setValue}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  // Loader
  if (businessTimingLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
        <ActivityIndicator size="large" color="#0056ff" />
        <Text style={{ marginTop: 10 }}>Loading business timing...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Business Timing</Text>
      <Text style={styles.subtitle}>Select your working days & hours</Text>

      {/* Days */}
      <Text style={styles.label}>Select Working Days</Text>
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayBtn,
              selectedDays.includes(day) && styles.daySelected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(day) && styles.dayTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.workingDays && (
        <Text style={styles.errorText}>{errors.workingDays}</Text>
      )}

      {/* Select All */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleSelectAll}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, selectAll && styles.checkboxChecked]}>
          {selectAll && <View style={styles.innerTick} />}
        </View>
        <Text style={styles.checkboxLabel}>Select All Days</Text>
      </TouchableOpacity>

      {/* Time Slots */}
      <Text style={styles.label}>Time Slots</Text>
      {timeSlots.map((slot, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
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

      {/* <TouchableOpacity onPress={addSlot}>
        <Text style={styles.addSlot}>+ Add Another Time Slot</Text>
      </TouchableOpacity> */}

      {/* Save Button */}
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
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 8 },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  dayBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
  },
  daySelected: { backgroundColor: "#0056ff", borderColor: "#0056ff" },
  dayText: { color: "#000", fontWeight: "500" },
  dayTextSelected: { color: "#fff" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: "#0056ff", borderColor: "#0056ff" },
  innerTick: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  checkboxLabel: { color: "#000", fontSize: 13 },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  timeBox: { width: "48%" },
  timeLabel: {
    color: "#000",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
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
