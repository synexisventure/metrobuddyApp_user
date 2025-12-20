import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const StepFormsHeader = ({ onBackPress, title, subtitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <TouchableOpacity
          // onPress={onBackPress}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/images/backArrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title || 'Add Your Business'}</Text>
          <Text style={styles.subtitle}>{subtitle || 'Fill in the details below'}</Text>
        </View>
      </View>
    </View>
  );
};

export default StepFormsHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B91C1C',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '400',
  },
});