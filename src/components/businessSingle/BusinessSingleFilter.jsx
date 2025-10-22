import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const BusinessSingleFilter = ({ activeTab, setActiveTab }) => {
  const tabs = ['Overview', 'Reviews', 'Photos'];

  return (
    <View style={styles.container}>
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
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>
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
  tabRow: {
    flexDirection: 'row', 
    gap : 20,
    paddingHorizontal : 20
  },
  tab: {
    alignItems: 'center',
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
  activeLine: {
    height: 2,
    backgroundColor: '#1a73e8',
    width: '80%',
    marginTop: 4,
    borderRadius: 1,
  },
});
