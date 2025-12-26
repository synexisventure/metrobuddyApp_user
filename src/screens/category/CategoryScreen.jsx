import React, { useCallback, useContext } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

const AllCategoriesScreen = ({ navigation }) => {
  const {
    businessGlobalCategory,
    fetchBusinessGlobalCategory,
    businessCategoryLoading,
    IMAGE_BASE_URL,
  } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      if (!businessGlobalCategory || businessGlobalCategory.length === 0) {
        fetchBusinessGlobalCategory();
      }
    }, [])
  );

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

        <View>
          <Text style={styles.headerTitle}>All Categories</Text>
          <Text style={styles.headerSubtitle}>
            {businessGlobalCategory.length} categories available
          </Text>
        </View>
      </View>

      {/* LOADER */}
      {businessCategoryLoading || !businessGlobalCategory ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          {/* Category Grid */}
          <ScrollView contentContainerStyle={styles.gridContainer}>
            {businessGlobalCategory.length > 0 ? (
              businessGlobalCategory.map((category) => (
                <CategoryCard
                  key={category._id}
                  categoryId={category._id}
                  icon={{
                    uri: `${IMAGE_BASE_URL}/uploads/categoryImages/${category.image}`,
                  }}
                  title={category.name}
                  subtitle="Explore local businesses"
                  bgColor="#f8f9fa"
                />
              ))
            ) : (
              <Text style={styles.noDataText}>No categories found</Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AllCategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
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
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    lineHeight: 30,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  noDataText: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
    width: "100%",
  },
});
