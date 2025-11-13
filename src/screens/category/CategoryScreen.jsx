import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../../context/AppContext"; 
import CategoryCard from "../../components/category/CategoryCard";

const AllCategoriesScreen = ({ navigation }) => {
  const {
    businessGlobalCategory,
    fetchBusinessGlobalCategory,
    businessCategoryLoading,
    IMAGE_BASE_URL,
  } = useContext(AppContext);

  useEffect(() => {
    fetchBusinessGlobalCategory(); //  fetch data when screen loads
  }, []);

  if (businessCategoryLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/images/backArrow.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>All Categories</Text>
          <Text style={styles.headerSubtitle}>
            {businessGlobalCategory?.length || 0} categories available
          </Text>
        </View>
      </View>

      {/* Category Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {businessGlobalCategory && businessGlobalCategory.length > 0 ? (
          businessGlobalCategory.map((category, index) => (
            <CategoryCard
              key={index}
              categoryId = {category._id}
              icon={{ uri: `${IMAGE_BASE_URL}/uploads/categoryImages/${category.image}` }} //  use backend image URL
              title={category.name}
              subtitle="Explore local businesses"
              // iconColor="#000"
              bgColor="#f8f9fa"
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No categories found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default AllCategoriesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16, // Padding for safe area / start of content
  },

  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 30,
    borderBottomWidth: 0.5,
    borderColor: "#e2e8f0",
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    // tintColor: '#000', // Assuming a black arrow icon
  },
  headerTextContainer: {
    // Aligns the title and subtitle
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    lineHeight: 30,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // --- Grid Styles ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensures cards are evenly spaced
    paddingHorizontal: 16,
  },
});


