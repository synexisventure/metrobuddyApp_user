import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const OfferAndDealsFilters = ({ onSelectFilter }) => {
  const [selected, setSelected] = useState('All Offers');
  const filters = ['All Offers', 'Saved'];

  const handleSelect = (item) => {
    setSelected(item);
    onSelectFilter(item); // send to parent
  };

  return (
    <View style={styles.container}>
      {filters.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => handleSelect(item)}
          style={[
            styles.tab,
            selected === item ? styles.activeTab : styles.inactiveTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selected === item ? styles.activeText : styles.inactiveText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OfferAndDealsFilters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  tab: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#0C0C1E',
    borderColor: '#0C0C1E',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    borderColor: '#D9D9D9',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
});
