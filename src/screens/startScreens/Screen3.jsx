import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Screen3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <Text style={styles.skip}>Skip</Text>

      {/* Blue Circle Icon */}
      <View style={styles.iconWrapper}>
        <Image
          source={require('../../assets/images/franchise.png')}
          style={styles.iconImage}
        />
      </View>

      {/* Local Image */}
      <Image
        source={require('../../assets/images/images2/city.png')}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>Grow with Franchise Opportunities</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Start your entrepreneurial journey with low investment, high returns, and 24×7 support from MetroBuddy.
      </Text>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, { opacity: 0.4 }]} />
        <View style={[styles.dot, { opacity: 1 }]} />
        <View style={[styles.dot, { opacity: 0.4 }]} />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.nextText}>Next  ›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  skip: {
    position: 'absolute',
    top: 50,
    right: 25,
    fontSize: 14,
    color: '#000',
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2E6CF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  iconImage: {
    width: 30,
    height: 30,
    tintColor: '#fff', // white tint color for the icon
    resizeMode: 'contain',
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 15,
    marginTop: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E6CF8',
    marginHorizontal: 4,
  },
  nextButton: {
    backgroundColor: "#2F6FE8",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginTop : 20
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
