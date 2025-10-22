import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import HelpAndSupportHeader from "../../components/helpAndSupport/HelpAndSupportHeader";
import HelpAndSupportFilter from "../../components/helpAndSupport/HelpAndSupportFilter";

import Faq from "../../components/helpAndSupport/Faq";
import Contact from "../../components/helpAndSupport/Contact";
import MyTickets from "../../components/helpAndSupport/MyTickets";

const HelpAndSupportScreen = () => {
  const [activeFilter, setActiveFilter] = useState("FAQ");

  const filters = ["FAQ", "Contact", "My Tickets"];

  const renderContent = () => {
    switch (activeFilter) {
      case "FAQ":
        return <Faq />;
        // return <></>;
      case "Contact":
        return <Contact />;
      case "My Tickets":
        return <MyTickets />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.main}>
      <HelpAndSupportHeader />
      <HelpAndSupportFilter 
        filters={filters} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
      />
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

export default HelpAndSupportScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
});
