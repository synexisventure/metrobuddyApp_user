import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import LeadsHeader from "../../components/leads/LeadsHeader";
import LeadsBody from "../../components/leads/LeadsBody";
import LeadsPieChart from '../../components/leads/LeadsPieChart';

const SingleBusinessLeadScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Set status bar color and content */}
      <StatusBar backgroundColor="#155DFC" barStyle="light-content" />

      {/* Header */}
      <LeadsHeader />

      {/* Scrollable body */}
      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LeadsPieChart />
        <LeadsBody /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleBusinessLeadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // soft neutral background for body
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    // paddingHorizontal: 16,
    // paddingVertical: 12,
  },
});
