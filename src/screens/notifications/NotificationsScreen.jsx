import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import NotificationHeader from "../../components/notifications/NotificationHeader";
import NotificationBody from "../../components/notifications/NotificationsBody";

const NotificationsScreen = () => {
  return (
    <View>
      <NotificationHeader/>
      <NotificationBody/>
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({})