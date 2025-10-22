import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const TabSelector = ({ tabs = [], onSelect }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handlePress = (tab) => {
    setActiveTab(tab);
    onSelect?.(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => handlePress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f9fc",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  scrollContainer: {
    alignItems: "center",
    gap: 10,
  },
  tabButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeTabButton: {
    backgroundColor: "#E8ECF5",
  },
  tabText: {
    color: "#111",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#111",
    fontWeight: "600",
  },
});
