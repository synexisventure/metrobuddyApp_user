import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

import SettingsHeader from "../../components/settings/SettingsHeader";
import SettingsBody from "../../components/settings/SettingsBody";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <SettingsHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsBody />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
