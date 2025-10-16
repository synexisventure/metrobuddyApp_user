import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProfileHeader = () => {
    return (
        <View style={styles.main}>
            {/* --- Top Row (Image + Info) --- */}
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.profileImage}>
                        <Image
                            source={require("../../assets/images/user.png")}
                            style={styles.iconImage}
                        />
                    </View>

                    <TouchableOpacity style={styles.editIcon}>
                        <Image
                            source={require("../../assets/images/edit.png")}
                            style={styles.editImage}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>Priya Sharma</Text>
                    <Text style={styles.memberSince}>Member since Jan 2024</Text>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Premium Member</Text>
                    </View>
                </View>
            </View>

            {/* --- Contact Info Section --- */}
            <View style={styles.detailsContainer}>
                <View style={styles.row}>
                    <Image
                        source={require("../../assets/images/phone.png")}
                        style={styles.rowIcon}
                    />
                    <Text style={styles.text}>+91 98765 43210</Text>
                </View>

                <View style={styles.row}>
                    <Image
                        source={require("../../assets/images/mail.png")}
                        style={styles.rowIcon}
                    />
                    <Text style={styles.text}>priya.sharma@email.com</Text>
                </View>

                <View style={styles.row}>
                    <Image
                        source={require("../../assets/images/location.png")}
                        style={styles.rowIcon}
                    />
                    <Text style={styles.text}>Mumbai, Maharashtra</Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileHeader;

const styles = StyleSheet.create({
    main: {
        // backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    imageContainer: {
        position: "relative",
        marginRight: 15,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#F2F4F7",
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        width: 34,
        height: 34,
        tintColor: "#6B7280",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 4,
        elevation: 3,
    },
    editImage: {
        width: 14,
        height: 14,
        tintColor: "#000",
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    memberSince: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
        marginBottom: 8,
    },
    badge: {
        alignSelf: "flex-start",
        backgroundColor: "#EAF1FF",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 11,
        color: "#2F6FE8",
        fontWeight: "500",
    },

    /* --- Contact Info --- */
    detailsContainer: {
        paddingLeft: 5,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        paddingTop: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    rowIcon: {
        width: 14,
        height: 14,
        tintColor: "#5A5A5A",
    },
    text: {
        fontSize: 13,
        color: "#374151",
        marginLeft: 8,
    },
});
