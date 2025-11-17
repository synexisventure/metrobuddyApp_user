import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileBody = () => {
  const navigation = useNavigation();

  const items = [
    {
      id: 4,
      icon: require("../../assets/images/franchise.png"),
      title: "Become a Partner",
      subtitle: "List your business",
      screen: "BecomePartnerScreen",
    },
    {
      id: 9,
      icon: require("../../assets/images/ticket.png"),
      title: "Raise a Ticket",
      subtitle: "Report an Issue",
      screen: "RaiseTicketScreen",
    },
    {
      id: 1,
      icon: require("../../assets/images/heart.png"),
      title: "Saved Businesses",
      subtitle: "Your favorite places",
      screen: "SavedBusinessesScreen",
    },
    {
      id: 2,
      icon: require("../../assets/images/recent.png"),
      title: "Recent Searches",
      subtitle: "Your search history",
      screen: "RecentScreachesScreen",
    },
    {
      id: 3,
      icon: require("../../assets/images/gift.png"),
      title: "Offers & Deals",
      subtitle: "Exclusive discounts",
      badge: "New",
      screen: "OfferAndDealsScreen",
    },
    {
      id: 5,
      icon: require("../../assets/images/bell.png"),
      title: "Notifications",
      subtitle: "Manage alerts",
      tint: "#2563EB",
      screen: "NotificationsScreen",
    },
    {
      id: 6,
      icon: require("../../assets/images/settings.png"),
      title: "Settings",
      subtitle: "App preferences",
      screen: "SettingsScreen",
    },
    {
      id: 7,
      icon: require("../../assets/images/security.png"),
      title: "Privacy & Security",
      subtitle: "Manage your privacy",
      screen: "PrivacyAndSecurityScreen",
    },
    {
      id: 8,
      icon: require("../../assets/images/help.png"),
      title: "Help & Support",
      subtitle: "Get assistance",
      screen: "HelpAndSupportScreen",
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          style={styles.card}
          onPress={() => navigation.navigate(item.screen)}
        >
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

// --- styles stay the same ---
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
