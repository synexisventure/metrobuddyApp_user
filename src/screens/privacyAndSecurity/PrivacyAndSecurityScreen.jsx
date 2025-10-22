import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

import PrivacyAndSecurityHeader from "../../components/privacyAndSecurity/PrivacyAndSecurityHeader";
import PrivacyAndSecurityBody from  "../../components/privacyAndSecurity/PrivacyAndSecurityBody";
 
const PrivacyAndSecurityScreen = () => {
  return (
    <View style={styles.container}>
      <PrivacyAndSecurityHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PrivacyAndSecurityBody />
      </ScrollView>
    </View>
  );
};

export default PrivacyAndSecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
