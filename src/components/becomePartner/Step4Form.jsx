import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Step4Form = ({ onNext }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedDays([]);
    } else {
      setSelectedDays(days);
    }
    setSelectAll(!selectAll);
  };

  const handleSaveAndContinue = () => {
    onNext && onNext(); // move to next step if prop passed
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Business Timing</Text>
      <Text style={styles.subtitle}>Select days you are open</Text>

      {/* Working Days */}
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

      {/* Custom Checkbox */}
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

      {/* Opening Hours */}
      <Text style={styles.label}>Opening Hours</Text>
      <View style={styles.timeContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Open at</Text>
          <TouchableOpacity style={styles.selectBox}>
            <Text style={styles.selectText}>Select time</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Close at</Text>
          <TouchableOpacity style={styles.selectBox}>
            <Text style={styles.selectText}>Select time</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Another Time Slot */}
      <TouchableOpacity>
        <Text style={styles.addSlot}>+ Add Another Time Slot</Text>
      </TouchableOpacity>

      {/* Save and Continue Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndContinue}>
        <Text style={styles.saveText}>Save and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step4Form;

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
    marginBottom: 8,
  },
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
  daySelected: {
    backgroundColor: "#0056ff",
    borderColor: "#0056ff",
  },
  dayText: {
    color: "#000",
    fontWeight: "500",
  },
  dayTextSelected: {
    color: "#fff",
  },
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
  checkboxChecked: {
    backgroundColor: "#0056ff",
    borderColor: "#0056ff",
  },
  innerTick: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  checkboxLabel: {
    color: "#000",
    fontSize: 13,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeBox: {
    width: "48%",
  },
  timeLabel: {
    color: "#000",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  selectText: {
    color: "#888",
    fontSize: 14,
  },
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
    // marginBottom: 30,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
