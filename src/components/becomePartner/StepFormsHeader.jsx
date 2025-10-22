import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const StepFormsHeader = ({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBackPress}>
          <Image
            source={require('../../assets/images/backArrow.png')} // update filename if needed
            style={styles.icon}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Add Your Business</Text>
          <Text style={styles.subtitle}>Fill in the details below</Text>
        </View>
      </View>
    </View>
  );
};

export default StepFormsHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#155DFC', // Bright blue background
    paddingHorizontal: 5,
    paddingVertical: 10, 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 2,
  },
});
