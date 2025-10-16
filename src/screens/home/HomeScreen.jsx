import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

import CommonHeader from "../../components/commonHeader/CommonHeader";
import BrowseCategory from "../../components/home/BrowseCategory";
import TrendingNow from "../../components/home/TrendingNow";
import QuickActions from "../../components/home/QuickActions";
import FranchiseOpportunityCard from "../../components/home/FranchiseOpportunityCard";

const HomeScreen = () => {
  return (
    <View style={{flex :1}}>
      <CommonHeader />
      <ScrollView 
      style={{}}
      contentContainerStyle={styles.scrollContent}
      >
        <FranchiseOpportunityCard />
        <BrowseCategory />
        <TrendingNow />
        <QuickActions />
      </ScrollView>
    </View>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  scrollContent : {
    // paddingBottom : 130
  }
})