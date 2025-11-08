import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BusinessOverview = ({ }) => {
  const navigation = useNavigation();

  const {
    businessDetails,
    contactDetails,
    businessTiming
  } = useContext(AppContext);

  const [primaryPhone, setPrimaryPhone] = useState("NA");

  useEffect(() => {
    const getPrimaryPhone = async () => {
      const phone = await AsyncStorage.getItem("userPhone");
      setPrimaryPhone(phone || "NA");
    };
    getPrimaryPhone();
  }, []);

  // Format address properly
  const formatAddress = () => {
    const address = businessDetails?.address || {};
    const parts = [];

    if (address?.plotNo) parts.push(address.plotNo);
    if (address?.street) parts.push(address.street);
    if (address?.landmark) parts.push(`Near ${address.landmark}`);
    if (address?.area) parts.push(address.area);
    if (address?.city) parts.push(address.city);
    if (address?.state) parts.push(address.state);
    if (address?.pincode) parts.push(address.pincode);

    return parts.length > 0 ? parts.join(', ') : 'Address not available';
  };

  // Format timing properly
  const formatTiming = () => {
    const timeSlots = businessTiming?.timeSlots || [];
    if (timeSlots.length === 0) return 'Timing not set';

    return timeSlots.map((slot, index) => {
      const days = slot?.day?.join(', ') || '';
      const openAt = slot?.openAt || '';
      const closeAt = slot?.closeAt || '';
      return `${days}: ${openAt} - ${closeAt}`;
    }).join('\n');
  };

  // Handle actions
  const handleGetDirections = () => {
    const addressString = encodeURIComponent(formatAddress());
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${addressString}`);
  };

  const handlePhoneCall = () => {
    const phone = contactDetails?.primaryMobile || primaryPhone;
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = () => {
    const whatsapp = contactDetails?.whatsappNumber;
    if (whatsapp) {
      Linking.openURL(`https://wa.me/${whatsapp}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* About Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('BusinessdetailsScreen')}
          >
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.editIcon}
            />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.aboutText}>
          {businessDetails?.description || 'No description Proided'}
        </Text>
      </View>

      {/* Address */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/location.png')}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoText}>
            {formatAddress()}
          </Text>
          {/* <TouchableOpacity onPress={handleGetDirections}>
              <Text style={styles.linkText}>Get Directions</Text>
            </TouchableOpacity> */}
        </View>
      </View>

      {/* Address */}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/globe.png')}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoText}>
            {businessDetails?.website || 'No Website Provided'}
          </Text>
          {/* <TouchableOpacity onPress={handleGetDirections}>
              <Text style={styles.linkText}>Get Directions</Text>
            </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Contact Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('ContactDetailsScreen')}
          >
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.editIcon}
            />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>



        {/* Primary Phone */}
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/phone.png')}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handlePhoneCall}>
            <Text style={styles.linkText}>+91 {contactDetails?.primaryMobile || primaryPhone}</Text>
          </TouchableOpacity>
        </View>

        {/* WhatsApp */}
        {contactDetails?.whatsappNumber && (
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/whatsapp.png')}
              style={styles.icon}
            />
            <TouchableOpacity onPress={handleWhatsApp}>
              <Text style={styles.whatsappText}>+91 {contactDetails.whatsappNumber}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Additional Phones */}
        {contactDetails?.additionalPhones?.map((phone, index) => (
          <View style={styles.row} key={index}>
            <Image
              source={require('../../assets/images/phone.png')}
              style={styles.icon}
            />
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
              <Text style={styles.linkText}>+91 {phone}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Additional Emails */}
        {contactDetails?.additionalEmails?.map((email, index) => (
          <View style={styles.row} key={index}>
            <Image
              source={require('../../assets/images/mail.png')}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{email}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Timing Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Business Timing</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('BusinessTimingScreen')}
          >
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.editIcon}
            />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {businessTiming?.timeSlots?.length > 0 ? (
          businessTiming.timeSlots.map((slot, index) => (
            <View style={styles.row} key={index}>
              <Image
                source={require('../../assets/images/clock.png')}
                style={styles.icon}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.timingText}>
                  {slot.day?.join(', ') || 'No days'}: {slot.openAt} - {slot.closeAt}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.infoText}>Timing not set</Text>
        )}
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
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#202124',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: '#1a73e8',
    marginRight: 6,
  },
  editText: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
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
    lineHeight: 20,
  },
  timingText: {
    fontSize: 15,
    color: '#3c4043',
    lineHeight: 20,
  },
  linkText: {
    fontSize: 15,
    color: '#1a73e8',
    marginTop: 2,
  },
  whatsappText: {
    fontSize: 15,
    color: '#25D366',
    marginTop: 2,
  },
});