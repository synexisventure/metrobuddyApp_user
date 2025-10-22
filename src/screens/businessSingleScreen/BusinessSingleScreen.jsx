// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import BusinessSingleheader from "../../components/businessSingle/BusinessSingleHeader";
// import BusinessSingleDetails from "../../components/businessSingle/BusinessSingleDetails";
// import BusinessSingleFilter from "../../components/businessSingle/BusinessSingleFilter";
// import BusinessOverview from "../../components/businessSingle/BusinessOverview"

// const BusinessSingleScreen = () => {
//   return (
//     <View>
//       <BusinessSingleheader/>
//       <BusinessSingleDetails/>
//       <BusinessSingleFilter/>
//       <BusinessOverview/>
//     </View>
//   )
// }

// export default BusinessSingleScreen

// const styles = StyleSheet.create({})


import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import BusinessSingleHeader from "../../components/businessSingle/BusinessSingleHeader";
import BusinessSingleDetails from "../../components/businessSingle/BusinessSingleDetails";
import BusinessSingleFilter from "../../components/businessSingle/BusinessSingleFilter";
import BusinessOverview from "../../components/businessSingle/BusinessOverview";

const BusinessSingleScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <BusinessSingleHeader />
      <BusinessSingleDetails />
      <BusinessSingleFilter />
      <BusinessOverview />
    </ScrollView>
  );
};

export default BusinessSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
