// CategorySearchHeader.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategorySearchHeader = ({ categoryName , businessCount }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require("../../assets/images/backArrow.png")}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {categoryName || "Category"}
        </Text>
        <Text style={styles.headerSubtitle}>
          {businessCount} businesses found
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#7f8c8d",
  },
});

export default CategorySearchHeader;