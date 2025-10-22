import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const BusinessOverview = () => {
  return (
    <View style={styles.container}>
      {/* About Section */}
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.aboutText}>
        Luxury hotel with world-class amenities and stunning city views. Perfect
        for business and leisure travelers.
      </Text>

      <View style={styles.divider} />

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>Contact Information</Text>

      {/* Address */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/location.png')}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoText}>
            123 Marine Drive, Mumbai Central, Mumbai
          </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Phone */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/phone.png')}
          style={styles.icon}
        />
        <Text style={styles.infoText}>+91 98765 43210</Text>
      </View>

      {/* Availability */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/clock.png')}
          style={styles.icon}
        />
        <Text style={styles.infoText}>24/7</Text>
      </View>

      {/* Website */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/globe.png')}
          style={styles.icon}
        />
        <TouchableOpacity>
          <Text style={styles.linkText}>www.example.com</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/mail.png')}
          style={styles.icon}
        />
        <Text style={styles.infoText}>info@thegrandplazahotel.com</Text>
      </View>
    </View>
  );
};

export default BusinessOverview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 6,
  },
  aboutText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    marginTop: 3,
  },
  infoText: {
    fontSize: 15,
    color: '#3c4043',
  },
  linkText: {
    fontSize: 15,
    color: '#1a73e8',
    marginTop: 2,
  },
});
