import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader'
import Step5Form from '../../components/becomePartner/Step5Form'

const BusinessCategoryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StepFormsHeader />
      <Step5Form />
    </View>
  );
};


export default BusinessCategoryScreen

const styles = StyleSheet.create({})