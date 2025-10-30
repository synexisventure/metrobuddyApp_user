import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LeadsSection2 = () => {
  const sources = [
    {
      name: 'Metro Buddy Search',
      leads: 234,
      percentage: 35,
      icon: require('../../assets/images/search.png'),
    },
    {
      name: 'Trending Now',
      leads: 180,
      percentage: 27,
      icon: require('../../assets/images/bell.png'),
    },
    {
      name: 'Social Media Share',
      leads: 150,
      percentage: 38,
      icon: require('../../assets/images/share.png'),
    },
  ];

  return (
    <LinearGradient
      colors={['#34448B', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBg}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Lead Sources</Text>

          {sources.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.leftSection}>
                <View style={styles.iconWrapper}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.leads}>{item.leads} leads</Text>
                </View>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.percentage}%</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LeadsSection2;

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  innerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    color: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#E8EEFF',
    borderRadius: 10,
    padding: 6,
    marginRight: 10,
  },
  icon: {
    height: 22,
    width: 22,
    tintColor: '#155DFC',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  leads: {
    fontSize: 13,
    color: '#777',
  },
  badge: {
    backgroundColor: '#E8EEFF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#155DFC',
  },
});
