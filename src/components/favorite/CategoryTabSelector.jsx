import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const categories = ['All', 'Hotels', 'Beauty & Spa', 'Restaurants', 'Education'];

const CategoryTabSelector = ({ selectedTab, onSelectTab }) => {
  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          const isActive = selectedTab === category;
          return (
            <TouchableOpacity 
              key={category}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onSelectTab(category)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryTabSelector;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 8,
    // Add horizontal padding to the scrollview itself if you want a gap on the edges
    paddingLeft: 16, 
    marginBottom: 10,
  },
  tab: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#000', // Black background for the active tab (as shown for 'All')
    borderColor: '#000',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});