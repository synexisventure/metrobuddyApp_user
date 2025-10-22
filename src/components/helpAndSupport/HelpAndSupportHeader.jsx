import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

// Local icon
const BACK_ICON = require('../../assets/images/backArrow.png'); // change path if needed

const HelpAndSupportHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={BACK_ICON} style={styles.icon} />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>Get assistance when you need it</Text>
      </View>
    </View>
  );
};

export default HelpAndSupportHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b6b6b',
    marginTop: 2,
  },
});
