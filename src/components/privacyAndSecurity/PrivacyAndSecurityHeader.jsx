import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const BACK_ICON = require('../../assets/images/backArrow.png'); // your local back arrow image

const PrivacyAndSecurityHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={BACK_ICON} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Privacy & Security</Text>
        <Text style={styles.subtitle}>Manage your app preferences</Text>
      </View>
    </View>
  );
};

export default PrivacyAndSecurityHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 14,
    color: '#5A5A5A',
    marginTop: 2,
  },
});
