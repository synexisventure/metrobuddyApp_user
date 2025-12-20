import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const CALL_ICON = require('../../assets/images/phone.png');
const EMAIL_ICON = require('../../assets/images/mail.png');
const SEND_ICON = require('../../assets/images/send.png');

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <ScrollView
    contentContainerStyle={{
      paddingBottom : 10
    }}
    style={styles.container} showsVerticalScrollIndicator={false}>
      {/* --- Contact Options --- */}
      <View style={styles.contactRow}>
        <View style={styles.contactCard}>
          <Image source={CALL_ICON} style={styles.icon} />
          <Text style={styles.cardTitle}>Call Us</Text>
          <Text style={styles.cardText}>+91 1800-123-4567</Text>
          <Text style={styles.cardSubText}>Mon-Fri, 9 AM-6 PM</Text>
        </View>

        <View style={styles.contactCard}>
          <Image source={EMAIL_ICON} style={styles.icon} />
          <Text style={styles.cardTitle}>Email Us</Text>
          <Text style={styles.cardText}>support@metrobuddy.com</Text>
          <Text style={styles.cardSubText}>24-48 hour response</Text>
        </View>
      </View>

      {/* --- Support Ticket --- */}
      <Text style={styles.sectionTitle}>Submit a Support Ticket</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={styles.input}
          placeholder="Brief description of your issue"
          placeholderTextColor="#9E9E9E"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Category *</Text>
        <TextInput
          style={styles.input}
          placeholder="Select category"
          placeholderTextColor="#9E9E9E"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="priya.sharma@email.com"
          placeholderTextColor="#9E9E9E"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Message *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Please describe your issue in detail..."
          placeholderTextColor="#9E9E9E"
          value={message}
          multiline
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button}>
          <Image source={SEND_ICON} style={styles.sendIcon} />
          <Text style={styles.buttonText}>Submit Ticket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
    tintColor: '#28A745',  
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 2,
  },
  cardSubText: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#B91C1C', 
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 18,
  },
  sendIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
