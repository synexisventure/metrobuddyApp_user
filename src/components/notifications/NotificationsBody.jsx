import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const NotificationsBody = () => {
  const notifications = [
    {
      id: "1",
      title: "Special Offer!",
      message: "Get 20% off at The Grand Plaza Hotel.\nValid until tomorrow!",
      time: "2 hours ago",
      type: "Offer",
      icon: require("../../assets/images/star.png"),
      unread: true,
      badgeColor: "#FFEDE0",
      badgeTextColor: "#FF6B00",
    },
    {
      id: "2",
      title: "Review Reminder",
      message: "How was your experience at Serenity Spa?\nShare your feedback.",
      time: "1 day ago",
      type: "Reminder",
      icon: require("../../assets/images/star.png"),
      unread: true,
      badgeColor: "#FFF4D9",
      badgeTextColor: "#E5A200",
    },
    {
      id: "3",
      title: "New Business Added",
      message: "Café Mocha Delights is now available\nin your area!",
      time: "2 days ago",
      type: "Info",
      icon: require("../../assets/images/star.png"),
      unread: false,
      badgeColor: "#EAF3FF",
      badgeTextColor: "#007AFF",
    },
        {
      id: "4",
      title: "New Business ",
      message: "Café Mocha Delights is now available\nin your area!",
      time: "2 days ago",
      type: "Info",
      icon: require("../../assets/images/star.png"),
      unread: false,
      badgeColor: "#EAF3FF",
      badgeTextColor: "#007AFF",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Left Icon */}
      <View style={styles.iconWrapper}>
        <Image source={item.icon} style={styles.icon} />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          {item.unread && <View style={styles.dot} />}
        </View>

        <Text style={styles.message}>{item.message}</Text>

        <View style={styles.footerRow}>
          <Text style={styles.time}>{item.time}</Text>
          <TouchableOpacity
            style={[
              styles.badge,
              { backgroundColor: item.badgeColor },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: item.badgeTextColor },
              ]}
            >
              {item.type}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default NotificationsBody;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "#3B82F6",
  },
  message: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
