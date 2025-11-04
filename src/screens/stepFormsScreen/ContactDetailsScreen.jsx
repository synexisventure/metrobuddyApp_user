import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader'
import Step2Form from '../../components/becomePartner/Step2Form'
import { AppContext } from '../../context/AppContext'
import { useFocusEffect } from '@react-navigation/native'
import Step3Form from '../../components/becomePartner/Step3Form'

const ContactDetailsScreen = () => {
 
  return (
    <View style={{ flex: 1 }}>

      <StepFormsHeader />
      <Step3Form />

    </View>
  )
}

export default ContactDetailsScreen

const styles = StyleSheet.create({})