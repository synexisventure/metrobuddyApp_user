import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SuccessNumbers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Success Numbers</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.value}>500+</Text>
          <Text style={styles.label}>Active Franchisees</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.value}>50+</Text>
          <Text style={styles.label}>Cities Covered</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.value}>98%</Text>
          <Text style={styles.label}>Success Rate</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.value}>₹2.5L</Text>
          <Text style={styles.label}>Avg Monthly Revenue</Text>
        </View>
      </View>
    </View>
  );
};

export default SuccessNumbers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 8,
  },
  column: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B63F8',
  },
  label: {
    fontSize: 13,
    color: '#6A6A6A',
    marginTop: 3,
    textAlign: 'center',
  },
});
