import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader'
import Step4Form from '../../components/becomePartner/Step4Form'

const BusinessTimingScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StepFormsHeader />
      <Step4Form />
    </View>
  )
}

export default BusinessTimingScreen

const styles = StyleSheet.create({})