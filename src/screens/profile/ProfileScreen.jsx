import React, { useContext, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileCounts from "../../components/profile/ProfileCounts";
import ProfileBody from "../../components/profile/ProfileBody";
import ProfileFooter from "../../components/profile/ProfileFooter";
import { AppContext } from '../../context/AppContext';

const ProfileScreen = () => {
  const {
    profile,
    profileLoading,
    fetchUserProfile,
  } = useContext(AppContext);

  // Call profile API when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader profile={profile} loading={profileLoading} />
      {/* <ProfileCounts profile={profile} /> */}
      <ProfileBody profile={profile} />
      <ProfileFooter />
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
