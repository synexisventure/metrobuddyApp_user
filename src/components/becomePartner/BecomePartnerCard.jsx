import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';

const BecomePartnerCard = ({ data = {} }) => {
    const navigation = useNavigation();
    const { IMAGE_BASE_URL } = useContext(AppContext);

    useEffect(() => {
        console.log("Card Data : ", data);
        console.log(`${IMAGE_BASE_URL}/uploads/businessImages/${data.logo}`);
    }, [data]);

    const logoUrl = data?.logo 
        ? `${IMAGE_BASE_URL}/uploads/businessImages/${data.logo}`
        : null;

    return (
        <TouchableOpacity style={styles.container}
            onPress={async () => {
                const bizId = data?.businessId;
                console.log("navigation to dashboard : " , data?.businessId );
                
                if (bizId) {
                    await AsyncStorage.setItem("businessId", bizId);
                }
                navigation.navigate("DashboardScreen",{
                    businessId : bizId,
                });
            }}
            activeOpacity={0.9}>
            
            {/* Main Content with Logo */}
            <View style={styles.content}>
                {/* Logo + Title Row */}
                <View style={styles.headerRow}>
                    {/* Logo with Border */}
                    {logoUrl ? (
                        <View style={styles.logoContainer}>
                            <Image
                                source={{ uri: logoUrl }}
                                style={styles.logo}
                            />
                        </View>
                    ) : (
                        <View style={[styles.logoContainer, styles.placeholderLogo]}>
                            <Text style={styles.placeholderText}>
                                {data?.businessName?.charAt(0)?.toUpperCase() || 'N'}
                            </Text>
                        </View>
                    )}
                    
                    {/* Title + Rating */}
                    <View style={styles.titleContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.hotelName} numberOfLines={1}>
                                {data?.businessName || 'NA'}
                            </Text>

                            <View style={styles.ratingContainer}>
                                <Image
                                    source={require('../../assets/images/star.png')}
                                    style={styles.starIcon}
                                />
                                <Text style={styles.rating}>
                                    {data?.rating ? `${data.rating} (${data?.reviews || 0})` : '5.0'}
                                </Text>
                            </View>
                        </View>

                        {/* Category */}
                        <Text style={styles.category}>
                            {data?.category || 'NA'}
                        </Text>
                    </View>
                </View>

                {/* Divider Line */}
                <View style={styles.divider} />

                {/* Location and Hours Row */}
                <View style={styles.bottomRow}>
                    <View style={styles.infoItem}>
                        <Image
                            source={require('../../assets/images/location.png')}
                            style={styles.icon}
                        /> 
                        <Text style={styles.address} numberOfLines={1}>
                            {data?.address
                                ? `${data?.address?.plotNo || ''} ${data?.address?.street || ''}, ${data?.address?.city || ''}`
                                : 'NA'}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Image
                            source={require('../../assets/images/clock.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.hours}>
                            {data?.hours || 'NA'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BecomePartnerCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 12,
    },
    content: {
        marginBottom: 0,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: '#fafafa',
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 9,
        resizeMode: 'cover',
    },
    placeholderLogo: {
        backgroundColor: '#f8f9fa',
        borderColor: '#e0e0e0',
    },
    placeholderText: {
        color: '#999',
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff8e6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ffeeba',
        flexShrink: 0,
    },
    starIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },
    rating: {
        fontSize: 11,
        fontWeight: '600',
        color: '#e6a700',
        marginLeft: 4,
    },
    category: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#e1f0ff',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 12,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    address: {
        fontSize: 12,
        color: '#666',
        flex: 1,
        marginLeft: 6,
        fontWeight: '400',
    },
    hours: {
        fontSize: 12,
        color: '#666',
        marginLeft: 6,
        fontWeight: '500',
    },
    icon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },
});