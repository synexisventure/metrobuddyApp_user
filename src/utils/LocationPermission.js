import { Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

const getLocationPermission = async () => {
  try {
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    // Check current permission
    const status = await check(permission);
    console.log('📍 Initial permission status:', status);

    if (status === RESULTS.GRANTED) {
      return getCurrentLocation();
    }

    // Request permission
    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      console.log('✅ Permission granted now, fetching location...');
      return getCurrentLocation();
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to mark attendance.'
      );
      return null;
    }
  } catch (err) {
    console.error('Location permission error:', err);
    return null;
  }
};

// const getCurrentLocation = () =>
//   new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       (position) => resolve(position.coords),
//       (error) => reject(error),
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   });

const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    console.log('🚀 Requesting location...');
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('✅ Got position:', position);
        resolve(position.coords);
      },
      (error) => {
        console.log('❌ First attempt failed:', error);
        // Try again with lower accuracy
        Geolocation.getCurrentPosition(
          (pos2) => {
            console.log('✅ Got position on retry:', pos2);
            resolve(pos2.coords);
          },
          (err2) => {
            console.log('❌ Second attempt also failed:', err2);
            Alert.alert('Location Error', err2.message);
            reject(err2);
          },
          { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  });



export default getLocationPermission;
