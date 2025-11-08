import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";

const Step4Form = ({ onNext= ()=>{} }) => {
  const { API_BASE_URL, handleApiError, businessTiming, loadingBusinessTiming, fetchBusinessTiming } = useContext(AppContext);

  const [timeSlots, setTimeSlots] = useState([{ day: [], openAt: "", closeAt: "" }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // picker of time steup======= 
  const [showPickerIndex, setShowPickerIndex] = useState(null);
  const [pickerType, setPickerType] = useState("open"); // "open" or "close"

  // Function to open picker
  const showTimePicker = (index, type) => {
    setShowPickerIndex(index);
    setPickerType(type);
  };

  // fetching data 
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          await fetchBusinessTiming();
        } catch (err) {
          console.log("Error loading business timing:", err);
        }
      };
      loadData();
    }, [])
  );


  // Handle time picked
  const onTimeChange = (event, selectedTime) => {
    if (showPickerIndex === null) return;
    const currentTime = selectedTime || new Date();

    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const updated = [...timeSlots];
    if (pickerType === "open") updated[showPickerIndex].openAt = formattedTime;
    else updated[showPickerIndex].closeAt = formattedTime;

    setTimeSlots(updated);
    setShowPickerIndex(null); // hide picker
  };


  // prefill data - showing from get api 
  useEffect(() => {
    if (businessTiming && businessTiming.timeSlots?.length) {
      setTimeSlots(businessTiming.timeSlots);
    }
  }, [businessTiming]);

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

      if (!businessId) {
        Alert.alert("Error", "Business ID not found in storage.");
        return;
      }

      const postPayload = {
        businessId,
        timeSlots: timeSlots.filter((t) => t.day.length && t.openAt && t.closeAt),
      };

      const putPayload = {
        businessId,
        timings: timeSlots.filter((t) => t.day.length && t.openAt && t.closeAt),
      };

      // await axios.post(`${API_BASE_URL}/user/partner_forms/business_timing`, payload, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // Alert.alert("✅ Success", "Business timing saved successfully!");

      // onNext && onNext();

      let res;
      let isUpdate = false;

      if (businessTiming && businessTiming.businessId) {

      console.log("myy put api payload : ", putPayload);

        // ✅ Update existing timing with PUT
        isUpdate = true;
        res = await axios.put(
          `${API_BASE_URL}/user/partner_forms/business_timing/${businessId}`,
          putPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ✅ Create new timing with POST
      console.log("myy post api payload : ", postPayload);

        res = await axios.post(
          `${API_BASE_URL}/user/partner_forms/business_timing`,
          postPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (res.data) {
        Alert.alert(
          "Success",
          isUpdate
            ? "Business timing updated successfully!"
            : "Business timing saved successfully!"
        );
        onNext && onNext();
      }
      fetchBusinessTiming();
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

  if (loadingBusinessTiming) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
        <ActivityIndicator size="large" color="#0056ff" />
        <Text style={{ marginTop: 10 }}>Loading business timing...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Business Timing</Text>
      <Text style={styles.subtitle}>Select working days and hoursss</Text>

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
            {/* <View style={styles.timeBox}>
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
            </View> */}

            {/* <View style={styles.timeBox}>
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
            </View> */}

            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Open at</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => showTimePicker(index, "open")}
              >
                <Text style={{ color: timeSlots[index].openAt ? "#000" : "#888" }}>
                  {timeSlots[index].openAt || "Select time"}
                </Text>
              </TouchableOpacity>
              {errors.timeSlots?.[index]?.openAt && (
                <Text style={styles.errorText}>{errors.timeSlots[index].openAt}</Text>
              )}
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Close at</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => showTimePicker(index, "close")}
              >
                <Text style={{ color: timeSlots[index].closeAt ? "#000" : "#888" }}>
                  {timeSlots[index].closeAt || "Select time"}
                </Text>
              </TouchableOpacity>
              {errors.timeSlots?.[index]?.closeAt && (
                <Text style={styles.errorText}>{errors.timeSlots[index].closeAt}</Text>
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

      {showPickerIndex !== null && (
        <DateTimePicker
          value={new Date()} // default now
          mode="time"
          is24Hour={false} // <-- 12-hour clock with AM/PM
          display="spinner" // or "clock"
          onChange={onTimeChange}
        />
      )}

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
    marginBottom: 20,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
