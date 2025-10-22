import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';

// --- Local icon ---
const CLOCK_ICON = require('../../assets/images/clock.png'); // change path if needed

const searches = [
  'Restaurants near me',
  'Beauty salon Bandra',
  'Hotels in Mumbai',
  'Auto repair shop',
];

const RecentSearchesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.arrow}>{'›'}</Text>
        <Text style={styles.header}>Recent Searches</Text>
      </View>

      {/* Search Items */}
      <View style={styles.listContainer}>
        {searches.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Image source={CLOCK_ICON} style={styles.icon} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}

        {/* Clear Button */}
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Clear Search History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecentSearchesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  arrow: {
    fontSize: 20,
    color: '#374151',
    marginRight: 6,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  listContainer: {
    marginTop: 4,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#6B7280',
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#111827',
  },
  clearButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  clearText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
});
