import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";

const DocumentsCard = () => {
  const { IMAGE_BASE_URL, businessDocuments } = useContext(AppContext);
  const [docs, setDocs] = useState([]);

  const navigation = useNavigation();

  const onEdit = () => { 
    navigation.navigate("UploadDocumentScreen");
  };

  useEffect(() => {
    if (businessDocuments) {
      const mapped = [
        { label: "MSME Certificate", file: businessDocuments.msmeCertificate },
        { label: "CIN Certificate", file: businessDocuments.cinCertificate },
        { label: "GSTIN Certificate", file: businessDocuments.gstinCertificate },
        { label: "FSSAI Certificate", file: businessDocuments.fssaiCertificate },
      ];
      setDocs(mapped);
    }
  }, [businessDocuments]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Uploaded Documents</Text>
        <TouchableOpacity
          onPress={onEdit}
        >
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      {docs.map((doc, idx) => (
        <View key={idx} style={styles.docRow}>
          <Image
            source={require("../../assets/images/document.png")}
            style={styles.docIcon}
          />
          <Text style={styles.docName}>{doc.label}</Text>
          <Text style={[styles.status, { color: doc.file ? "green" : "red" }]}>
            {doc.file ? "Uploaded" : " Not Uploaded"}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default DocumentsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  editIcon: { width: 18, height: 18, tintColor: "#0056ff" },

  docRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  docIcon: { width: 20, height: 20, tintColor: "#0056ff", marginRight: 8 },
  docName: { flex: 1, color: "#000", fontSize: 13 },
  status: { fontSize: 13, fontWeight: "500" },
});
