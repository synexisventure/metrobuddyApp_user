import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import SubscriptionHeader from "../../components/subscription/SubscriptionHeader";
import SubscriptionBodyMonthly from "../../components/subscription/SubscriptionBodyMonthly";
import SubscriptionBodyYearly from "../../components/subscription/SubscriptionBodyYearly";

const SubscriptionScreen = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header fixed at top */}
      <SubscriptionHeader
        isYearly={isYearly}
        onToggle={() => setIsYearly(!isYearly)}
      />

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isYearly ? <SubscriptionBodyYearly /> : <SubscriptionBodyMonthly />}
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background for better contrast
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // space at bottom for smooth scrolling
  },
});
