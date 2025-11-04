import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepFormsHeader from '../../components/becomePartner/StepFormsHeader'
import AddProductForm from '../../components/becomePartner/AddProductForm'

const AddProductScreen = () => {
  return (
    <View style={{ flex: 1 ,   backgroundColor : "#fff"
    }}>
      <StepFormsHeader />
      <AddProductForm />
    </View>
  )
}

export default AddProductScreen

const styles = StyleSheet.create({})