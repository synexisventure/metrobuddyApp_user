import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Apply Online',
    subtitle: 'Fill the franchise application form',
  },
  {
    number: '2',
    title: 'Initial Discussion',
    subtitle: 'Our team will contact you within 24 hours',
  },
  {
    number: '3',
    title: 'Documentation',
    subtitle: 'Complete necessary paperwork and agreements',
  },
  {
    number: '4',
    title: 'Launch',
    subtitle: 'Get training and launch your franchise',
  },
];

const ProcessStep = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Simple 4-Step Process</Text>

      {steps.map((item, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.numberCircle}>
            <Text style={styles.numberText}>{item.number}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProcessStep;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  numberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFECEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#FF3B3B',
    fontWeight: '600',
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#222222',
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    color: '#6A6A6A',
    fontSize: 13,
    marginTop: 2,
  },
});
