import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NotificationHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {/* Back Button */}
            <View style={{flexDirection : "row" , alignItems : "center"}}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
                >
                    <Image
                        source={require("../../assets/images/backArrow.png")}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>

                {/* Title and Subtext */}
                <View>
                    <Text style={styles.title}>Notifications</Text>
                    <Text style={styles.subtitle}>2 unread</Text>
                </View>
            </View>

            {/* Right Buttons */}
            <View style={styles.rightButtons}>
                <TouchableOpacity style={styles.markAllBtn}>
                    <Text style={styles.markAllText}>Mark all read</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn}>
                    <Image
                        source={require("../../assets/images/settings.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NotificationHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        paddingRight: 10,
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: "#000",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    subtitle: {
        fontSize: 13,
        color: "#888",
    },
    rightButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    markAllBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: "#f1f1f1",
        marginRight: 8,
    },
    markAllText: {
        fontSize: 13,
        color: "#000",
        fontWeight: "500",
    },
    iconBtn: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    icon: {
        width: 18,
        height: 18,
        tintColor: "#555",
    },
});
