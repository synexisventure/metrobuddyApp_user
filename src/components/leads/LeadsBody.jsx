import React, { useMemo } from 'react';
import {
  StyleSheet, Text, View, Image, SafeAreaView, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LeadsBody = ({ leads, loading, businessId , businessName}) => {
  const navigation = useNavigation();

  // -----------------------------
  //  Calculate dynamic totals
  // -----------------------------
  const { totalViews, totalMessages, totalCalls, totalMaps, totalAll } = useMemo(() => {
    const view = leads.reduce((acc, item) => acc + item.viewProfile, 0);
    const msg = leads.reduce((acc, item) => acc + item.message, 0);
    const call = leads.reduce((acc, item) => acc + item.call, 0);
    const map = leads.reduce((acc, item) => acc + item.map, 0);

    return {
      totalViews: view,
      totalMessages: msg,
      totalCalls: call,
      totalMaps: map,
      totalAll: view + msg + call + map,
    };
  }, [leads]);

  // -----------------------------
  // Convert to dynamic cards
  // -----------------------------
  const leadSources = [
    {
      name: "Profile Views",
      leads: totalViews,
      percentage: totalAll ? ((totalViews / totalAll) * 100).toFixed(1) : 0,
      icon: require('../../assets/images/search.png'),
      type: "viewProfile"
    },
    {
      name: "Messages",
      leads: totalMessages,
      percentage: totalAll ? ((totalMessages / totalAll) * 100).toFixed(1) : 0,
      icon: require('../../assets/images/mail.png'),
      type: "message"
    },
    {
      name: "Calls",
      leads: totalCalls,
      percentage: totalAll ? ((totalCalls / totalAll) * 100).toFixed(1) : 0,
      icon: require('../../assets/images/phone.png'),
      type: "call"
    },
    {
      name: "Direction Views",
      leads: totalMaps,
      percentage: totalAll ? ((totalMaps / totalAll) * 100).toFixed(1) : 0,
      icon: require('../../assets/images/location.png'),
      type: "map"
    },
  ];
 
  // -----------------------------
  // Navigate to details screen
  // -----------------------------
  const handleViewMore = (sourceType) => {
    navigation.navigate('LeadsDetailsScreen', {
      sourceType,
      businessId,
      businessName,
    });
  };

  if (loading) {
    return (
      <LinearGradient colors={['#34448B', '#FFFFFF']} style={styles.gradientBg}>
        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="#fff" /> */}
          {/* <Text style={styles.loadingText}>Loading...</Text> */}
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#34448B', '#FFFFFF']} style={styles.gradientBg}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.innerContainer}>

          {/* Header Section */}
          <View style={styles.header}>
            {/* <Text style={styles.title}>Lead Sources </Text> */}
          </View>

          {/* Dynamic Lead Cards */}
          {leadSources.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.leftSection}>
                <View style={styles.iconWrapper}>
                  <Image source={item.icon} style={styles.icon} />
                </View>

                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.leads}>{item.leads} Leads</Text>
                </View>
              </View>

              <View style={styles.rightSection}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.percentage}%</Text>
                </View>

                <TouchableOpacity
                  style={styles.viewMoreBtn}
                  onPress={() => handleViewMore(item.type)}
                >
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LeadsBody;


const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    minHeight: 400
  },
  innerContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    backgroundColor: '#E8EEFF',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: '#B91C1C',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  leads: {
    fontSize: 14,
    color: '#666',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  badge: {
    backgroundColor: '#E8EEFF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B91C1C',
  },
  viewMoreBtn: {
    backgroundColor: '#34448B',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34448B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});