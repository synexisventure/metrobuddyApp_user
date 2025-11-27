import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Image,
    StyleSheet
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const LeadDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { businessId, sourceType, sourceName } = route.params || {};

    const { API_BASE_URL } = useContext(AppContext);

    const [leadData, setLeadData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    // Icons - EXACTLY as you have
    const icons = {
        backArrow: require('../../assets/images/backArrow.png'),
        profile: require('../../assets/images/user.png'),
        call: require('../../assets/images/phone.png'),
        message: require('../../assets/images/mail.png'),
        map: require('../../assets/images/bell.png'),
        refresh: require('../../assets/images/recent.png'),
    };

    // Activity configuration
    const activityConfig = {
        viewProfile: {
            displayName: 'Profile Views',
            color: '#009FFF',
            gradient: ['#009FFF', '#006DFF'],
            icon: icons.profile
        },
        call: {
            displayName: 'Calls',
            color: '#BDB2FA',
            gradient: ['#BDB2FA', '#8F80F3'],
            icon: icons.call
        },
        message: {
            displayName: 'Messages',
            color: '#93FCF8',
            gradient: ['#93FCF8', '#3BE9DE'],
            icon: icons.message
        },
        map: {
            displayName: 'Map Views',
            color: '#FFA07A',
            gradient: ['#FFA07A', '#FF7F50'],
            icon: icons.map
        },
    };

    const currentActivity = activityConfig[sourceType] || activityConfig.viewProfile;

    const formatDate = (date) => {
        if (!date) return "N/A";
        try {
            return new Date(date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return "N/A";
        }
    };

    // Fetch Lead Details
    const fetchLeadDetails = async (showRefresh = false) => {
        if (!showRefresh) setLoading(true);
        else setRefreshing(true);

        const endpoint = sourceType === "viewProfile" ? "view-profile" : sourceType;

        try {
            const token = await AsyncStorage.getItem("token");

            console.log("api call for id ", businessId);

            const response = await axios.get(
                `${API_BASE_URL}/user/business/leads/${endpoint}/${businessId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                }
            );

            console.log("my resp of ", sourceType, " ", response.data);

            if (response.data?.success) {
                setLeadData({
                    totalLeads: response.data.total,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    data: response.data.users,
                });
                setError(null);
            } else {
                throw new Error(response.data?.message || "Failed to fetch lead details");
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
            Alert.alert("Error", "Failed to load lead details.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLeadDetails();
    }, []);

    const handleCall = (phone) => {
        Alert.alert("Call", `Call ${phone}?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Call", onPress: () => console.log("Calling:", phone) }
        ]);
    };

    const handleMessage = (email) => {
        Alert.alert("Message", `Message ${email}?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Message", onPress: () => console.log("Messaging:", email) }
        ]);
    };

    const renderLeadItem = ({ item: user, index }) => {
        const phone = user?.userId?.phone ?? "Anonymous User";
        const email = user?.userId?.email ?? "No Email";
        const isAnonymous = !user?.userId;

        return (
            <View style={[
                styles.card,
                index % 2 === 0 ? styles.cardEven : styles.cardOdd
            ]}>
                {/* User Header */}
                <View style={styles.userHeader}>
                    <View style={styles.userAvatar}>
                        <Image source={icons.profile} style={styles.avatarIcon} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userPhone}>
                            {isAnonymous ? "Anonymous User" : phone}
                        </Text>
                        <Text style={styles.userEmail}>{email}</Text>
                        {!isAnonymous && (
                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => handleCall(phone)}
                                >
                                    <Image source={icons.call} style={styles.actionIcon} />
                                    <Text style={styles.actionText}>Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.actionButton}
                                    onPress={() => handleMessage(email)}
                                >
                                    <Image source={icons.message} style={styles.actionIcon} />
                                    <Text style={styles.actionText}>Email</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {/* Activity Details */}
                <View style={styles.activitySection}>
                    <Text style={styles.sectionTitle}>Activity Details</Text>
                    
                    <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{user?.todayDate || "N/A"}</Text>
                        </View>
                        
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Time</Text>
                            <Text style={styles.detailValue}>{user?.time || "N/A"}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>First Activity</Text>
                        <Text style={styles.detailValue}>{formatDate(user?.createdAt)}</Text>
                    </View>
                </View>

                {/* Activity Counts */}
                <View style={styles.activitySection}>
                    <Text style={styles.sectionTitle}>Activity Summary</Text>
                    <View style={styles.activityGrid}>
                        <View style={styles.activityItem}>
                            <Text style={styles.activityCount}>{user?.viewProfile || 0}</Text>
                            <Text style={styles.activityLabel}>Profile Views</Text>
                        </View>
                        
                        <View style={styles.activityItem}>
                            <Text style={styles.activityCount}>{user?.call || 0}</Text>
                            <Text style={styles.activityLabel}>Calls</Text>
                        </View>
                        
                        <View style={styles.activityItem}>
                            <Text style={styles.activityCount}>{user?.message || 0}</Text>
                            <Text style={styles.activityLabel}>Messages</Text>
                        </View>
                        
                        <View style={styles.activityItem}>
                            <Text style={styles.activityCount}>{user?.map || 0}</Text>
                            <Text style={styles.activityLabel}>Map Views</Text>
                        </View>
                    </View>
                </View>

                {/* Main Activity Highlight */}
                <LinearGradient
                    colors={currentActivity.gradient}
                    style={styles.mainActivity}
                >
                    <Image source={currentActivity.icon} style={styles.mainActivityIcon} />
                    <View style={styles.mainActivityText}>
                        <Text style={styles.mainActivityLabel}>
                            {currentActivity.displayName}
                        </Text>
                        <Text style={styles.mainActivityCount}>
                            {user?.[sourceType] || user?.viewProfile || 0} times
                        </Text>
                    </View>
                </LinearGradient>
            </View>
        );
    };

    if (loading) {
        return (
            <LinearGradient colors={['#34448B', '#1E2A78']} style={styles.gradientBg}>
                <SafeAreaView style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Loading User Details...</Text>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    if (error) {
        return (
            <LinearGradient colors={['#34448B', '#1E2A78']} style={styles.gradientBg}>
                <SafeAreaView style={styles.errorContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorTitle}>Unable to Load Data</Text>
                    <Text style={styles.errorMessage}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchLeadDetails}>
                        <Text style={styles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#34448B', '#1E2A78']} style={styles.gradientBg}>
            <StatusBar barStyle="light-content" backgroundColor="#34448B" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.backArrow} style={styles.backIcon} />
                    </TouchableOpacity>
                    
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>
                            {sourceName || currentActivity.displayName}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {leadData?.totalLeads || 0} Users Found
                        </Text>
                    </View>
                    
                    <View style={styles.headerPlaceholder} />
                </View>

                {/* User List */}
                <View style={styles.listContainer}>
                    {leadData?.data?.length > 0 ? (
                        <FlatList
                            data={leadData.data}
                            keyExtractor={(item, index) => item?._id || index.toString()}
                            renderItem={renderLeadItem}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={refreshing} 
                                    onRefresh={() => fetchLeadDetails(true)}
                                    colors={['#fff']}
                                    tintColor="#fff"
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateIcon}>👥</Text>
                            <Text style={styles.emptyStateTitle}>No Users Found</Text>
                            <Text style={styles.emptyStateMessage}>
                                No users found for {currentActivity.displayName.toLowerCase()}.
                            </Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientBg: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
        fontWeight: '500',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    errorMessage: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    retryButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    retryButtonText: {
        color: '#34448B',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    backButton: {
        padding: 8,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 2,
    },
    headerPlaceholder: {
        width: 40,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardEven: {
        backgroundColor: 'rgba(255,255,255,0.95)',
    },
    cardOdd: {
        backgroundColor: 'rgba(255,255,255,0.98)',
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8EEFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarIcon: {
        width: 24,
        height: 24,
        tintColor: '#34448B',
    },
    userInfo: {
        flex: 1,
    },
    userPhone: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        marginBottom: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#34448B',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    actionIcon: {
        width: 14,
        height: 14,
        tintColor: '#fff',
        marginRight: 6,
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    activitySection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#34448B',
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    activityGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activityItem: {
        alignItems: 'center',
        flex: 1,
    },
    activityCount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#34448B',
        marginBottom: 2,
    },
    activityLabel: {
        fontSize: 11,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
    },
    mainActivity: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    mainActivityIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
        marginRight: 12,
    },
    mainActivityText: {
        flex: 1,
    },
    mainActivityLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    mainActivityCount: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 16,
        fontWeight: '700',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyStateIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    emptyStateMessage: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default LeadDetailsScreen;

