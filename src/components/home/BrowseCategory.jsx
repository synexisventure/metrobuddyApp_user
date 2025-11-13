import React, { useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ name, iconUrl, bgColor }) => {
    return (
        <TouchableOpacity style={styles.categoryItemContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
                <Image
                    source={{ uri: iconUrl }}
                    style={styles.iconImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.categoryName}>{name}</Text>
        </TouchableOpacity>
    );
};

const BrowseCategory = ({ }) => {

    const navigation = useNavigation();

    const {
        businessGlobalCategory,
        fetchBusinessGlobalCategory,
        businessCategoryLoading,
        IMAGE_BASE_URL,
    } = useContext(AppContext);

    useEffect(() => {
        fetchBusinessGlobalCategory();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Browse Categories</Text>
                <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => navigation.navigate("Categories")}
                >
                    <Text style={styles.viewAllText}>View All</Text>
                    <Image
                        source={require("../../assets/images/forward_icon.png")}
                        resizeMode="contain"
                        style={{ height: 18, width: 18 }}
                    />
                </TouchableOpacity>
            </View>

            {/* Loading State */}
            {businessCategoryLoading ? (
                <ActivityIndicator size="small" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.categoriesGrid}>
                    {businessGlobalCategory && businessGlobalCategory.length > 0 ? (
                        businessGlobalCategory
                            .slice(0, 8) // only show 8 items like before
                            .map((category, index) => (
                                <CategoryItem
                                    key={index}
                                    name={category.name}
                                    iconUrl={`${IMAGE_BASE_URL}/uploads/categoryImages/${category.image}`}
                                    bgColor="#f8f9fa"
                                />
                            ))
                    ) : (
                        <Text style={styles.noDataText}>No categories found</Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default BrowseCategory;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        fontSize: 14,
        color: "#4A90E2",
        fontWeight: "600",
        marginRight: 4,
    },

    // Categories grid
    categoriesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },

    // Category item
    categoryItemContainer: {
        width: "25%", // 4 per row
        alignItems: "center",
        marginBottom: 16,
    },
    iconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    categoryName: {
        fontSize: 12,
        textAlign: "center",
        color: "#333",
        fontWeight: "500",
        width: "90%",
    },
    noDataText: {
        textAlign: "center",
        color: "#666",
        fontSize: 14,
        marginTop: 10,
    },
});
