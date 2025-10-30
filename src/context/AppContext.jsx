import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
// import Toast from "react-native-toast-message";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const API_BASE_URL = "http://192.168.1.5:7000/api";
  const IMAGE_BASE_URL = "http://192.168.1.5:7000/api"; 

  // catch helper
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
      // } else if (error?.request) { 
      // } else if (error?.request && !error?.response) {
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
 
 

  return (
    <AppContext.Provider
      value={{
        //  api urls
        API_BASE_URL,
        IMAGE_BASE_URL,
        handleApiError,
        setNetworkError,
        networkError,

        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
