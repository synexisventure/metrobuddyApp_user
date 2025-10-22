import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ApplyFranchise = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    investment: '',
    message: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Blue Gradient Box */}
      <LinearGradient colors={['#2D73FF', '#0E4BEF']} style={styles.container}>
        <Text style={styles.heading}>Ready to Start Your Journey?</Text>
        <Text style={styles.subText}>
          Join 500+ successful franchise partners across India
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Apply for Franchise</Text>
        </TouchableOpacity>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/images/phone.png')}
              style={styles.icon}
            />
            <Text style={styles.contactText}>1800-123-4567</Text>
          </View>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/images/mail.png')}
              style={styles.icon}
            />
            <Text style={styles.contactText}>franchise@metrobuddy.in</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Modal Form */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Franchise Application</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Full Name */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#A0A0A0"
                  value={form.fullName}
                  onChangeText={(text) => handleChange('fullName', text)}
                />
              </View>

              {/* Phone Number */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="phone-pad"
                  value={form.phone}
                  onChangeText={(text) => handleChange('phone', text)}
                />
              </View>

              {/* Email Address */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                />
              </View>

              {/* Preferred City */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Preferred City *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Which city are you interested in?"
                  placeholderTextColor="#A0A0A0"
                  value={form.city}
                  onChangeText={(text) => handleChange('city', text)}
                />
              </View>

              {/* Investment Capacity */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Investment Capacity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your investment budget"
                  placeholderTextColor="#A0A0A0"
                  value={form.investment}
                  onChangeText={(text) => handleChange('investment', text)}
                />
              </View>

              {/* Additional Message */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Additional Message</Text>
                <TextInput
                  style={[styles.input, { height: 70 }]}
                  placeholder="Tell us about your business experience..."
                  placeholderTextColor="#A0A0A0"
                  multiline
                  value={form.message}
                  onChangeText={(text) => handleChange('message', text)}
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Submit Application</Text>
              </TouchableOpacity>

              <Text style={styles.noteText}>
                Our team will contact you within 24 hours
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ApplyFranchise;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 18,
    alignItems: 'center',
    margin: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subText: {
    fontSize: 13,
    color: '#E6E6E6',
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#0056FF',
    fontWeight: '500',
    fontSize: 14,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  contactText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 18,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    fontSize: 20,
    color: '#555555',
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 13,
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#FF0000',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  noteText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
});
