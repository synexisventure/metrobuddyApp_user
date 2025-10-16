import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState("phone");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    if (otp.length === 6) {
      navigation.navigate("UserApp");
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
        {/* Logo using CSS (Colors Only) */}
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
            style={[styles.tab, loginMethod === "phone" && styles.activeTab]}
            onPress={() => {
              setLoginMethod("phone");
              setOtpSent(false);
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
            style={[styles.tab, loginMethod === "email" && styles.activeTab]}
            onPress={() => {
              setLoginMethod("email");
              setOtpSent(false);
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
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Enter your email"
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
              style={styles.sendOtpBtn}
              onPress={() => setOtpSent(true)}
            >
              <Text style={styles.sendOtpText}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.label}>Enter OTP</Text>
              <TextInput
                placeholder="Enter 6-digit OTP"
                style={[styles.input, { paddingLeft: 15 }]}
                keyboardType="numeric"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={handleContinue}
              >
                <Text style={styles.continueText}>Continue</Text>
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

  // LOGO
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
