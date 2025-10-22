import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import FrenchiseHeader from "../../components/frenchise/frenchiseHeader";
import WhyChoose from "../../components/frenchise/WhyChoose";
import SuccessNumbers from "../../components/frenchise/SuccessNumbers"
import ProcessStep from "../../components/frenchise/ProcessStep";
import ApplyFranchise from "../../components/frenchise/ApplyFranchise";

const FranchiseScreen = () => {
  return (
    <ScrollView style={{backgroundColor : "#fff"}}>
      <FrenchiseHeader/>
      <WhyChoose/> 
      <SuccessNumbers/>
      <ProcessStep/>
      <ApplyFranchise/>
    </ScrollView>
  )
}

export default FranchiseScreen

const styles = StyleSheet.create({

})