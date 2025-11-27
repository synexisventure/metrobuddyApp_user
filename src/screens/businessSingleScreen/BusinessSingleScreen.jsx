import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

import BusinessSingleHeader from "../../components/businessSingle/BusinessSingleHeader";
import BusinessSingleProduct from "../../components/businessSingle/BusinessSingleProduct";
import BusinessSingleDetails from "../../components/businessSingle/BusinessSingleDetails";
import BusinessSingleFilter from "../../components/businessSingle/BusinessSingleFilter";
import BusinessOverview from "../../components/businessSingle/BusinessOverview";
import BusinessReviews from "../../components/businessSingle/BusinessReviews";
import BusinessPhotos from "../../components/businessSingle/BusinessPhotos";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BusinessSingleScreen = () => {
  const route = useRoute();
  const { key } = route.params; // key : id from navigation

  const { API_BASE_URL, handleApiError } = useContext(AppContext);


  const [activeTab, setActiveTab] = useState("Overview");
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessDetails = async () => {

      const id = key?.businessId ? key.businessId : key;

      console.log("fetching for key : ", id);

      try {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(`${API_BASE_URL}/user/business/${id}`,
          // const response = await axios.get(`${API_BASE_URL}/user/business/6908de84d2431590add9ec07`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("my single data : ", response);

        if (response.data.success) {
          setBusiness(response.data.data);
        } else {
          setError("Business not found");
        }
      } catch (err) {
        console.error("Error fetching business:", err?.response);
        const msg = handleApiError(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [key]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading business details...</Text>
      </View>
    );
  }   

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!business) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No business data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <BusinessSingleHeader
        business={business.businessDetails}
        contact={business.contactDetails}
        timing={business.businessTiming}
        category={business.businessCategory}
        media={business.businessMedia}
        documents={business.businessDocuments}
      />

      <BusinessSingleDetails
        business={business.businessDetails}
        contact={business.contactDetails}
        category={business.businessCategory}
        // businessId="6906f87f301de96d720cba1c" // static businessId
        businessId= {key}
      />

      <BusinessSingleFilter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Overview" && (
        <BusinessOverview
          business={business.businessDetails}
          contact={business.contactDetails}
          timing={business.businessTiming}
          category={business.businessCategory}
          media={business.businessMedia}
          documents={business.businessDocuments}
        />
      )}

      {activeTab === "Reviews" && (
        <BusinessReviews
          businessId={business.businessDetails.businessId._id}
          business={business.businessDetails}
          contact={business.contactDetails}
        />
      )}

      {activeTab === "Photos" && (
        <BusinessPhotos
          media={business.businessMedia}
          business={business.businessDetails}
        />
      )}

      {activeTab === "Product" && (
        <BusinessSingleProduct
          products={business.businessProducts?.products || []}
        />
      )}

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
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
