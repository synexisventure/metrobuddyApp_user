import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const check = () => {
  const navigation = useNavigation()

  // Mock data - replace with actual subscription data from your state/API
  const currentSubscription = {
    plan: 'Gold',
    type: 'Monthly',
    price: '₹399',
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    features: [
      'Access to premium tools',
      'Priority email support',
      '15 team members',
      'Advanced analytics dashboard',
      'Priority support (24/7)',
      'Advanced reporting'
    ],
    autoRenewal: true
  }

  const handleBuySubscription = () => {
    navigation.navigate('SubscriptionScreen')
  }

  const handleToggleAutoRenewal = () => {
    Alert.alert(
      'Auto Renewal',
      `Do you want to ${currentSubscription.autoRenewal ? 'disable' : 'enable'} auto renewal?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Handle auto renewal toggle logic here
            Alert.alert('Success', `Auto renewal ${currentSubscription.autoRenewal ? 'disabled' : 'enabled'}`)
          }
        }
      ]
    )
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#4CAF50'
      case 'expired':
        return '#FF6B6B'
      case 'cancelled':
        return '#FFA500'
      default:
        return '#666'
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Current Subscription</Text>
        <Text style={styles.headerSubtitle}>Manage your subscription plan</Text>
      </View>

      {/* Current Plan Card */}
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>{currentSubscription.plan}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentSubscription.status) }]}>
            <Text style={styles.statusText}>{currentSubscription.status}</Text>
          </View>
        </View>

        <View style={styles.planDetails}>
          <Text style={styles.planType}>{currentSubscription.plan} {currentSubscription.type}</Text>
          <Text style={styles.planPrice}>{currentSubscription.price}</Text>
          
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>{currentSubscription.startDate}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>{currentSubscription.endDate}</Text>
            </View>
          </View>

          {/* Auto Renewal Toggle */}
          <TouchableOpacity style={styles.autoRenewalContainer} onPress={handleToggleAutoRenewal}>
            <View style={styles.autoRenewalTextContainer}>
              <Text style={styles.autoRenewalLabel}>Auto Renewal</Text>
              <Text style={styles.autoRenewalStatus}>
                {currentSubscription.autoRenewal ? 'On' : 'Off'}
              </Text>
            </View>
            <View style={[
              styles.toggleButton,
              { backgroundColor: currentSubscription.autoRenewal ? '#4CAF50' : '#CCCCCC' }
            ]}>
              <View style={styles.toggleCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Plan Features</Text>
        <View style={styles.featuresList}>
          {currentSubscription.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Image 
                source={require('../../assets/images/check.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleBuySubscription}
        >
          <Text style={styles.primaryButtonText}>Buy New Subscription</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Need Help?</Text>
        <Text style={styles.infoText}>
          If you have any questions about your subscription, contact our support team.
        </Text>
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default check

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  planCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  planBadgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  planDetails: {
    marginBottom: 12,
  },
  planType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  autoRenewalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  autoRenewalTextContainer: {
    flex: 1,
  },
  autoRenewalLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  autoRenewalStatus: {
    fontSize: 13,
    color: '#666',
  },
  toggleButton: {
    width: 46,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  featuresSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#4CAF50',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  actionButtons: {
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  supportButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
})