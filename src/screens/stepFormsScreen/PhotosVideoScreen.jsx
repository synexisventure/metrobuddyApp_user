import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader'
import Step6Form from '../../components/becomePartner/Step6Form'

const PhotosVideoScreen = () => {
  return (
   <View style={{ flex: 1,  backgroundColor : "#fff"
   }}>
      <StepFormsHeader />
      <Step6Form />
    </View>
  )
}

export default PhotosVideoScreen

const styles = StyleSheet.create({})