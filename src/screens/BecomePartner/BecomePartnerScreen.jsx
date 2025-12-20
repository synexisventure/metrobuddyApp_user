import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
    StatusBar,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

import StepFormsHeader from '../../components/becomePartner/StepFormsHeader';
import BecomePartnerCard from "../../components/becomePartner/BecomePartnerCard";

const BecomePartnerScreen = () => {

    const navigation = useNavigation()

    const { API_BASE_URL,

        setBusinessDetails,
        setContactDetails,
        setBusinessTiming,
        setBusinessCategory,
        setBusinessProducts,
        setBusinessMedia,
        setBusinessDocuments,

        businessList,
        isBusinessListLoading,
        getMyBusinessList,


    } = useContext(AppContext);

    const [userPhone, setUserPhone] = useState('');

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await fetchUserPhone();
                await getMyBusinessList();
            };
            loadData();
        }, [])
    );

    const fetchUserPhone = async () => {
        try {
            const phone = await AsyncStorage.getItem("userPhone");
            setUserPhone(phone || 'Not Available');
        } catch (error) {   
            console.error("Error fetching phone:", error);
        }
    };

    const handleBusinessPress = async (business) => {
        // this naviagtion done from its child card
        
        // const bizId = business?.businessId._id; 
        // console.log("navigation to dashboard......");
        
        // if (bizId) {
        //     await AsyncStorage.setItem("businessId", bizId);
        //     navigation.navigate("DashboardScreen", {
        //         businessId: bizId,
        //         businessName: business.businessName
        //     });
        // }
    };

    // Calculate total leads count
    const totalLeadsCount = businessList.reduce((total, business) => {
        return total + (business.leadCount || 0);
    }, 0);

    if (isBusinessListLoading && businessList.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#B91C1C" />
                <Text style={styles.loadingText}>Loading your dashboard...</Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor="#B91C1C" barStyle="light-content" />

            {/* Header */}
            <StepFormsHeader
                title="Business Dashboard"
                subtitle="Manage your business profiles"
            />

            {/* Content */}
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Welcome Section */}
                <View style={styles.welcomeCard}>
                    <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeTitle}>Welcome Back! 👋</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Manage your businesses from one place
                        </Text>
                    </View>
                    <View style={styles.phoneBadge}>
                        <Text style={styles.phoneText}>{userPhone}</Text>
                    </View>
                </View>

                {/* Quick Actions - Only show when businesses exist */}
                {/* {businessList.length > 0 && (
                    <View style={styles.actionsContainer}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
 
                        <TouchableOpacity
                            style={styles.leadsActionCard}
                            onPress={() => { navigation.navigate("LeadsScreen") }}
                            activeOpacity={0.8}
                        >
                            <View style={styles.leadsCardContent}> 
                                <View style={styles.leadsLeftContent}>
                                    <View style={styles.leadsIconContainer}>
                                        <Image
                                            source={require('../../assets/images/franchise.png')}
                                            style={styles.leadsIcon}
                                        />
                                    </View>
                                    <View style={styles.leadsTextContainer}>
                                        <Text style={styles.leadsTitle}>All Leads</Text>
                                        <Text style={styles.leadsSubtitle}>
                                            View and manage all your business leads
                                        </Text>
                                    </View>
                                </View> 
                                <View style={styles.leadsRightContent}>
                                    {totalLeadsCount > 0 && (
                                        <View style={styles.leadsCountBadge}>
                                            <Text style={styles.leadsCountText}>
                                                {totalLeadsCount}
                                            </Text>
                                        </View>
                                    )}
                                    <View style={styles.arrowContainer}> 
                                        <Text> {">"}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )} */}

                {/* Your Businesses Section */}
                <View style={styles.businessesSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Your Businesses</Text>
                        <Text style={styles.sectionSubtitle}>
                            {businessList.length} business{businessList.length !== 1 ? 'es' : ''} registered
                        </Text>
                    </View>

                    {businessList.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyEmoji}>🏢</Text>
                            <Text style={styles.emptyTitle}>No Businesses Found</Text>
                            <Text style={styles.emptyText}>
                                Start by adding your first business to get started
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.listWrapper}>
                            {businessList.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={styles.businessCard}
                                    onPress={() => handleBusinessPress(item)}
                                >
                                    <BecomePartnerCard data={item} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Add New Business Button */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.addNewButton}
                    onPress={async () => {
                        await AsyncStorage.removeItem("businessId");
                        setBusinessDetails(null);
                        setContactDetails(null);
                        setBusinessTiming(null);
                        setBusinessCategory(null);
                        setBusinessProducts(null);
                        setBusinessMedia(null);
                        setBusinessDocuments(null);
                        navigation.navigate("BecomePartnerFormScreen");
                    }}
                >
                    <Text style={styles.addNewText}>+ Add New Business</Text>
                </TouchableOpacity>

                {/* Footer Note */}
                <Text style={styles.footerText}>
                    Manage all your businesses from one place
                </Text>
            </ScrollView>
        </View>
    );
};

export default BecomePartnerScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 40,
    },
    // Welcome Section
    welcomeCard: {
        backgroundColor: '#B91C1C',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    welcomeTextContainer: {
        flex: 1,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    phoneBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    phoneText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    // Actions Section
    actionsContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 16,
    },
    // All Leads Action Card
    leadsActionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#B91C1C',
    },
    leadsCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leadsLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    leadsIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    leadsIcon: {
        width: 24,
        height: 24,
    },
    leadsTextContainer: {
        flex: 1,
    },
    leadsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 4,
    },
    leadsSubtitle: {
        fontSize: 14,
        color: '#7f8c8d',
        lineHeight: 18,
    },
    leadsRightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leadsCountBadge: {
        backgroundColor: '#B91C1C',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 12,
    },
    leadsCountText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    arrowContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        width: 16,
        height: 16,
        tintColor: '#B91C1C',
    },
    // Businesses Section
    businessesSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    listWrapper: {
        width: '100%',
    },
    businessCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    // Empty State
    emptyState: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#7f8c8d',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#bdc3c7',
        textAlign: 'center',
        lineHeight: 20,
    },
    // Add New Button
    addNewButton: {
        backgroundColor: '#B91C1C',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#B91C1C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginBottom: 20,
    },
    addNewText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    // Footer
    footerText: {
        color: '#95a5a6',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
});