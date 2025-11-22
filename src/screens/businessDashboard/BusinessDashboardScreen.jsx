import React, { useContext, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

// import HeaderCard from "../../components/businessDashboard/HeaderCard";

import DashboardHeader from "../../components/businessDashboard/DashboardHeader";
import DashboardDetails from "../../components/businessDashboard/DashboardDetails";
import DashboardFilter from "../../components/businessDashboard/DashboardFilter";
import DashboardOverview from "../../components/businessDashboard/DashboardOverview";
import DashboardReviews from "../../components/businessDashboard/DashboardReviews";
import DashboardPhotos from "../../components/businessDashboard/DashboardPhotos";
import StepFormsHeader from "../../components/becomePartner/StepFormsHeader";
import DashboardProduct from "../../components/businessDashboard/DashboardProduct";
import DashboardPersonalWallet from "../../components/businessDashboard/DashboardPersonalWallet";

import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import SubscriptionScreen from "../Subscription/SubscriptionScreen";
import CurrentSubscriptionScreen from "../Subscription/CurrentSubcriptionScreen";

const BusinessSingleScreen = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const {
        allBusinessLoading,
        fetchAllBusinessSteps,
        businessDetails,
        contactDetails,
        businessTiming,
        businessCategory,
        businessProducts,
        businessDocuments,
        businessMedia 
    } = useContext(AppContext);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                await fetchAllBusinessSteps();
                console.log(" business details : ", businessDetails);
            })()
        }, [])
    );

    return (
        <>
            <StepFormsHeader
                title="Your Business"
                subtitle="Manage your business profiles"
            />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <DashboardHeader />
                <DashboardDetails />
                <DashboardFilter activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "Overview" && <DashboardOverview />}
                {activeTab === "Reviews" && <DashboardReviews />}
                {activeTab === "Photos" && <DashboardPhotos />}
                {activeTab === "Subscription" && <CurrentSubscriptionScreen/> }
                {activeTab === "Personal Wallet" && <DashboardPersonalWallet/> }
                {activeTab === "Products" && <DashboardProduct/> }

            </ScrollView>
        </>
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
    walletContainer: {
        padding: 20,
        alignItems: "center",
    },
    walletText: {
        fontSize: 15,
        color: "#555",
    },
    photoContainer: {
        padding: 20,
        alignItems: "center",
    },
    photoText: {
        fontSize: 15,
        color: "#555",
    },
});