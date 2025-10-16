import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileCounts from "../../components/profile/ProfileCounts";
import ProfileBody from "../../components/profile/ProfileBody";
import ProfileFooter from "../../components/profile/ProfileFooter";

const ProfileScreen = () => {
  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{  }}
    >
      <ProfileHeader />
      <ProfileCounts />
      <ProfileBody />
      <ProfileFooter/> 
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F9FBFF",
  },
});
