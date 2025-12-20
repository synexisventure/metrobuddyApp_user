import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EditProfileHeader from "../../components/profile/editProfile/EditProfileHeader";
import EditProfileBody from "../../components/profile/editProfile/EditProfileBody";

const EditProfileScreen = () => {
  return (
    <View style={styles.main}>
        <EditProfileHeader/>
        <EditProfileBody/> 
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    main : {
        flex : 1
    }
})