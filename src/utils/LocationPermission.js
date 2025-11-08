import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const getLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Please allow location permission.');
        return null;
      }
    }

    return await getCurrentLocation();
  } catch (err) {
    console.error('Permission error:', err);
    return null;
  }
};

const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    console.log('📍 Getting coordinates...');
    Geolocation.getCurrentPosition(
      pos => resolve(pos.coords),
      err => {
        console.log('❌ Location error:', err);
        Alert.alert(
          'Location Error',
          'GPS took too long to respond. Open Google Maps once, ensure High-accuracy mode, then retry.',
          [
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
            { text: 'OK', style: 'cancel' },
          ],
        );
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 60000,      // wait longer
        maximumAge: 0,
      },
    );
  });

export default getLocationPermission;
