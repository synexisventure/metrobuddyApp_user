import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const ticketsData = [
  {
    id: 'TK-081',
    status: 'resolved',
    title: 'App crashes when searching',
    description: 'Issue resolved with app update v2.1.0',
    date: 'Dec 20, 2024',
  },
  {
    id: 'TK-082',
    status: 'in-progress',
    title: 'Unable to verify business listing',
    description: 'Our team is reviewing your business documents',
    date: 'Dec 25, 2024',
  },
];

const MyTickets = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Your Support Tickets</Text>
        <View style={styles.ticketCount}>
          <Text style={styles.ticketCountText}>{ticketsData.length} tickets</Text>
        </View>
      </View>

      {ticketsData.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.ticketId}>{item.id}</Text>
            <View
              style={[
                styles.statusBadge,
                item.status === 'resolved'
                  ? styles.resolvedBadge
                  : styles.progressBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.status === 'resolved'
                    ? styles.resolvedText
                    : styles.progressText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>Created: {item.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 10,  
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  ticketCount: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ticketCountText: {
    fontSize: 12,
    color: '#4B5563',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  // ✅ EXACT same as image
  resolvedBadge: {
    backgroundColor: '#D1FAE5', // soft green background
  },
  progressBadge: {
    backgroundColor: '#FEF3C7', // soft yellow background
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  resolvedText: {
    color: '#065F46', // dark green text
  },
  progressText: {
    color: '#92400E', // dark yellow text
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
});
