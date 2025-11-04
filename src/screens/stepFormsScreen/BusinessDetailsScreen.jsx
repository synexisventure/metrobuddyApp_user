import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader'
import Step2Form from '../../components/becomePartner/Step2Form' 

const BusinessDetailsScreen = () => {
 
  return (
    <View style={{ flex: 1 }}>

      <StepFormsHeader />
      <Step2Form />

    </View>
  )
}

export default BusinessDetailsScreen

const styles = StyleSheet.create({})