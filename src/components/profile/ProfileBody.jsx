import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfileBody = () => {
  const items = [
    {
      id: 1,
      icon: require("../../assets/images/heart.png"),
      title: "Saved Businesses",
      subtitle: "Your favorite places",
    },
    {
      id: 2,
      icon: require("../../assets/images/recent.png"),
      title: "Recent Searches",
      subtitle: "Your search history",
    },
    {
      id: 3,
      icon: require("../../assets/images/gift.png"),
      title: "Offers & Deals",
      subtitle: "Exclusive discounts",
      badge: "New",
    },
    {
      id: 4,
      icon: require("../../assets/images/franchise.png"),
      title: "Become a Partner",
      subtitle: "List your business",
    },
    {
      id: 5,
      icon: require("../../assets/images/bell.png"),
      title: "Notifications",
      subtitle: "Manage alerts",
      tint: "#2563EB", // blue tint for notifications
    },
    {
      id: 6,
      icon: require("../../assets/images/settings.png"),
      title: "Settings",
      subtitle: "App preferences",
    },
    {
      id: 7,
      icon: require("../../assets/images/security.png"),
      title: "Privacy & Security",
      subtitle: "Manage your privacy",
    },
    {
      id: 8,
      icon: require("../../assets/images/help.png"),
      title: "Help & Support",
      subtitle: "Get assistance",
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.card}>
          <View style={styles.left}>
            <Image
              source={item.icon}
              style={[styles.icon, item.tint ? { tintColor: item.tint } : null]}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>

          <View style={styles.right}>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
            <Image
              source={require("../../assets/images/forward_icon.png")}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileBody;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FBFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  arrow: {
    width: 12,
    height: 12,
    tintColor: "#9CA3AF",
  },
  badge: {
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    color: "#F97316",
    fontWeight: "600",
  },
});
