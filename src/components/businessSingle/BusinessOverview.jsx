import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const BusinessOverview = ({ business, contact, timing }) => {

  const formatAddress = (addr) => {
    if (!addr) return 'NA';
    const parts = [
      addr.plotNo,
      addr.street,
      addr.landmark,
      addr.area,
      addr.city,
      addr.state,
      addr.pincode,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'NA';
  };

  const renderTiming = (timing) => {
    if (!timing || !timing.timeSlots || timing.timeSlots.length === 0) return (
      <View style={styles.row}>
        <Image source={require('../../assets/images/clock.png')} style={styles.icon} />
        <Text style={styles.infoText}>NA</Text>
      </View>
    );

    return timing.timeSlots.map((slot, index) => (
      <View key={index} style={styles.row}>
        <Image source={require('../../assets/images/clock.png')} style={styles.icon} />
        <Text style={styles.infoText}>
          {slot.day?.join(', ') || 'NA'}: {slot.openAt || 'NA'} - {slot.closeAt || 'NA'}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* About Section */}
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.aboutText}>{business?.businessName || 'NA'}</Text>

      <View style={styles.divider} />

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>Contact Information</Text>

      {/* Address */}
      <View style={styles.row}>
        <Image source={require('../../assets/images/location.png')} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoText}>{formatAddress(business?.address)}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.linkText}>Get Directions</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Phone */}
      <View style={styles.row}>
        <Image source={require('../../assets/images/phone.png')} style={styles.icon} />
        <Text style={styles.infoText}>{contact?.primaryMobile || 'NA'}</Text>
      </View>

      {/* Timing */}
      {renderTiming(timing)}

      {/* Website */}
      <View style={styles.row}>
        <Image source={require('../../assets/images/globe.png')} style={styles.icon} />
        <TouchableOpacity>
          <Text style={styles.linkText}>{business?.website || 'NA'}</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.row}>
        <Image source={require('../../assets/images/mail.png')} style={styles.icon} />
        <Text style={styles.infoText}>{contact?.email || 'NA'}</Text>
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
