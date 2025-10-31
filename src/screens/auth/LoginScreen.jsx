import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";

const LoginScreen = () => {
  const { API_BASE_URL, handleApiError } = useContext(AppContext);
  const navigation = useNavigation();

  const [loginMethod, setLoginMethod] = useState("phone");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast helper
  const showToast = (type, text1, text2 = "") => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 2500,
    });
  };

  // Validation
  const validatePhone = (num) => /^[0-9]{10}$/.test(num);
  const validateOtp = (num) => /^[0-9]{4}$/.test(num);
  const validateEmail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim());

  // ====================== SEND OTP ======================
  const handleSendOtp = async () => {
    if (loginMethod === "phone") {
      if (!phone) {
        showToast("error", "Validation Error", "Please enter your phone number");
        return;
      }
      if (!validatePhone(phone)) {
        showToast("error", "Invalid", "Please enter a valid 10-digit number");
        return;
      }
    } else {
      if (!email) {
        showToast("error", "Validation Error", "Please enter your email");
        return;
      }
      if (!validateEmail(email)) {
        showToast("error", "Invalid", "Please enter a valid email address");
        return;
      }
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        phone: loginMethod === "phone" ? phone : "",
        email: loginMethod === "email" ? email : "",
      });

      if (response.data?.status) {
        showToast("success", "OTP Sent", response.data?.message || "OTP sent successfully");
        setOtpSent(true);
      } else {
        showToast("error", "Error", response.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log("OTP send failed:", error?.response);

      if (error?.response) {
        showToast("error", "Error", error?.response?.data?.message);
      } else if (!error?.response) {
        showToast("error", "Error", "Network error. Please check your internet connection.");
      } else {
        showToast("error", "Error", "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ====================== VERIFY OTP ======================
  const handleVerifyOtp = async () => {
    if (!otp) {
      showToast("error", "Validation Error", "Please enter OTP");
      return;
    }
    if (!validateOtp(otp)) {
      showToast("error", "Invalid", "OTP must be exactly 4 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/user/verify_otp`, {
        phone: loginMethod === "phone" ? phone : "",
        email: loginMethod === "email" ? email : "",
        otp,
      });

      if (response.data?.status) {
        showToast("success", "Success", response.data?.message || "OTP verified successfully");

        const token = response.data?.token;
        if (token) {
          await AsyncStorage.setItem("token", token);

          if (loginMethod === "phone" && phone) {
            await AsyncStorage.setItem("userPhone", phone);
          } else if (loginMethod === "email" && email) {
            await AsyncStorage.setItem("userEmail", email);
          }
        }

        navigation.reset({
          index: 0,
          routes: [{ name: "UserApp" }],
        });
      } else {
        showToast("error", "Invalid OTP", response.data?.message || "Please try again");
      }
    } catch (error) {
      console.log("OTP verify failed:", error?.response);

      if (error?.response) {
        showToast("error", "Error", error?.response?.data?.message);
      } else if (!error?.response) {
        showToast("error", "Error", "Network error. Please check your internet connection.");
      } else {
        showToast("error", "Error", "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.outerBlue}>
            <View style={styles.innerWhite}>
              <View style={styles.centerBlue} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Welcome to MetroBuddy</Text>
        <Text style={styles.subtitle}>Your local business discovery app</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            disabled={otpSent}
            style={[
              styles.tab,
              loginMethod === "phone" && styles.activeTab,
              otpSent && { opacity: 0.5 },
            ]}
            onPress={() => {
              if (!otpSent) {
                setLoginMethod("phone");
                setOtpSent(false);
              }
            }}
          >
            <Text
              style={[
                styles.tabText,
                { color: loginMethod === "phone" ? "#2E6CF8" : "#777" },
              ]}
            >
              Phone
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={true} // Email login temporarily disabled
            style={[
              styles.tab,
              loginMethod === "email" && styles.activeTab,
              otpSent && { opacity: 0.5 },
            ]}
            onPress={() => {
              if (!otpSent) {
                setLoginMethod("email");
                setOtpSent(false);
              }
            }}
          >
            <Text
              style={[
                styles.tabText,
                { color: loginMethod === "email" ? "#2E6CF8" : "#777" },
              ]}
            >
              Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {loginMethod === "phone" ? (
            <>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneRow}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  placeholder="Enter your phone number"
                  placeholderTextColor={"#555"}
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={"#555"}
                style={[styles.input, { paddingLeft: 15 }]}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </>
          )}

          {/* OTP Section */}
          {!otpSent ? (
            <TouchableOpacity
              style={[styles.sendOtpBtn, loading && { backgroundColor: "#8CAAFD" }]}
              onPress={handleSendOtp}
              disabled={loading}
            >
              <Text style={styles.sendOtpText}>
                {loading ? "Sending..." : "Send OTP"}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.label}>Enter OTP</Text>
              <TextInput
                placeholder="Enter 4-digit OTP"
                placeholderTextColor={"#555"}
                style={[styles.input, { paddingLeft: 15 }]}
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
              />
              <TouchableOpacity
                style={[styles.continueBtn, loading && { backgroundColor: "#8CAAFD" }]}
                onPress={handleVerifyOtp}
                disabled={loading}
              >
                <Text style={styles.continueText}>
                  {loading ? "Verifying..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  outerBlue: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2E6CF8",
    justifyContent: "center",
    alignItems: "center",
  },
  innerWhite: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  centerBlue: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2E6CF8",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
    marginBottom: 25,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F3F6",
    borderRadius: 10,
    padding: 5,
    width: "90%",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    width: "90%",
    marginTop: 25,
  },
  label: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },
  countryCode: {
    paddingHorizontal: 12,
    color: "#000",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  sendOtpBtn: {
    backgroundColor: "#2E6CF8",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 15,
    alignItems: "center",
  },
  sendOtpText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  continueBtn: {
    backgroundColor: "#2E6CF8",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 15,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 15,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    width: "90%",
    marginTop: 30,
    marginBottom: 40,
  },
  linkText: {
    color: "#2E6CF8",
  },
});
