import { PermissionsAndroid, Platform, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

/* =========================
   TOAST
========================= */
const showToast = (type, text1, text2 = '') => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 6000,
  });
};

/* =========================
   PERMISSION
========================= */
const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

/* =========================
   GET LOCATION (PROMISE)
========================= */
const getCurrentLocation = options =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });

/* =========================
   MAIN FUNCTION
========================= */
const getLocationSafe = async () => {
  console.log('🚀 LOCATION START');

  /* ---------- PERMISSION ---------- */
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    showToast('error', 'Permission Required', 'Location permission needed');
    return { success: false, gpsOn: false };
  }

  /* ---------- TRY GPS ---------- */
  try {
    const position = await getCurrentLocation({
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    });

    console.log('✅ GPS ON');
    return {
      success: true,
      gpsOn: true,
      coords: position.coords,
    };
  } catch (error) {
    console.log('❌ LOCATION ERROR:', error.code, error.message);

    /* =========================
       GPS OFF (ANDROID REALITY)
       code 2 → GPS OFF
       code 3 → GPS OFF / NO FIX
    ========================= */
    if (error.code === 2 || error.code === 3) {
      showToast('error', 'GPS OFF', 'Please turn on location');

      if (Platform.OS === 'android') {
        Linking.openSettings(); // opens Location settings
      }

      return { success: false, gpsOn: false };
    }

    /* ---------- UNKNOWN ---------- */
    showToast('error', 'Location Error', 'Something went wrong');
    return { success: false, gpsOn: false };
  }
};

export default getLocationSafe;
