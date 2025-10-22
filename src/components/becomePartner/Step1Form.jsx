import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Step1Form = ({ onNext }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => { 
    setOtpSent(true);
  };

  const handleVerify = () => { 
    onNext(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Mobile Number</Text>
      <Text style={styles.subtitle}>We'll send you an OTP for verification</Text>

      {/* Mobile Number Input */}
      <Text style={styles.inputLabel}>Mobile Number</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: otpSent ? '#e6e6e6' : '#0056ff' }]}
          disabled={otpSent}
          onPress={handleSendOtp}
        >
          <Text style={[styles.sendText, { color: otpSent ? '#888' : '#fff' }]}>
            {otpSent ? 'Sent' : 'Send'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* OTP Input */}
      <Text style={[styles.inputLabel, { marginTop: 15 }]}>Enter OTP</Text>
      <TextInput
        style={styles.otpInput}
        placeholder="Enter 6 digit OTP"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      {/* Resend Link */}
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn't receive OTP? </Text>
        <TouchableOpacity onPress={() => setOtpSent(false)}>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify and Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step1Form;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // padding: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  subtitle: {
    color: '#555',
    fontSize: 13,
    marginBottom: 20,
  },
  inputLabel: {
    color: '#000',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
  },
  otpInput: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
  },
  sendBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resendRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 25,
  },
  resendText: {
    color: '#555',
    fontSize: 13,
  },
  resendLink: {
    color: '#0056ff',
    fontWeight: '500',
  },
  verifyBtn: {
    backgroundColor: '#0056ff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
