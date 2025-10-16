import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import FrenchiseHeader from "../../components/frenchise/frenchiseHeader";
import WhyChoose from "../../components/frenchise/WhyChoose";

const FranchiseScreen = () => {
  return (
    <ScrollView>
      <FrenchiseHeader/>
      <WhyChoose/> 
    </ScrollView>
  )
}

export default FranchiseScreen

const styles = StyleSheet.create({})