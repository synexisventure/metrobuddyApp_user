// import { useNavigation } from "@react-navigation/native";
// import React, { useContext, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { AppContext } from "../../context/AppContext";

// const ContactCard = ({ contact = {} }) => {

//   const {contactDetails} = useContext(AppContext);

//   useEffect(()=>{
//     console.log(" contact details in contact card : ", contactDetails);
//   })
  
//   const navigation = useNavigation();
//   const onEdit = () => {
//     navigation.navigate("ContactDetailsScreen");
//   }

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Contact Details</Text>
//         <TouchableOpacity onPress={onEdit}>
//           <Image
//             source={require("../../assets/images/edit.png")}
//             style={styles.editIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>Phone</Text>
//       <Text style={styles.value}>{contact.phone || "—"}</Text>

//       <Text style={styles.label}>Email</Text>
//       <Text style={styles.value}>{contact.email || "—"}</Text>

//       <Text style={styles.label}>Address</Text>
//       <Text style={styles.value}>{contact.address || "—"}</Text>
//     </View>
//   );
// };

// export default ContactCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 18,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   title: { fontSize: 16, fontWeight: "600", color: "#000" },
//   editIcon: { width: 18, height: 18, tintColor: "#0056ff" },
//   label: { fontSize: 12, color: "#666", marginTop: 6 },
//   value: { fontSize: 14, fontWeight: "500", color: "#000" },
// });

import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { AppContext } from "../../context/AppContext";

const ContactCard = () => {
  const navigation = useNavigation();
  const { contactDetails } = useContext(AppContext);

  useEffect(() => {
    console.log("Contact details in ContactCard:", contactDetails);
  }, [contactDetails]);

  const onEdit = () => {
    navigation.navigate("ContactDetailsScreen");
  };

  if (!contactDetails) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Details</Text>
        </View>
        <Text style={styles.emptyText}>No contact details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Contact Details</Text>
        </View>

        <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          /> 
        </TouchableOpacity>
      </View>

      {/* Main Contact Info */}
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Primary Mobile</Text>
        <Text style={styles.value}>
          {contactDetails.primaryMobile || "—"}
        </Text>

        <Text style={styles.label}>WhatsApp Number</Text>
        <Text style={styles.value}>
          {contactDetails.whatsappNumber || "—"}
        </Text>

        {/* Additional Phones */}
        {contactDetails.additionalPhones?.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Additional Phones</Text>
            <View style={styles.chipContainer}>
              {contactDetails.additionalPhones.map((ph, idx) => (
                <View key={idx} style={styles.chip}>
                  <Text style={styles.chipText}>{ph}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Additional Emails */}
        {contactDetails.additionalEmails?.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Additional Emails</Text>
            <View style={styles.chipContainer}>
              {contactDetails.additionalEmails.map((em, idx) => (
                <View key={idx} style={styles.chip}>
                  <Text style={styles.chipText}>{em}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e9ecf3",

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: "#0056ff",
    marginRight: 6,
  },
  title: { fontSize: 16,   color: "#000" },
  editBtn: { flexDirection: "row", alignItems: "center" },
  editIcon: { width: 16, height: 16, tintColor: "#0056ff", marginRight: 4 },
  editText: { color: "#0056ff", fontSize: 13, fontWeight: "500" },
  infoBlock: { marginTop: 4 },
  label: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
    marginBottom: 2,
  },
  value: { fontSize: 14, fontWeight: "500", color: "#000" },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  chip: {
    backgroundColor: "#f1f5ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  chipText: { color: "#0056ff", fontSize: 13, fontWeight: "500" },
  emptyText: {
    textAlign: "center",
    color: "#777",
    paddingVertical: 16,
    fontSize: 13,
  },
});
