import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const PrivacyAndSecurityBody = () => {
    const documents = [
        {
            title: "Privacy Policy",
            description: "How we collect, use, and protect your data",
            updated: "Dec 15, 2024",
        },
        {
            title: "Terms of Service",
            description: "Rules and guidelines for using MetroBuddy",
            updated: "Dec 10, 2024",
        },
        {
            title: "Cookie Policy",
            description: "Information about cookies and tracking",
            updated: "Dec 5, 2024",
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Image
                    source={require("../../assets/images/document.png")}
                    style={styles.headerIcon}
                />
                <Text style={styles.headerText}>Legal Documents</Text>
            </View>

            {/* Documents List */}
            {documents.map((item, index) => (
                <TouchableOpacity key={index} style={styles.card}>
                    <Image
                        source={require("../../assets/images/document.png")}
                        style={styles.icon}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.updated}>Last updated: {item.updated}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default PrivacyAndSecurityBody;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerIcon: {
        width: 18,
        height: 18,
        tintColor: "#000",
        marginRight: 8,
    },
    headerText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    card: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: "#2563eb",
        marginRight: 10,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginBottom: 2,
    },
    description: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 4,
    },
    updated: {
        fontSize: 11,
        color: "#6b7280",
    },
});
