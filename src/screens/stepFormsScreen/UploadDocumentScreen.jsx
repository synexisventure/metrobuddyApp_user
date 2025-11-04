import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader' 
import Step7Form from '../../components/becomePartner/Step7Form'

const UploadDocumentScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StepFormsHeader />
      <Step7Form />
    </View>
  )
}

export default UploadDocumentScreen

const styles = StyleSheet.create({})