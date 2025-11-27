import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const { width } = Dimensions.get('window');

const LeadsScreen = () => {
  const navigation = useNavigation();
  const {
    API_BASE_URL,
    IMAGE_BASE_URL,

    businessList,
    isBusinessListLoading,
    getMyBusinessList

  } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => { 
        if(!businessList){
          await getMyBusinessList();
        }
      };
      loadData();
    }, [])
  );


  const handleBusinessPress = (business) => { 
    console.log("navigate to : " , business?.businessId); 
      navigation.navigate("SingleLeadScreen", {
        businessId: business?.businessId,
        // businessName: business.businessName,
        business: business
      }); 
  };

  const renderBusinessCard = (item) => {
    const logoUrl = item?.logo
      ? `${IMAGE_BASE_URL}/uploads/businessImages/${item.logo}`
      : null;

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleBusinessPress(item)}
        activeOpacity={0.9}
      >
        {/* Main Content with Logo */}
        <View style={styles.cardContent}>
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
                  {item?.businessName?.charAt(0)?.toUpperCase() || 'N'}
                </Text>
              </View>
            )}

            {/* Title + Rating */}
            <View style={styles.titleContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.businessName} numberOfLines={1}>
                  {item?.businessName || 'NA'}
                </Text>

                <View style={styles.ratingContainer}>
                  <Image
                    source={require('../../assets/images/star.png')}
                    style={styles.starIcon}
                  />
                  <Text style={styles.rating}>
                    {item?.rating ? `${item.rating} (${item?.reviews || 0})` : '5.0'}
                  </Text>
                </View>
              </View>

              {/* Category */}
              <Text style={styles.category}>
                {item?.category || 'Business'}
              </Text>
            </View>
          </View>

          {/* Divider Line */}
          <View style={styles.divider} />

          {/* Location and Status Row */}
          <View style={styles.bottomRow}>
            <View style={styles.infoItem}>
              <Image
                source={require('../../assets/images/location.png')}
                style={styles.icon}
              />
              <Text style={styles.address} numberOfLines={1}>
                {item?.address
                  ? `${item?.address?.city || ''}, ${item?.address?.state || ''}`
                  : 'Location not specified'}
              </Text>
            </View>

          </View>

          {/* Leads Count */}
          <View style={styles.leadsRow}>
            <View style={styles.leadsInfo}>
              <Image
                source={require('../../assets/images/leads.png')}
                style={styles.leadsIcon}
              />
            </View>
            <Text style={styles.viewLeadsText}>
              View Leads →
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isBusinessListLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#155DFC" barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#155DFC" />
          <Text style={styles.loadingText}>Loading businesses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#155DFC" barStyle="light-content" />

      {/* Custom Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/images/backArrow.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Business Leads</Text>
          <Text style={styles.headerSubtitle}>
            Select a business to view leads
          </Text>
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card with Leads Image */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeImageContainer}>
            <Image
              source={require('../../assets/images/leads.png')}
              style={styles.welcomeImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Manage Leads </Text>
            <Text style={styles.welcomeSubtitle}>
              Track and manage leads for your businesses
            </Text>
          </View>
        </View>

        {/* Business List Section */}
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
                Start by adding your first business to get leads
              </Text>
            </View>
          ) : (
            <View style={styles.listWrapper}>
              {businessList.map((item, index) => (
                <View key={index}>
                  {renderBusinessCard(item)}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Footer Note */}
        <Text style={styles.footerText}>
          Select a business to view detailed leads and analytics
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeadsScreen;

const styles = StyleSheet.create({
  container: {
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
  // Header Styles
  header: {
    backgroundColor: '#155DFC',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backArrow: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  // Welcome Card
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcomeImageContainer: {
    marginRight: 16,
  },
  welcomeImage: {
    width: 60,
    height: 60,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  listWrapper: {
    width: '100%',
  },
  // Business Card Styles (Same as BecomePartnerCard)
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
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
  businessName: {
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
    marginBottom: 8,
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
  icon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  leadsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  leadsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leadsIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 6,
  },
  leadsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#155DFC',
  },
  viewLeadsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#155DFC',
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
    backgroundColor: '#155DFC',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#155DFC',
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