import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BusinessSingleDetails = ({ business, contact, category, businessId }) => {
  if (!business) return null;

  const { IMAGE_BASE_URL, API_BASE_URL } = useContext(AppContext);

  const { logo, businessName = 'N/A', businessCategory, address, distance = 'N/A' } = business;
  const { primaryMobile } = contact || {};
  const categoryName = category?.categoryId?.name || 'N/A';

  const getImageUrl = (photo) => {
    if (!photo) return null;
    const urlString =
      typeof photo === 'string' ? photo : typeof photo?.url === 'string' ? photo.url : null;
    if (!urlString) return null;
    const cleanPath = urlString.replace(/^\/?uploads\//, '');
    return `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`;
  };

  // -------------------- API CALLS --------------------
  const handleCall = async () => {
    const token = await AsyncStorage.getItem('token');
    const payload = { businessId, phone: primaryMobile };
    console.log('Call API payload:', payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/user/business/call`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Call API response:', response.data);
      Alert.alert('Call API', 'Call request sent successfully!');
    } catch (err) {
      console.error('Call API error:', err.response || err.message);
      Alert.alert('Call API', 'Failed to send call request.');
    }
  };

  const handleMessage = async () => {
    const token = await AsyncStorage.getItem('token');
    const payload = { businessId, phone: primaryMobile };
    console.log('Message API payload:', payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/user/business/message`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Message API response:', response.data);
      Alert.alert('Message API', 'Message request sent successfully!');
    } catch (err) {
      console.error('Message API error:', err.response || err.message);
      Alert.alert('Message API', 'Failed to send message request.');
    }
  };

  const handleMap = async () => {
    const token = await AsyncStorage.getItem('token');
    const payload = { businessId, address };
    console.log('Map API payload:', payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/user/business/map`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Map API response:', response.data);
      Alert.alert('Map API', 'Map request sent successfully!');
    } catch (err) {
      console.error('Map API error:', err.response || err.message);
      Alert.alert('Map API', 'Failed to send map request.');
    }
  };

  // -------------------- RENDER --------------------
  return (
    <View style={styles.cardContainer}>
      {/* Top Row: Logo + Name + Type */}
      <View style={styles.headerRow}>
        {logo ? <Image source={{ uri: getImageUrl(logo) }} style={styles.logo} /> : <View style={[styles.logo, { backgroundColor: '#ccc' }]} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.businessName}>{businessName}</Text>
          <Text style={styles.businessType}>{categoryName}</Text>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.ratingText}>⭐ {business.rating || 'N/A'}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        {primaryMobile && (
          <TouchableOpacity style={[styles.button, styles.callButton]} onPress={handleCall}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Call</Text>
          </TouchableOpacity>
        )}
        {address && (
          <TouchableOpacity style={styles.button} onPress={handleMap}>
            <Text style={styles.buttonText}>Directions</Text>
          </TouchableOpacity>
        )}
        {primaryMobile && (
          <TouchableOpacity style={styles.button} onPress={handleMessage}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BusinessSingleDetails;

const styles = StyleSheet.create({
  cardContainer: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 45, height: 45, borderWidth: 0.5, borderRadius: 22.5, marginRight: 10, resizeMode: 'cover' },
  businessName: { fontSize: 18, fontWeight: '700', color: '#222' },
  businessType: { fontSize: 14, color: '#777', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginLeft: 55 },
  ratingText: { fontSize: 15, fontWeight: '600', color: '#222' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  button: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, height: 42, marginHorizontal: 4, backgroundColor: '#fff' },
  callButton: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  buttonText: { fontSize: 15, fontWeight: '600', color: '#333' },
});
