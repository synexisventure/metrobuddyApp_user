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
    StyleSheet, 
    Dimensions
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../context/AppContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const LeadDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { businessId, sourceType, sourceName, businessName } = route.params || {};

    const { API_BASE_URL } = useContext(AppContext);

    const [leadData, setLeadData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);

    // Icons
    const icons = {
        backArrow: require('../../assets/images/backArrow.png'),
        profile: require('../../assets/images/user.png'),
        call: require('../../assets/images/phone.png'),
        message: require('../../assets/images/mail.png'),
        map: require('../../assets/images/location.png'),
        refresh: require('../../assets/images/recent.png'),
        clock: require('../../assets/images/clock.png'),
    };

    // Activity configuration with original colors
    const activityConfig = {
        viewProfile: {
            displayName: 'Profile Views',
            color: '#4A90E2',
            gradient: ['#667eea', '#764ba2'],
            icon: icons.profile,
            bgColor: '#E3F2FD'
        },
        call: {
            displayName: 'Calls',
           color: '#4A90E2',
            gradient: ['#667eea', '#764ba2'],
            icon: icons.profile,
            bgColor: '#E3F2FD'
        },
        message: {
            displayName: 'Messages',
            color: '#4A90E2',
            gradient: ['#667eea', '#764ba2'],
            icon: icons.profile,
            bgColor: '#E3F2FD'
        },
        map: {
            displayName: 'Direction Views',
             color: '#4A90E2',
            gradient: ['#667eea', '#764ba2'],
            icon: icons.profile,
            bgColor: '#E3F2FD'
        },
    };

    const currentActivity = activityConfig[sourceType] || activityConfig.viewProfile;

    const formatTime = (time) => {
        if (!time) return "N/A";
        return time;
    };

    // Fetch Lead Details with Pagination
    const fetchLeadDetails = async (page = 1, showRefresh = false) => {
        if (!showRefresh && page === 1) setLoading(true);
        else setRefreshing(true);

        const endpoint = sourceType === "viewProfile" ? "view-profile" : sourceType;

        try {
            const token = await AsyncStorage.getItem("token");

            const response = await axios.get(
                `${API_BASE_URL}/user/business/leads/${endpoint}/${businessId}?page=${page}&limit=5`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                }
            );

            if (response.data?.success) {
                setLeadData(response.data.users || []);
                setCurrentPage(page);
                setTotalPages(response.data.totalPages || 1);
                setTotalLeads(response.data.total || 0);
                setError(null);
            } else {
                throw new Error(response.data?.message || "Failed to fetch lead details");
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
            if (page === 1) {
                Alert.alert("Error", "Failed to load lead details.");
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchLeadDetails(page);
        }
    };

    // Refresh function
    const onRefresh = () => {
        fetchLeadDetails(1, true);
    };

    useEffect(() => {
        fetchLeadDetails(1);
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

    // Generate page numbers to display - Responsive based on screen width
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = screenWidth < 400 ? 3 : screenWidth < 500 ? 4 : 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages are less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages with ellipsis
            if (currentPage <= 3) {
                // Near the start
                for (let i = 1; i <= maxVisiblePages - 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // In the middle
                pages.push(1);
                pages.push('...');
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const renderLeadItem = ({ item: user, index }) => {
        const phone = user?.userId?.phone ?? "Anonymous User";
        const email = user?.userId?.email ?? "No Email";
        const isAnonymous = !user?.userId;
        const mainActivityCount = user?.[sourceType] || user?.viewProfile || 0;

        return (
            <View style={styles.card}>
                {/* User Header Section */}
                <View style={styles.userHeader}>
                    <View style={styles.avatarContainer}>
                        <View style={[
                            styles.avatar,
                            { backgroundColor: currentActivity.bgColor }
                        ]}>
                            <Image 
                                source={icons.profile} 
                                style={styles.avatarIcon}
                            />
                        </View>
                        {!isAnonymous && (
                            <View style={styles.onlineIndicator} />
                        )}
                    </View>
                    
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>
                            {isAnonymous ? "Anonymous User" : phone}
                        </Text>
                        <Text style={styles.userEmail}>{email}</Text>
                        
                        <View style={[styles.activityBadge, { backgroundColor: currentActivity.color }]}>
                            <Image 
                                source={currentActivity.icon} 
                                style={styles.activityBadgeIcon}
                            />
                            <Text style={styles.activityBadgeText}>
                                {mainActivityCount} {currentActivity.displayName}
                            </Text>
                        </View>
                    </View>
                    
                    {!isAnonymous && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity 
                                style={[styles.actionBtn, styles.callBtn]}
                                onPress={() => handleCall(phone)}
                            >
                                <Image source={icons.call} style={styles.actionIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.actionBtn, styles.messageBtn]}
                                onPress={() => handleMessage(email)}
                            >
                                <Image source={icons.message} style={styles.actionIcon} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Timeline Section */}
                <View style={styles.timelineSection}>
                    <View style={styles.timelineHeader}>
                        <Image source={icons.clock} style={styles.timelineHeaderIcon} />
                        <Text style={styles.timelineTitle}>Activity Time</Text>
                    </View>
                    
                    <View style={styles.timelineContent}>
                        <View style={styles.timelineItem}>
                            <View style={[styles.timelineDot, { backgroundColor: currentActivity.color }]} />
                            <View style={styles.timelineInfo}>
                                <Text style={styles.timelineValue}>
                                    {user?.todayDate || "N/A"} • {formatTime(user?.time)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    // Responsive Pagination Controls Component
    const PaginationControls = () => (
        <View style={styles.paginationContainer}>
            {/* Previous Button */}
            <TouchableOpacity
                style={[
                    styles.navButton,
                    currentPage === 1 && styles.disabledButton
                ]}
                onPress={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <Text style={[
                    styles.navButtonText,
                    currentPage === 1 && styles.disabledButtonText
                ]}>
                    Prev
                </Text>
            </TouchableOpacity>

            {/* Page Numbers - Center aligned with responsive sizing */}
            <View style={styles.pageNumbersContainer}>
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <View style={styles.ellipsisContainer}>
                                <Text style={styles.ellipsis}>•••</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.pageNumber,
                                    page === currentPage && styles.activePageNumber
                                ]}
                                onPress={() => handlePageChange(page)}
                            >
                                <Text style={[
                                    styles.pageNumberText,
                                    page === currentPage && styles.activePageNumberText
                                ]}>
                                    {page}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </React.Fragment>
                ))}
            </View>

            {/* Page Info for small screens */}
            {/* {screenWidth < 400 && (
                <View style={styles.pageInfoMobile}>
                    <Text style={styles.pageInfoText}>
                        {currentPage} / {totalPages}
                    </Text>
                </View>
            )} */}

            {/* Next Button */}
            <TouchableOpacity
                style={[
                    styles.navButton,
                    currentPage === totalPages && styles.disabledButton
                ]}
                onPress={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <Text style={[
                    styles.navButtonText,
                    currentPage === totalPages && styles.disabledButtonText
                ]}>
                    Next 
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (loading && currentPage === 1) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={currentActivity.color} />
                <Text style={styles.loadingText}>Loading Lead Details...</Text>
            </View>
        );
    }

    // if (error && leadData.length === 0) {
    //     return (
    //         <View style={styles.errorContainer}>
    //             <Image source={icons.map} style={styles.errorIcon} />
    //             <Text style={styles.errorTitle}>Unable to Load Data</Text>
    //             <Text style={styles.errorMessage}>{error}</Text>
    //             <TouchableOpacity style={[styles.retryButton, { backgroundColor: currentActivity.color }]} onPress={() => fetchLeadDetails(1)}>
    //                 <Text style={styles.retryButtonText}>Try Again</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={currentActivity.gradient[0]} />
            
            {/* Header */}
            <LinearGradient
                colors={currentActivity.gradient}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.headerContent}>
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
                        {/* <Text style={styles.headerSubtitle}>
                            {businessName} • {totalLeads} Users • Page {currentPage} of {totalPages}
                        </Text> */}
                        <Text style={styles.headerSubtitle}>
                            {businessName} • Page {currentPage} of {totalPages}
                        </Text>
                    </View>
                    
                    {/* <TouchableOpacity 
                        style={styles.refreshButton}
                        onPress={onRefresh}
                    >
                        <Image source={icons.refresh} style={styles.refreshIcon} />
                    </TouchableOpacity> */}
                </View>
            </LinearGradient>

            {/* Content */}
            <View style={styles.content}>
                {leadData.length > 0 ? (
                    <>
                        <FlatList
                            data={leadData}
                            keyExtractor={(item, index) => `${item?._id || index}_${index}`}
                            renderItem={renderLeadItem}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={refreshing} 
                                    onRefresh={onRefresh}
                                    colors={[currentActivity.color]}
                                    tintColor={currentActivity.color}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                        />
                        
                        {/* Pagination Controls */}
                        {totalPages > 1 && <PaginationControls />}
                    </>
                ) : (
                    <View style={styles.emptyState}>
                        {/* <Image source={icons.profile} style={styles.emptyStateIcon} /> */}
                        <Text style={styles.emptyStateTitle}>No Leads Found</Text>
                        <Text style={styles.emptyStateMessage}>
                            No Leadss found for {currentActivity.displayName.toLowerCase()}.
                        </Text>
                        {/* <TouchableOpacity 
                            style={[styles.emptyStateButton, { backgroundColor: currentActivity.color }]}
                            onPress={onRefresh}
                        >
                            <Text style={styles.emptyStateButtonText}>Refresh</Text>
                        </TouchableOpacity> */}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#F8F9FA',
    },
    errorIcon: {
        width: 64,
        height: 64,
        marginBottom: 16,
        tintColor: '#FF6B6B',
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
        marginTop: 16,
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    retryButton: {
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
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        paddingTop: 16,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
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
        marginHorizontal: 8,
    },
    headerTitle: {
        color: '#fff',
        fontSize: screenWidth < 400 ? 18 : 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: screenWidth < 400 ? 12 : 14,
        marginTop: 4,
        textAlign: 'center',
    },
    refreshButton: {
        padding: 8,
    },
    refreshIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    content: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    listContent: {
        padding: 16,
        paddingBottom: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatarIcon: {
        width: 20,
        height: 20,
        tintColor: '#4A90E2',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#34C759',
        borderWidth: 2,
        borderColor: '#fff',
    },
    userInfo: {
        flex: 1,
        marginRight: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: '500',
        marginBottom: 8,
    },
    activityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    activityBadgeIcon: {
        width: 12,
        height: 12,
        tintColor: '#fff',
    },
    activityBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 6,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    callBtn: {
        backgroundColor: '#34C759',
    },
    messageBtn: {
        backgroundColor: '#FF9500',
    },
    actionIcon: {
        width: 14,
        height: 14,
        tintColor: '#fff',
    },
    timelineSection: {
        marginBottom: 0,
    },
    timelineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timelineHeaderIcon: {
        width: 16,
        height: 16,
        tintColor: '#666',
    },
    timelineTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3E50',
        marginLeft: 6,
    },
    timelineContent: {
        paddingLeft: 10,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    timelineInfo: {
        flex: 1,
    },
    timelineValue: {
        fontSize: 13,
        color: '#2C3E50',
        fontWeight: '600',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyStateIcon: {
        width: 70,
        height: 70,
        tintColor: '#CCD1D1',
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateMessage: {
        fontSize: 13,
        color: '#7F8C8D',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 18,
        paddingHorizontal: 20,
    },
    emptyStateButton: {
        paddingHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    emptyStateButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    // Responsive Pagination Styles
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        minHeight: 60,
    },
    navButton: {
        backgroundColor: '#B91C1C',
        paddingHorizontal: screenWidth < 400 ? 12 : 16,
        paddingVertical: 8,
        borderRadius: 6,
        minWidth: screenWidth < 400 ? 60 : 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#E0E0E0',
    },
    navButtonText: {
        color: '#fff',
        fontSize: screenWidth < 400 ? 12 : 14,
        fontWeight: '600',
    },
    disabledButtonText: {
        color: '#9E9E9E',
    },
    pageNumbersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 8,
        flexWrap: 'wrap',
    },
    pageNumber: {
        width: screenWidth < 400 ? 32 : 36,
        height: screenWidth < 400 ? 32 : 36,
        borderRadius: 6,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginHorizontal: 2,
    },
    activePageNumber: {
        backgroundColor: '#B91C1C',
        borderColor: '#B91C1C',
    },
    pageNumberText: {
        fontSize: screenWidth < 400 ? 12 : 14,
        fontWeight: '600',
        color: '#666',
    },
    activePageNumberText: {
        color: '#fff',
    },
    ellipsisContainer: {
        width: screenWidth < 400 ? 24 : 28,
        height: screenWidth < 400 ? 32 : 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    ellipsis: {
        fontSize: screenWidth < 400 ? 12 : 14,
        fontWeight: '600',
        color: '#666',
    },
    pageInfoMobile: {
        position: 'absolute',
        bottom: 4,
        alignSelf: 'center',
    },
    pageInfoText: {
        fontSize: 11,
        color: '#666',
        fontWeight: '500',
    },
});

export default LeadDetailsScreen;