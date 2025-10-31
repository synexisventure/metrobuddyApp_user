import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const FilePickerModal = ({ visible, onClose, onSelect, options = [] }) => {
  useEffect(() => {
    console.log("Modal visibility changed:", visible);
  }, [visible]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Choose File Source</Text>

          {/* Dynamically render buttons */}
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.option}
              onPress={() => {
                onSelect(opt.id);
                onClose();
              }}
            >
              {opt.icon && (
                <Image source={opt.icon} style={styles.icon} />
              )}
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}

          {/* Cancel button */}
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={[styles.optionText, { color: "#999" }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilePickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 18,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 18,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderColor: "#eee",
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: "#007bff",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
    fontWeight: "500",
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
