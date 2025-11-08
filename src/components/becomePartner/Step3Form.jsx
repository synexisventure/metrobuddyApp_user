import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";
import { isValidEmail, isValidMobile } from "../../utils/validators";

const Step3Form = ({ onNext=()=>{} }) => {
  const { API_BASE_URL,
    handleApiError,

    fetchContactDetails,
    contactDetails,
    loadingContactDetails
    
  } = useContext(AppContext);

  const [primaryMobile, setPrimaryMobile] = useState("");
  // const [primaryEmail, setPrimaryEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isWhatsappSame, setIsWhatsappSame] = useState(false);
  const [additionalPhones, setAdditionalPhones] = useState([""]);
  const [additionalEmails, setAdditionalEmails] = useState([""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setFetching(true);

      // Load primary mobile from AsyncStorage
      const storedMobile = await AsyncStorage.getItem("userPhone");
      if (storedMobile) {
        setPrimaryMobile(storedMobile);
        if (isWhatsappSame) setWhatsappNumber(storedMobile);
      }

      // Fetch contact details from context
      await fetchContactDetails();

      setFetching(false);
    };

    loadData();
  }, []);

  // prefill form when contactDetails change
  useEffect(() => {
    if (contactDetails && Object.keys(contactDetails).length > 0) {
      setWhatsappNumber(contactDetails.whatsappNumber || "");
      setAdditionalPhones(
        contactDetails.additionalPhones?.length ? contactDetails.additionalPhones : [""]
      );
      setAdditionalEmails(
        contactDetails.additionalEmails?.length ? contactDetails.additionalEmails : [""]
      );
    }
  }, [contactDetails]);


  //  Auto-sync WhatsApp number if checkbox is checked
  useEffect(() => {
    if (isWhatsappSame) setWhatsappNumber(primaryMobile);
  }, [primaryMobile, isWhatsappSame]);

  //  Validation
  const validateFields = () => {
    const newErrors = {};

    if (!primaryMobile.trim()) newErrors.primaryMobile = "Primary mobile is required";
    else if (!isValidMobile(primaryMobile))
      newErrors.primaryMobile = "Enter a valid 10-digit mobile number";

    // if (!primaryEmail.trim()) newErrors.primaryEmail = "Primary email is required";
    // else if (!isValidEmail(primaryEmail))
    //   newErrors.primaryEmail = "Enter a valid email address";

    if (!whatsappNumber.trim()) newErrors.whatsappNumber = "WhatsApp number is required";
    else if (!isValidMobile(whatsappNumber))
      newErrors.whatsappNumber = "Enter a valid 10-digit WhatsApp number";

    //  Validate Additional Phones (only if filled)
    additionalPhones.forEach((phone, index) => {
      if (phone.trim() !== "" && !isValidMobile(phone)) {
        newErrors[`additionalPhone_${index}`] = `Phone ${index + 1} is invalid`;
      }
    });

    //  Validate Additional Emails (only if filled)
    additionalEmails.forEach((email, index) => {
      if (email.trim() !== "" && !isValidEmail(email)) {
        newErrors[`additionalEmail_${index}`] = `Email ${index + 1} is invalid`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Add/Remove additional contacts
  const addPhone = () => setAdditionalPhones([...additionalPhones, ""]);
  const addEmail = () => setAdditionalEmails([...additionalEmails, ""]);
  const removePhone = (index) => {
    const newPhones = [...additionalPhones];
    newPhones.splice(index, 1);
    setAdditionalPhones(newPhones.length ? newPhones : [""]);
  };
  const removeEmail = (index) => {
    const newEmails = [...additionalEmails];
    newEmails.splice(index, 1);
    setAdditionalEmails(newEmails.length ? newEmails : [""]);
  };

  //  business id state 
  const [businessId, setBusinessId] = useState(null);
  useEffect(() => {
    const loadBusinessId = async () => {
      if (!businessId) {
        const savedId = await AsyncStorage.getItem("businessId");
        if (savedId) setBusinessId(savedId);
      }
    };
    loadBusinessId();
  }, []);

  //  Submit form
  const handleSaveAndContinue = async () => {
    if (!validateFields()) {
      Alert.alert("Validation", "Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const payload = {
        primaryMobile,
        // primaryEmail,
        businessId,
        whatsappNumber,
        additionalPhones: additionalPhones.filter((p) => p.trim() !== ""),
        additionalEmails: additionalEmails.filter((e) => e.trim() !== ""),
      };



      // const resp = await axios.post(
      //   `${API_BASE_URL}/user/partner_forms/contact_details`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      let res;
      let isUpdate = false;

      if (contactDetails && contactDetails._id) {
        // ✅ Update existing contact details
        isUpdate = true;
        res = await axios.put(
          `${API_BASE_URL}/user/partner_forms/contact_details/${businessId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // ✅ Create new contact details
        res = await axios.post(
          `${API_BASE_URL}/user/partner_forms/contact_details`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (res.data) {
        Alert.alert(
          "Success",
          isUpdate
            ? "Contact details updated successfully!"
            : "Contact details saved successfully!"
        ); 
      }

      console.log("Saved contact details:", res.data);
      // Alert.alert("Success", "Contact details saved successfully!");
      onNext();
      fetchContactDetails();
    } catch (err) {
      const msg = handleApiError(err, "Failed to save contact details");
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };



  // 🌀 Loader
  // if (fetching) {
  if (loadingContactDetails) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
        <ActivityIndicator size="large" color="#0056ff" />
        <Text style={{ marginTop: 10 }}>Loading contact details...</Text>
      </View>
    );
  }

  // ✅ Reusable Input
  const renderInput = (label, value, setValue, key, keyboardType = "default", editable = true) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          !editable && { backgroundColor: "#f0f0f0" },
          errors[key] && { borderColor: "#ff4d4d", backgroundColor: "#fff6f6" },
        ]}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#888"
        keyboardType={keyboardType}
        editable={editable}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (errors[key]) setErrors({ ...errors, [key]: null });
        }}
      />
      {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
    </>
  );

  // 🧱 Render UI
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Contact Details</Text>
      <Text style={styles.subtitle}>Tell us how customers can reach you</Text>

      {renderInput("Primary Mobile", primaryMobile, setPrimaryMobile, "primaryMobile", "phone-pad", false)}
      {/* {renderInput("Primary Email", primaryEmail, setPrimaryEmail, "primaryEmail", "email-address")} */}

      {/* WhatsApp */}
      <Text style={styles.label}>WhatsApp Number</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            isWhatsappSame && { backgroundColor: "#0056ff", borderColor: "#0056ff" },
          ]}
          onPress={() => {
            const newState = !isWhatsappSame;
            setIsWhatsappSame(newState);
            if (newState) setWhatsappNumber(primaryMobile);
            else setWhatsappNumber("");
          }}
        >

        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Is WhatsApp number same as primary mobile?
        </Text>
      </View>

      <TextInput
        style={[
          styles.input,
          errors.whatsappNumber && { borderColor: "#ff4d4d", backgroundColor: "#fff6f6" },
          isWhatsappSame && { backgroundColor: "#f0f0f0" },
        ]}
        placeholder="Enter WhatsApp number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={whatsappNumber}
        editable={!isWhatsappSame}
        onChangeText={(text) => {
          setWhatsappNumber(text);
          if (errors.whatsappNumber) setErrors({ ...errors, whatsappNumber: null });
        }}
      />
      {errors.whatsappNumber && <Text style={styles.errorText}>{errors.whatsappNumber}</Text>}

      {/* Additional Phones */}
      <Text style={styles.label}>Additional Phone Numbers</Text>
      {/* {additionalPhones.map((phone, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.input}
            placeholder={`Additional phone ${index + 1}`}
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              const updated = [...additionalPhones];
              updated[index] = text;
              setAdditionalPhones(updated);
            }}
          />
          {index > 0 && (
            <TouchableOpacity onPress={() => removePhone(index)}>
              <Text style={{ color: "red", fontSize: 13 }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))} */}

      {Array.isArray(additionalPhones) && additionalPhones.map((phone, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TextInput
            style={[
              styles.input,
              errors[`additionalPhone_${index}`] && {
                borderColor: "#ff4d4d",
                backgroundColor: "#fff6f6",
              },
            ]}
            placeholder={`Additional phone ${index + 1}`}
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              const updated = [...additionalPhones];
              updated[index] = text;
              setAdditionalPhones(updated);
              if (errors[`additionalPhone_${index}`])
                setErrors({ ...errors, [`additionalPhone_${index}`]: null });
            }}
          />
          {errors[`additionalPhone_${index}`] && (
            <Text style={styles.errorText}>{errors[`additionalPhone_${index}`]}</Text>
          )}
          {index > 0 && (
            <TouchableOpacity onPress={() => removePhone(index)}>
              <Text style={{ color: "red", fontSize: 13 }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addPhone}>
        <Text style={{ color: "#0056ff", fontSize: 14 }}>+ Add another number</Text>
      </TouchableOpacity>

      {/* Additional Emails */}
      <Text style={[styles.label, { marginTop: 20 }]}>Additional Emails</Text>
      {/* {additionalEmails.map((email, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.input}
            placeholder={`Additional email ${index + 1}`}
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              const updated = [...additionalEmails];
              updated[index] = text;
              setAdditionalEmails(updated);
            }}
          />
          {index > 0 && (
            <TouchableOpacity onPress={() => removeEmail(index)}>
              <Text style={{ color: "red", fontSize: 13 }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))} */}

      {additionalEmails.map((email, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TextInput
            style={[
              styles.input,
              errors[`additionalEmail_${index}`] && {
                borderColor: "#ff4d4d",
                backgroundColor: "#fff6f6",
              },
            ]}
            placeholder={`Additional email ${index + 1}`}
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              const updated = [...additionalEmails];
              updated[index] = text;
              setAdditionalEmails(updated);
              if (errors[`additionalEmail_${index}`])
                setErrors({ ...errors, [`additionalEmail_${index}`]: null });
            }}
          />
          {errors[`additionalEmail_${index}`] && (
            <Text style={styles.errorText}>{errors[`additionalEmail_${index}`]}</Text>
          )}
          {index > 0 && (
            <TouchableOpacity onPress={() => removeEmail(index)}>
              <Text style={{ color: "red", fontSize: 13 }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addEmail}>
        <Text style={{ color: "#0056ff", fontSize: 14 }}>+ Add another email</Text>
      </TouchableOpacity>

      {/* Save & Continue */}
      <TouchableOpacity
        style={[styles.saveBtn, loading && { opacity: 0.6 }]}
        onPress={handleSaveAndContinue}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading ? "Saving..." : "Save and Continue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step3Form;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  title: { fontSize: 18, fontWeight: "600", color: "#000" },
  subtitle: { fontSize: 13, color: "#555", marginBottom: 20 },
  label: { fontSize: 13, color: "#000", fontWeight: "500", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#000",
    marginBottom: 10,
  },
  errorText: { color: "#ff4d4d", fontSize: 12, marginBottom: 10, marginLeft: 2 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#aaa",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxLabel: { color: "#000", fontSize: 13 },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  saveText: {
    color: "#fff", fontSize: 16, fontWeight: "600",
  },
});
