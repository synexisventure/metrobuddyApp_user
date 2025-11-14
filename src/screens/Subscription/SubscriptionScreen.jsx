import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  ActivityIndicator, 
  Text,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

import SubscriptionHeader from "../../components/subscription/SubscriptionHeader";
import SubscriptionBodyMonthly from "../../components/subscription/SubscriptionBodyMonthly";
import SubscriptionBodyYearly from "../../components/subscription/SubscriptionBodyYearly";

const SubscriptionScreen = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);
  const { API_BASE_URL } = useContext(AppContext);

  useEffect(() => {
    fetchCurrentBusiness();
    fetchUserSubscriptions();
    fetchSubscriptionPlans();
  }, []);

  const fetchCurrentBusiness = async () => {
    try {
      const businessId = await AsyncStorage.getItem("businessId");
      setCurrentBusinessId(businessId);
    } catch (error) {
      console.error("Error fetching current business:", error);
    }
  };

  const fetchUserSubscriptions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.get(`${API_BASE_URL}/user/subscription`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("User Subscriptions API Response:", response.data);

      if (response.data.success) {
        setUserSubscriptions(response.data.data || []);
      }
    } catch (error) {
      console.error("User Subscriptions API Error:", error);
    }
  };

  const fetchSubscriptionPlans = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.get(`${API_BASE_URL}/user/subscription/all`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("All Subscription Plans API Response:", response.data);

      if (response.data.success) {
        setSubscriptionPlans(response.data.data || []);
      } else {
        Alert.alert("Error", response.data.message || "Failed to fetch subscription plans");
      }
    } catch (error) {
      console.error("Subscription Plans API Error:", error);
      Alert.alert(
        "Error", 
        error.response?.data?.message || "Failed to load subscription plans"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionPress = async (subscriptionPlan, planType) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const buyData = {
        subscriptionId: subscriptionPlan._id,
        planType: planType
      };

      console.log("Buying subscription with data:", buyData);

      const response = await axios.post(
        `${API_BASE_URL}/user/subscription/buy`,
        buyData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Subscription purchased successfully!");
        // Refresh subscriptions list
        fetchUserSubscriptions();
      } else {
        Alert.alert("Error", response.data.message || "Subscription purchase failed");
      }
    } catch (error) {
      console.error("Buy Subscription Error:", error);
      const errorMessage = error.response?.data?.message || "Subscription purchase failed";
      
      if (errorMessage.includes("already have an active subscription")) {
        Alert.alert(
          "Already Subscribed", 
          "You already have an active subscription. Please cancel your current subscription before purchasing a new one."
        );
      } else if (errorMessage.includes("complete your business details")) {
        Alert.alert(
          "Business Details Required", 
          "Please complete your business details before buying a subscription."
        );
      } else {
        Alert.alert("Error", errorMessage);
      }
    }
  };

  // Check if current business has active subscription
  const getCurrentBusinessSubscription = () => {
    if (!currentBusinessId) return null;
    
    return userSubscriptions.find(sub => 
      sub.businessId?._id === currentBusinessId && sub.isActive
    );
  };

  // Format subscription plans for monthly and yearly from API data
  const getMonthlyPlans = () => {
    return subscriptionPlans.map(plan => ({
      _id: plan._id,
      name: plan.planName,
      price: plan.monthlyPrice?.toString() || "0",
      period: "/month",
      badge: plan.isPopular ? "Popular" : getPlanBadge(plan.planName),
      badgeColor: getPlanBadgeColor(plan.planName),
      borderColor: getPlanBorderColor(plan.planName),
      buttonColor: getPlanButtonColor(plan.planName),
      features: plan.features || [],
      isPopular: plan.isPopular
    }));
  };

  const getYearlyPlans = () => {
    return subscriptionPlans.map(plan => ({
      _id: plan._id,
      name: plan.planName,
      price: plan.yearlyPrice?.toString() || "0",
      period: "/year",
      badge: plan.isPopular ? "Popular" : getPlanBadge(plan.planName),
      badgeColor: getPlanBadgeColor(plan.planName),
      borderColor: getPlanBorderColor(plan.planName),
      buttonColor: getPlanButtonColor(plan.planName),
      features: plan.features || [],
      isPopular: plan.isPopular
    }));
  };

  // Helper functions for plan styling based on actual plan names from API
  const getPlanBadge = (planName) => {
    switch (planName?.toLowerCase()) {
      case 'enterprise': return "Premium";
      case 'basic': return "Essential";
      default: return planName;
    }
  };

  const getPlanBadgeColor = (planName) => {
    switch (planName?.toLowerCase()) {
      case 'basic': return "#C0C0C0";
      case 'enterprise': return "#4A90E2";
      default: return "#C0C0C0";
    }
  };

  const getPlanBorderColor = (planName) => {
    switch (planName?.toLowerCase()) {
      case 'basic': return "#E0E0E0";
      case 'enterprise': return "#4A90E2";
      default: return "#E0E0E0";
    }
  };

  const getPlanButtonColor = (planName) => {
    switch (planName?.toLowerCase()) {
      case 'basic': return "#2196F3";
      case 'enterprise': return "#FF6B35";
      default: return "#2196F3";
    }
  };

  const currentSubscription = getCurrentBusinessSubscription();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#155DFC" />
        <Text style={styles.loadingText}>Loading subscription plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header fixed at top */}
      <SubscriptionHeader
        isYearly={isYearly}
        onToggle={() => setIsYearly(!isYearly)}
      />

      {/* Current Subscription Info */}
      {currentSubscription && (
        <View style={styles.currentSubscriptionContainer}>
          <Text style={styles.currentSubscriptionTitle}>Current Plan</Text>
          <View style={styles.currentSubscriptionCard}>
            <Text style={styles.planName}>
              {currentSubscription.subscriptionId?.planName} - {currentSubscription.planType}
            </Text>
            <Text style={styles.planPrice}>
              ₹{currentSubscription.planType === 'monthly' 
                ? currentSubscription.subscriptionId?.monthlyPrice 
                : currentSubscription.subscriptionId?.yearlyPrice}
            </Text>
            <Text style={styles.planExpiry}>
              Expires on: {new Date(currentSubscription.endDate).toLocaleDateString()}
            </Text>
            <Text style={styles.planStatus}>
              Status: {currentSubscription.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      )}

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isYearly ? 
          <SubscriptionBodyYearly 
            subscriptionPlans={getYearlyPlans()}
            currentSubscription={currentSubscription}
            onSubscriptionPress={handleSubscriptionPress}
          /> : 
          <SubscriptionBodyMonthly 
            subscriptionPlans={getMonthlyPlans()}
            currentSubscription={currentSubscription}
            onSubscriptionPress={handleSubscriptionPress}
          />
        }
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  currentSubscriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  currentSubscriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  currentSubscriptionCard: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  planName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#155DFC',
    marginBottom: 4,
  },
  planExpiry: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  planStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});