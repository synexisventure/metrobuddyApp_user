import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
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

        businessDetails,
        businussTiming,

        setBusinessDetails,
        setContactDetails,
        setBusinessTiming,
        setBusinessCategory,
        setBusinessProducts,
        setBusinessMedia,
        setBusinessDocuments,
    } = useContext(AppContext);

    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);

     
    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await fetchAllBusinesses();
                console.log("business Details :", businessDetails);
            };

            loadData();
        }, [businessDetails])
    );

    const fetchAllBusinesses = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${API_BASE_URL}/user/partner_forms/all_business`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("your all business : ", response);

            if (response.data?.status) {
                setBusinessList(response.data.existBusiness || []);
            }
        } catch (error) {
            console.error(" Failed to fetch businesses:", error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading businesses...</Text>
                {/* <LoadingOverlay/> */}
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <StepFormsHeader 
            
            title="Your Businesses"
            subtitle="Manage your business profiles"
            
            />

            {/* Content */}
            <ScrollView contentContainerStyle={styles.container}>
                {/* <Text style={styles.subtitle}>Manage your business profiles</Text> */}
                {
                    (businessList.length === 0) && (
                        <Text style={{ textAlign: 'center', color: '#7A7A7A', marginTop: 20 }}>
                            No businesses found. Please add a new business.
                        </Text>
                    )
                }

                {/* Business List */}
                <View style={styles.listWrapper}>
                    {businessList.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            style={styles.businessCard}
                        // onPress={async () => {
                        //     const bizId = item?.businessId?._id;
                        //     if (bizId) {
                        //         await AsyncStorage.setItem("businessId", bizId);
                        //     }
                        //     // navigation.navigate("BecomePartnerFormScreen", { businessId: bizId }); 
                        //     navigation.navigate("DashboardScreen");
                        // }}
                        >
                            {/* <Text style={styles.businessName}>{item.businessName}</Text>
                            <Text style={styles.businessId}>ID: {item?.businessId?._id}</Text> */}
                            <BecomePartnerCard
                                data={item} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Add New Business */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.addNewButton}

                    onPress={async () => {
                        await AsyncStorage.removeItem("businessId");
                        await setBusinessDetails(null);
                        await setBusinessDetails(null);
                        await setContactDetails(null);
                        await setBusinessTiming(null);
                        await setBusinessCategory(null);
                        await setBusinessProducts(null);
                        await setBusinessMedia(null);
                        await setBusinessDocuments(null);
                        navigation.navigate("BecomePartnerFormScreen");
                    }}
                >
                    <Text style={styles.addNewText}>+ Add New Business</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default BecomePartnerScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 40,
    },
    subtitle: {
        fontSize: 13,
        color: '#5B5B5B',
        textAlign: 'center',
        marginBottom: 14,
    },
    listWrapper: {
        width: '100%',
        backgroundColor: '#fff',
    },
    businessCard: {
        backgroundColor: '#fff',
    },
    businessName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0A0A0A',
        marginBottom: 2,
    },
    businessId: {
        fontSize: 12,
        color: '#7A7A7A',
    },
    addNewButton: {
        marginTop: 18,
        backgroundColor: '#155DFC',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addNewText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
