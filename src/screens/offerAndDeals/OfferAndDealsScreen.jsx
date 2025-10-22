import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import OfferAndDealsHeader from "../../components/offersAndDeals/OfferAndDealsHeader";
import OfferAndDealsFilters from "../../components/offersAndDeals/OfferAndDealsFilters";
import OfferAndDealsBody from "../../components/offersAndDeals/OfferAndDealsBody";

const OfferAndDealsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Offers');

  return (
    <>
      <OfferAndDealsHeader />
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
        <OfferAndDealsFilters onSelectFilter={setSelectedFilter} />
        <OfferAndDealsBody filter={selectedFilter} />
      </ScrollView>
    </>
  );
};

export default OfferAndDealsScreen;

const styles = StyleSheet.create({});
