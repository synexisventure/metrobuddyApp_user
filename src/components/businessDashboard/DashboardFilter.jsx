import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const BusinessSingleFilter = ({ activeTab, setActiveTab }) => {
  const tabs = ['Overview', 'Reviews', 'Photos', "Products", "Subscription", 'Personal Wallet'];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  // activeTab === tab && tab === 'Personal Wallet' && styles.activeWalletTabText,
                  // activeTab === tab && tab !== 'Personal Wallet' && styles.activeTabText,
                  (activeTab === tab && (tab === 'Personal Wallet' || tab === 'Subscription')) && styles.activeWalletTabText,
                  (activeTab !== tab && (tab === 'Personal Wallet' || tab === 'Subscription')) && styles.walletTabText,
                  activeTab !== tab && tab === 'Personal Wallet' && styles.walletTabText,
                  
                ]}
                >
                {tab}
              </Text>
              {activeTab === tab && (
                <View
                style={[
                  styles.activeLine,
                  (tab === 'Personal Wallet' || tab === 'Subscription') && styles.walletActiveLine
                    // tab === 'Personal Wallet' && styles.walletActiveLine
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessSingleFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
    paddingTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    // backgroundColor : "#9ff"
  },
  tabRow: {
    flexDirection: 'row',
    gap: 20,
    minWidth: '100%',
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tabText: {
    fontSize: 15,
    color: '#6b6b6b',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#1a73e8',
    fontWeight: '500',
  },
  walletTabText: {
    color: '#ff4444', // Red color for inactive Personal Wallet
    fontWeight: '400',
  },
  activeWalletTabText: {
    color: '#ff4444', // Red color when Personal Wallet is active
    fontWeight: '500',
  },
  activeLine: {
    height: 2,
    backgroundColor: '#1a73e8',
    width: '80%',
    marginTop: 4,
    borderRadius: 1,
  },
  walletActiveLine: {
    backgroundColor: '#ff4444', // Red underline for Personal Wallet
  },
});