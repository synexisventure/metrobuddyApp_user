import React, { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const API_BASE_URL = "http://127.0.0.1:7000/api";
  const IMAGE_BASE_URL = "http://127.0.0.1:7000";

  // const API_BASE_URL = "https://metrobuddy.synexisventure.com/api";
  // const IMAGE_BASE_URL = "https://metrobuddy.synexisventure.com";  

  // const API_BASE_URL = "https://5ebc2d9541bd.ngrok-free.app/api";
  // const IMAGE_BASE_URL = "https://5ebc2d9541bd.ngrok-free.app";

  // ERROR HANDLER
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

    console.error("err msg is :", message,);
    return message;
  };

  // FORM COMPLETION STATUS 
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
      console.log("my statuses : ", response.data.status);
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

  // STATES FOR EACH STEP 
  const [businessDetails, setBusinessDetails] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);
  const [businessTiming, setBusinessTiming] = useState(null);
  const [businessCategory, setBusinessCategory] = useState(null);
  const [businessProducts, setBusinessProducts] = useState(null);
  const [businessMedia, setBusinessMedia] = useState(null);
  const [businessDocuments, setBusinessDocuments] = useState(null);

  // loading for each step 
  const [loadingBusinessDetails, setLoadingBusinessDetails] = useState(false);
  const [loadingContactDetails, setLoadingContactDetails] = useState(false);
  const [loadingBusinessTiming, setLoadingBusinessTiming] = useState(false);
  const [loadingBusinessCategory, setLoadingBusinessCategory] = useState(false);
  const [loadingBusinessProducts, setLoadingBusinessProducts] = useState(false);
  const [loadingBusinessMedia, setLoadingBusinessMedia] = useState(false);
  const [loadingBusinessDocuments, setLoadingBusinessDocuments] = useState(false);


  // INDIVIDUAL FORM FETCH FUNCTIONS
  const fetchBusinessDetails = async () => fetchSingleForm(1, setBusinessDetails, setLoadingBusinessDetails);
  const fetchContactDetails = async () => fetchSingleForm(2, setContactDetails, setLoadingContactDetails);
  const fetchBusinessTiming = async () => fetchSingleForm(3, setBusinessTiming, setLoadingBusinessTiming);
  const fetchBusinessCategory = async () => fetchSingleForm(4, setBusinessCategory, setLoadingBusinessCategory);
  const fetchBusinessProducts = async () => fetchSingleForm(5, setBusinessProducts, setLoadingBusinessProducts);
  const fetchBusinessMedia = async () => fetchSingleForm(6, setBusinessMedia, setLoadingBusinessMedia);
  const fetchBusinessDocuments = async () => fetchSingleForm(7, setBusinessDocuments, setLoadingBusinessDocuments);

  // GENERIC FETCH FUNCTION FOR SINGLE STEP
  const fetchSingleForm = async (stepNumber, setter, loadingSetter) => {
    loadingSetter(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const businessId = await AsyncStorage.getItem("businessId");
      if (!businessId) throw new Error("Business ID not found");

      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/business/${businessId}/${stepNumber}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setter(response.data.existForm || null);
      setNetworkError(false);
      return response.data.existForm;
    } catch (error) {
      const msg = handleApiError(error, `Failed to fetch form ${stepNumber}`);
      console.error(`❌ Error fetching step ${stepNumber}:`, msg);
      setter(null);
      return null;
    } finally {
      loadingSetter(false);
    }
  };

  // FETCH ALL BUSINESS FORMS (1–7) 
  const [allBusinessData, setAllBusinessData] = useState(null);
  const [allBusinessLoading, setAllBusinessLoading] = useState(false);
  const fetchAllBusinessSteps = async (passedBusinessId ) => {
    setAllBusinessLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const businessId = passedBusinessId  || await AsyncStorage.getItem("businessId");

      if (!businessId) throw new Error("Business ID not found");

      // Step numbers 1–7
      const stepForms = [1, 2, 3, 4, 5, 6, 7];

      // Parallel API calls
      const responses = await Promise.all(
        stepForms.map((stepForm) =>
          axios.get(`${API_BASE_URL}/user/partner_forms/business/${businessId}/${stepForm}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      console.log("responses form : ", responses);

      // Extract each form’s data
      const [
        businessDetailsRes,
        contactDetailsRes,
        businessTimingRes,
        businessCategoryRes,
        businessProductsRes,
        businessMediaRes,
        businessDocumentsRes,
      ] = responses.map((res) => res.data.existForm);

      // Save in individual states
      setBusinessDetails(businessDetailsRes || null);
      setContactDetails(contactDetailsRes || null);
      setBusinessTiming(businessTimingRes || null);
      setBusinessCategory(businessCategoryRes || null);
      setBusinessProducts(businessProductsRes || null);
      setBusinessMedia(businessMediaRes || null);
      setBusinessDocuments(businessDocumentsRes || null);

      // Save all together
      setAllBusinessData({
        businessDetails: businessDetailsRes,
        contactDetails: contactDetailsRes,
        businessTiming: businessTimingRes,
        businessCategory: businessCategoryRes,
        businessProducts: businessProductsRes,
        businessMedia: businessMediaRes,
        businessDocuments: businessDocumentsRes,
      });

      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch all business data");
      console.error("❌ fetchAllBusinessSteps Error:", msg);
    } finally {
      setAllBusinessLoading(false);
    }
  };


  // Global Categories fetch 
  const [businessGlobalCategory, setBusinessGlobalCategory] = useState(null);
  const [businessCategoryLoading, setBusinessCategoryLoading] = useState(false);
  const fetchBusinessGlobalCategory = async () => {
    setBusinessCategoryLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/user/categories/get-categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('====================================');
      console.log("categories : ", response.data.data);
      console.log('====================================');
      setBusinessGlobalCategory(response.data?.data || null);
      setNetworkError(false);
    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business category");
      console.error(" Business Category Error:", msg);
      setBusinessGlobalCategory(null);
    } finally {
      setBusinessCategoryLoading(false);
    }
  };


  // trending now api 
  // Trending businesses state
  const [trendingBusinesses, setTrendingBusinesses] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const fetchTrendingBusinesses = async () => {
    setTrendingLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(`${API_BASE_URL}/user/trending`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("My resp data : ", response.data);

      setTrendingBusinesses(response.data.data);
      setNetworkError(false);

    } catch (error) {
      handleApiError(error, "Failed to fetch trending businesses");
      console.log("treding api err : ", error.response);

      setTrendingBusinesses([]);
    } finally {
      setTrendingLoading(false);
    }
  };


  // All business getting (This api get all buisness registered through my number)
  const [businessList, setBusinessList] = useState([]);
  const [isBusinessListLoading, setIsBusinessListLoading] = useState(false);
  const getMyBusinessList = async () => {
    setIsBusinessListLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/user/partner_forms/all_business`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("My leads data : " ,response.data.data );
      setBusinessList(response.data.data || []);
    } catch (error) {
      handleApiError(error, "Failed to fetch business list");
      setBusinessList([]);
    } finally {
      setIsBusinessListLoading(false);
    }
  };

  // ================= BUSINESS LEADS API ===================== 
  const [businessLeads, setBusinessLeads] = useState([]);
  const [businessLeadsLoading, setBusinessLeadsLoading] = useState(false);
  const fetchBusinessLeads = async (businessId) => {
    setBusinessLeadsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/user/business/leads/${businessId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Business Leads Response:", response.data);

      setBusinessLeads(response.data?.data || []);
      setNetworkError(false);

    } catch (error) {
      const msg = handleApiError(error, "Failed to fetch business leads");
      console.error("Business Leads API Error:", msg);
      setBusinessLeads([]);
    } finally {
      setBusinessLeadsLoading(false);
    }
  };



  // PROVIDER EXPORT 
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

        // all forms data ================================
        businessDetails,
        contactDetails,
        businessTiming,
        businessCategory,
        businessProducts,
        businessMedia,
        businessDocuments,

        // all form setter
        setBusinessDetails,
        setContactDetails,
        setBusinessTiming,
        setBusinessCategory,
        setBusinessProducts,
        setBusinessMedia,
        setBusinessDocuments,

        // individual loading states ✅
        loadingBusinessDetails,
        loadingContactDetails,
        loadingBusinessTiming,
        loadingBusinessCategory,
        loadingBusinessProducts,
        loadingBusinessMedia,
        loadingBusinessDocuments,

        // All forms fetcher
        allBusinessLoading,
        fetchAllBusinessSteps,

        // Individual form fetchers
        fetchBusinessDetails,
        fetchContactDetails,
        fetchBusinessTiming,
        fetchBusinessCategory,
        fetchBusinessProducts,
        fetchBusinessMedia,
        fetchBusinessDocuments,

        // all forms end ===============================

        // Global Categories
        businessGlobalCategory,
        fetchBusinessGlobalCategory,

        // Form Status
        formStatus,
        formStatusLoading,
        fetchFormStatus,

        // trending now api
        trendingBusinesses,
        trendingLoading,
        fetchTrendingBusinesses,

        // All business getting (This api get all buisness registered through my number)
        businessList,
        isBusinessListLoading,
        getMyBusinessList,

        // business leads 
        businessLeads,
        businessLeadsLoading,
        fetchBusinessLeads,


      }}
    >
      {children}
    </AppContext.Provider>
  );
};
