import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import TrendingBusinessesHeader from "../../components/trendingBusiness/TrendingBusinessesHeader";
import TabSelector from "../../components/commonTabSelector/TabSelector";
import TrendingBusinessesBody from "../../components/trendingBusiness/TrendingBusinessBody"

const TrendingBusinesses = () => {
    const tabs = ["All", "Featured", "High Rated", "Near Me", "Open Now"];

    return (
        <View style={styles.container}>
            <TrendingBusinessesHeader />
            <TabSelector tabs={tabs} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TrendingBusinessesBody />
            </ScrollView>
        </View>
    );
};

export default TrendingBusinesses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});
 