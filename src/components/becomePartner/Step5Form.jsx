import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";

const Step5Form = ({ onNext }) => {
  const [selectedQuickCategories, setSelectedQuickCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Gym & Fitness");

  const quickCategories = ["AC Repair", "Beauty Salon", "Electronics", "Restaurant"];
  const subcategories = ["Gym", "Yoga", "Zumba", "Personal Training"];

  const toggleQuickCategory = (item) => {
    if (selectedQuickCategories.includes(item)) {
      setSelectedQuickCategories(selectedQuickCategories.filter((i) => i !== item));
    } else {
      setSelectedQuickCategories([...selectedQuickCategories, item]);
    }
  };

  const handleSaveAndContinue = () => {
    onNext && onNext();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Select Category</Text>
      <Text style={styles.subtitle}>Choose your business category and services</Text>

      {/* Business Category */}
      <Text style={styles.label}>Select Business Category</Text>
      <TouchableOpacity activeOpacity={0.7} style={styles.dropdown}>
        <Text style={styles.dropdownText}>{selectedCategory}</Text>
        <Image
          source={require("../../assets/images/downArrow.png")}  
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {/* Quick Select Categories */}
      <Text style={styles.label}>Select Subcategories</Text>
      <View style={styles.quickContainer}>
        {quickCategories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.quickItem,
              selectedQuickCategories.includes(item) && styles.quickSelected,
            ]}
            onPress={() => toggleQuickCategory(item)}
          >
            <Text
              style={[
                styles.quickText,
                selectedQuickCategories.includes(item) && styles.quickTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subcategories */}
      {/* <Text style={styles.label}>Select Subcategories</Text>
      <Text style={styles.helperText}>You can select multiple services</Text>

      {subcategories.map((item) => (
        <View key={item} style={styles.inputBox}>
          <Text style={styles.inputText}>{item}</Text>
        </View>
      ))} */}

      {/* Save and Continue Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndContinue}>
        <Text style={styles.saveText}>Save and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step5Form;

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
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dropdownText: {
    color: "#000",
    fontSize: 14,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: "#555",
  },
  quickContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  quickItem: {
    backgroundColor: "#f3f5f9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  quickSelected: {
    backgroundColor: "#0056ff",
  },
  quickText: {
    color: "#000",
    fontSize: 13,
  },
  quickTextSelected: {
    color: "#fff",
  },
  helperText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  inputText: {
    color: "#000",
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    // marginTop: 20,
    // marginBottom: 30,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
