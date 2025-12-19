import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'

const SubscriptionDetailsScreen = () => {
  const navigation = useNavigation()
  const { API_BASE_URL } = useContext(AppContext)

  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      fetchSubscriptions()
    }, [])
  )

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("token")

      const response = await axios.get(`${API_BASE_URL}/user/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const subsArray = response.data.data || []

      console.log("SUBS ARRAY:", subsArray)

      if (subsArray.length > 0) {
        setSubscription(subsArray[0]) // <-- YOUR FIX
      } else {
        setSubscription(null)
      }

    } catch (error) {
      Alert.alert("Error", "Failed to load subscriptions")
      console.log("SUB ERROR:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#155DFC" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN')
  }

  const getPrice = () => {
    if (!subscription) return 'N/A'
    const price =
      subscription.planType === 'monthly'
        ? subscription.subscriptionId?.monthlyPrice
        : subscription.subscriptionId?.yearlyPrice

    return `₹${price}`
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Subscription Details</Text>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate('SubscriptionScreen' , {isNavigateToBack : true})}
        >
          <Image source={require('../../assets/images/security.png')} style={styles.icon} />
          <Text style={styles.buyText}>
            {subscription ? 'Upgrade' : 'Buy Now'}
          </Text>
        </TouchableOpacity>
      </View>

      {!subscription ? (
        // NO SUBSCRIPTION
        <View style={styles.card}>
          <Image source={require('../../assets/images/security.png')} style={styles.bigIcon} />
          <Text style={styles.cardTitle}>No Active Subscription</Text>
          <Text style={styles.cardText}>Upgrade to unlock premium features</Text>

          {/* <View style={styles.features}>
            {['More Business Leads', 'Advanced Analytics', 'Priority Support'].map((f, i) => (
              <View key={i} style={styles.feature}>
                <Image source={require('../../assets/images/check.png')} style={styles.checkIcon} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View> */}
        </View>
      ) : (
        // ACTIVE SUBSCRIPTION UI
        <>
          <View style={styles.card}>

            <View style={styles.planHeader}>
              <View style={[styles.badge, { backgroundColor: '#4A90E2' }]}>
                <Text style={styles.badgeText}>{subscription.subscriptionId?.planName}</Text>
              </View>

              <View style={[styles.status, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>

            <Text style={styles.planType}>{subscription.planType} Plan</Text>
            <Text style={styles.price}>{getPrice()}</Text>

            <View style={styles.details}>
              <Detail label="Start Date" value={formatDate(subscription.startDate)} />
              <Detail label="End Date" value={formatDate(subscription.endDate)} />
              <Detail label="Business" value={subscription.businessId?.businessName} />
              <Detail label="Plan Type" value={subscription.planType} />
            </View>
            {/* 
            <View style={styles.autoRenewal}>
              <View>
                <Text style={styles.autoLabel}>Auto Renewal</Text>
                <Text style={styles.autoStatus}>On - Auto renews</Text>
              </View>

              <View style={[styles.toggle, { backgroundColor: '#4CAF50' }]}>
                <View style={styles.toggleCircle} />
              </View>
            </View> */}
          </View>

          {/* FEATURES */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Plan Features</Text>

            {subscription.subscriptionId?.features?.map((f, i) => (
              <View key={i} style={styles.feature}>
                <Image source={require('../../assets/images/check.png')} style={styles.checkIcon} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* ACTIONS */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate('SubscriptionScreen')}
            >
              <Text style={styles.btnText}>Buy Subscription Plan</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => Alert.alert('Info', 'Cancel feature coming soon')}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        </>
      )}

      {/* SUPPORT */}
      <View style={styles.support}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <Text style={styles.supportText}>Contact our support team for assistance</Text>
        <TouchableOpacity
          style={styles.supportBtn}
          onPress={() => {

            // navigation.navigate("Profile",{
            //   screen : "HelpAndSupportScreen"
            // })
            navigation.navigate("MainTabs", {
              screen: "Profile",
              params: {
                screen: "HelpAndSupportScreen"
              }
            })
          }}
        >
          <Text style={styles.supportBtnText}>Contact Supportt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const Detail = ({ label, value }) => (
  <View style={styles.detail}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value || 'N/A'}</Text>
  </View>
)

export default SubscriptionDetailsScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 16, backgroundColor: 'white',
    borderBottomWidth: 1, borderBottomColor: '#E0E0E0'
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  buyBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#155DFC', paddingHorizontal: 16,
    paddingVertical: 10, borderRadius: 20
  },
  icon: { width: 16, height: 16, marginRight: 6, tintColor: 'white' },
  buyText: { color: 'white', fontWeight: 'bold' },

  card: {
    backgroundColor: 'white', margin: 16, padding: 20,
    borderRadius: 12, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
    shadowRadius: 4, elevation: 2
  },

  bigIcon: { width: 60, height: 60, alignSelf: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  cardText: { color: '#666', textAlign: 'center', marginBottom: 16 },

  features: { marginTop: 8 },
  feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkIcon: { width: 16, height: 16, marginRight: 8, tintColor: '#4CAF50' },
  featureText: { color: '#333' },

  planHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },

  status: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { color: 'white', fontSize: 11, fontWeight: 'bold' },

  planType: { color: '#666', marginBottom: 4 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 16 },

  details: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  detail: { width: '50%', marginBottom: 12 },
  detailLabel: { fontSize: 12, color: '#666' },
  detailValue: { fontSize: 14, fontWeight: '600', color: '#333' },

  autoRenewal: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0'
  },
  autoLabel: { fontWeight: '500' },
  autoStatus: { fontSize: 12, color: '#666' },
  toggle: { width: 46, height: 24, borderRadius: 12, padding: 2 },
  toggleCircle: { width: 20, height: 20, borderRadius: 10, backgroundColor: 'white', marginLeft: 22 },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },

  actions: { padding: 16 },
  primaryBtn: { backgroundColor: '#155DFC', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  secondaryBtn: { backgroundColor: '#FF6B6B', padding: 16, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },

  support: { backgroundColor: 'white', margin: 16, padding: 20, borderRadius: 12, alignItems: 'center' },
  supportTitle: { fontWeight: 'bold', marginBottom: 6 },
  supportText: { color: '#666', textAlign: 'center', marginBottom: 12 },
  supportBtn: { backgroundColor: '#2196F3', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  supportBtnText: { color: 'white', fontWeight: 'bold' },
})
