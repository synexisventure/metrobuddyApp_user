import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppContext } from "../../context/AppContext";

const TimingCard = ({ timing = [] }) => {
  const navigation = useNavigation();
  const { businessTiming } = useContext(AppContext);

  const onEdit = () => {
    navigation.navigate("BusinessTimingScreen");
  };

  // ✅ Use businessTiming if not passed as prop
  const timingsData = timing.length ? timing : businessTiming?.timeSlots || [];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Timing</Text>
        <TouchableOpacity onPress={onEdit}>
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Render timing list */}
      {timingsData.length > 0 ? (
        timingsData.map((slot, index) => (
          <View key={index} style={styles.slotBlock}>
            <Text style={styles.days}>
              {Array.isArray(slot.day) ? slot.day.join(", ") : slot.day}
            </Text>
            <Text style={styles.time}>
              {slot.openAt && slot.closeAt
                ? `${slot.openAt} - ${slot.closeAt}`
                : "Closed"}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No timing info added.</Text>
      )}
    </View>
  );
};

export default TimingCard;

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

  slotBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    paddingBottom: 4,
  },
  days: { fontSize: 13, color: "#444", fontWeight: "500", flex: 1 },
  time: { fontSize: 13, color: "#000", fontWeight: "600" },
  noData: { fontSize: 13, color: "#999", marginTop: 5 },
});
