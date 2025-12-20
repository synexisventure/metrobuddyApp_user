import React, { useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import LeadsHeader from "../../components/leads/LeadsHeader";
import LeadsBody from "../../components/leads/LeadsBody";
import LeadsPieChart from '../../components/leads/LeadsPieChart'; 

import { AppContext } from "../../context/AppContext";

const SingleBusinessLeadScreen = ({ route }) => {

  const { businessId , business } = route.params;

  const {
    businessLeads,
    businessLeadsLoading,
    fetchBusinessLeads,
  } = useContext(AppContext);

  useEffect(() => {
    fetchBusinessLeads(businessId);
  }, [businessId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B91C1C" barStyle="light-content" />

      <LeadsHeader businessName={business.businessName} />

      <ScrollView style={styles.scrollArea}>
        
        <LeadsPieChart leads={businessLeads} loading={businessLeadsLoading} /> 

        <LeadsBody leads={businessLeads} loading={businessLeadsLoading} businessId={businessId} businessName = {business.businessName}/>

      </ScrollView>
    </SafeAreaView> 
  );
};

export default SingleBusinessLeadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollArea: {
    flex: 1,
  },
});
