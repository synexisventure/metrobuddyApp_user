// components/common/NetworkErrorOverlay.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { AppContext } from "../../context/AppContext";

const NetworkErrorOverlay = ({ onRetry }) => {
  const { networkError, isRetrying } = useContext(AppContext);

  if (!networkError) return null; // invisible if no error

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.subtitle}>
          Please check your connection and try again.
        </Text>

        <TouchableOpacity
          style={[styles.button, isRetrying && { opacity: 0.7 }]}
          onPress={onRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Retry</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NetworkErrorOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
