import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import BusinessSingleHeader from "../../components/businessSingle/BusinessSingleHeader";
import BusinessSingleDetails from "../../components/businessSingle/BusinessSingleDetails";
import BusinessSingleFilter from "../../components/businessSingle/BusinessSingleFilter";
import BusinessOverview from "../../components/businessSingle/BusinessOverview";
import BusinessReviews from "../../components/businessSingle/BusinessReviews";
import BusinessPhotos from "../../components/businessSingle/BusinessPhotos";

const BusinessSingleScreen = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <BusinessSingleHeader />
      <BusinessSingleDetails />
      <BusinessSingleFilter activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Overview" && <BusinessOverview />}
      {activeTab === "Reviews" && <BusinessReviews />}
      {activeTab === "Photos" && ( <BusinessPhotos/>)}
    </ScrollView>
  );
};

export default BusinessSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  photoContainer: {
    padding: 20,
    alignItems: "center",
  },
  photoText: {
    fontSize: 15,
    color: "#555",
  },
});
