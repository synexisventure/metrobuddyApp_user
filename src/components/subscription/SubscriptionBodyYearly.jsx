import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window');

const SubscriptionBodyYearly = () => {
  const [activePackage, setActivePackage] = useState(0);

  const packages = [
    {
      name: "Silver",
      price: "1,499",
      period: "/year",
      badge: null,
      badgeColor: "#C0C0C0",
      borderColor: "#E0E0E0",
      buttonColor: "#2196F3",
      features: [
        "Basic business listing",
        "Email support",
        "5 team members", 
        "Basic analytics",
        "Standard support",
        "Basic reporting"
      ]
    },
    {
      name: "Gold",
      price: "2,499",
      period: "/year", 
      badge: "Most Popular",
      badgeColor: "#FFD700",
      borderColor: "#FFD700",
      buttonColor: "#4CAF50",
      features: [
        "Access to premium tools",
        "Priority email support",
        "15 team members",
        "Advanced analytics dashboard",
        "Priority support (24/7)",
        "Advanced reporting"
      ]
    },
    {
      name: "Platinum", 
      price: "4,999",
      period: "/year",
      badge: "Best Value",
      badgeColor: "#E5E4E2",
      borderColor: "#E5E4E2",
      buttonColor: "#9C27B0",
      features: [
        "All Gold features +",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom analytics dashboard",
        "White-label solutions",
        "API access included"
      ]
    }
  ];

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActivePackage(Math.round(index));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {packages.map((pkg, index) => (
          <View key={index} style={styles.slide}>
            {/* Package Badge */}
            {pkg.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pkg.badge}</Text>
              </View>
            )}
            
            {/* Plan Card */}
            <View style={[styles.card, { borderColor: pkg.borderColor }]}>
              {/* Plan Header */}
              <View style={styles.header}>
                <View style={[styles.packageBadge, { backgroundColor: pkg.badgeColor }]}>
                  <Text style={styles.packageBadgeText}>{pkg.name}</Text>
                </View>
                <Text style={styles.planText}>{pkg.name} Yearly Plan</Text>
              </View>
              
              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{pkg.price}</Text>
                <Text style={styles.period}>{pkg.period}</Text>
              </View>
              
              {/* Features List */}
              <View style={styles.featuresContainer}>
                {pkg.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <Image 
                      source={require('../../assets/images/check.png')} 
                      style={styles.icon}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              {/* Subscribe Button */}
              <TouchableOpacity style={[styles.subscribeButton, { backgroundColor: pkg.buttonColor }]}>
                <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {packages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activePackage ? '#4CAF50' : '#E0E0E0' }
            ]}
          />
        ))}
      </View>

      {/* Swipe Hint */}
      <Text style={styles.swipeText}>Swipe to explore packages</Text>
    </View>
  )
}

export default SubscriptionBodyYearly

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollView: {
    width: width,
  },
  slide: {
    width: width - 40,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: -10,
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  packageBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 8,
  },
  packageBadgeText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  planText: {
    color: '#666',
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  period: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#4CAF50',
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  subscribeButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  swipeText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
})