import React, { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ==============================================================
  // CONFIG
  // ==============================================================
  const API_BASE_URL = "http://192.168.1.4:7000/api";
  const IMAGE_BASE_URL = "http://192.168.1.4:7000";

  // ==============================================================
  // ERROR HANDLER
  // ==============================================================
  const [networkError, setNetworkError] = useState(false);
  const handleApiError = (error, defaultMessage = "Something went wrong") => {
    console.error("API Error:", error?.response?.data || error?.message || error);
    let message = defaultMessage;

    if (error?.response) {
      const status = error.response.status;
      if (status >= 500) {
        message = "Internal Server Error. Please try again later.";
      } else if (status >= 400 && status < 500) {
        message = error.response.data?.message || "Request failed. Please check and try again.";
      } else {
        message = error.response.data?.message || defaultMessage;
      }
      setNetworkError(false);
    } else if (!error?.response) {
      message = "Network error. Please check your internet connection.";
      setNetworkError(true);
    } else {
      message = error?.message || defaultMessage;
      setNetworkError(false);
    }

    console.error("err msg is :", message);
    return message;
  };

  // ==============================================================
  // STEP 2 — BUSINESS DETAILS
  // ==============================================================
  const [businessDetails, setBusinessDetails] = useState(null);
  const [businessDetailsLoading, setBusinessDetailsLoading] = useState(false);

  const fetchBusinessDetails = async () => {
    setBusinessDetailsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/business_details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBusinessDetails(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business details");
      console.error("❌ Business Details Error:", msg);
      setBusinessDetails(null);
    } finally {
      setBusinessDetailsLoading(false);
    }
  };

  // ==============================================================
  // STEP 3 — CONTACT DETAILS
  // ==============================================================
  const [contactDetails, setContactDetails] = useState(null);
  const [contactDetailsLoading, setContactDetailsLoading] = useState(false);

  const fetchContactDetails = async () => {
    setContactDetailsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/contact_details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContactDetails(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch contact details");
      console.error("❌ Contact Details Error:", msg);
      setContactDetails(null);
    } finally {
      setContactDetailsLoading(false);
    }
  };

  // ==============================================================
  // STEP 4 — BUSINESS TIMING
  // ==============================================================
  const [businessTiming, setBusinessTiming] = useState(null);
  const [businessTimingLoading, setBusinessTimingLoading] = useState(false);

  const fetchBusinessTiming = async () => {
    setBusinessTimingLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/business_timing`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('====================================');
      console.log("Bsiness timing : " , response.data?.data);
      console.log('====================================');
      setBusinessTiming(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business timing");
      console.error("❌ Business Timing Error:", msg);
      setBusinessTiming(null);
    } finally {
      setBusinessTimingLoading(false);
    }
  };

  // ==============================================================
  // STEP 5 — BUSINESS CATEGORY
  // ==============================================================
  const [businessCategory, setBusinessCategory] = useState(null);
  const [businessCategoryLoading, setBusinessCategoryLoading] = useState(false);
  const fetchBusinessCategory = async () => {
    setBusinessCategoryLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/categories/get-categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('====================================');
      console.log("categories : " , response);
      console.log('====================================');
      setBusinessCategory(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business category");
      console.error(" Business Category Error:", msg);
      setBusinessCategory(null);
    } finally {
      setBusinessCategoryLoading(false);
    }
  };

  // ==============================================================
  // STEP 6 — BUSINESS MEDIA
  // ==============================================================
  const [businessMedia, setBusinessMedia] = useState(null);
  const [businessMediaLoading, setBusinessMediaLoading] = useState(false);

  const fetchBusinessMedia = async () => {
    setBusinessMediaLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/photos_videos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBusinessMedia(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business media");
      console.error("❌ Business Media Error:", msg);
      setBusinessMedia(null);
    } finally {
      setBusinessMediaLoading(false);
    }
  };

  // ==============================================================
  // STEP 7 — BUSINESS DOCUMENTS
  // ==============================================================
  const [businessDocuments, setBusinessDocuments] = useState(null);
  const [businessDocumentsLoading, setBusinessDocumentsLoading] = useState(false);

  const fetchBusinessDocuments = async () => {
    setBusinessDocumentsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/document_upload`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBusinessDocuments(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business documents");
      console.error("❌ Business Documents Error:", msg);
      setBusinessDocuments(null);
    } finally {
      setBusinessDocumentsLoading(false);
    }
  };

  // ==============================================================
  // FORM COMPLETION STATUS
  // ==============================================================
  const [formStatus, setFormStatus] = useState(null);
  const [formStatusLoading, setFormStatusLoading] = useState(false);
  const fetchFormStatus = async () => {
    setFormStatusLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const businessId = await AsyncStorage.getItem("businessId");
      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/form_status?businessId=${businessId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('====================================');
      console.log("my statuses : " , response.data.status);
      console.log('====================================');
      setFormStatus(response.data.status || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch form completion status");
      console.error(" Form Status Error:", msg);
      setFormStatus(null);
    } finally {
      setFormStatusLoading(false);
    }
  };

  // ==============================================================
  // PROVIDER EXPORT
  // ==============================================================
  return (
    <AppContext.Provider
      value={{
        // Base URLs
        API_BASE_URL,
        IMAGE_BASE_URL,

        // Error handler
        handleApiError,
        setNetworkError,
        networkError,

        // Business Details
        businessDetails,
        businessDetailsLoading,
        fetchBusinessDetails,

        // Contact Details
        contactDetails,
        contactDetailsLoading,
        fetchContactDetails,

        // Business Timing 
        businessTiming,
        businessTimingLoading,
        fetchBusinessTiming,

        // Business Category
        businessCategory,
        businessCategoryLoading,
        fetchBusinessCategory,

        // Business Media
        businessMedia,
        businessMediaLoading,
        fetchBusinessMedia,

        // Business Documents
        businessDocuments,
        businessDocumentsLoading,
        fetchBusinessDocuments,

        // Form Status
        formStatus,
        formStatusLoading,
        fetchFormStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
