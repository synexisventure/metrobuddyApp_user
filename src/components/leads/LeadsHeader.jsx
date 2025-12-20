import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LeadsHeader = ({businessName}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          source={require('../../assets/images/backArrow.png')} // 👈 your back arrow icon here
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Lead Dashboard</Text>
        <Text style={styles.subtitle}>{businessName || ""}</Text> 
      </View>
    </View>
  );
};

export default LeadsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C', // blue background
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff', // makes the arrow white
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
    flexWrap : "wrap"
  },
});
