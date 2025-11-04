import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import HeaderCard from "../../components/businessDashboard/HeaderCard";
import BusinessDetailsCard from "../../components/businessDashboard/BusinessDetailsCard";
import ContactCard from "../../components/businessDashboard/ContactCard";
import TimingCard from "../../components/businessDashboard/TimingCard";
import CategoryCard from "../../components/businessDashboard/CategoryCard";
import ProductCard from "../../components/businessDashboard/ProductCard";
import DocumentsCard from "../../components/businessDashboard/DocumentsCard";
import PhotosVideosCard from "../../components/businessDashboard/PhotosVideosCard";
import { AppContext } from "../../context/AppContext";
import { useFocusEffect } from "@react-navigation/native";

const BusinessDashboardScreen = ({ navigation }) => {
    const { fetchAllBusinessSteps, businessDetails, contactDetails, businessTiming, businessCategory, businessProducts, businessDocuments, businessMedia } = useContext(AppContext);

    const businessInfo = {
        name: "Bharat Traders",
        owner: "Rahul Verma",
        type: "Wholesale",
        description: "Leading supplier of hardware and tools.",
    };

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                await fetchAllBusinessSteps();
                console.log(" business details : ", businessDetails);
            })()
        }, []
        ));

    return (<>
        {/* <StepFormsHeader title="Your Businesses" /> */}
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* <HeaderCard
                name={businessInfo.name}
                owner={businessInfo.owner}
            /> */}
            <HeaderCard
                name={businessDetails?.businessName || "Business Name"}
                owner={businessDetails?.businessId || "Owner Name"}
                onBellPress={() => navigation.navigate("Notifications")}
            />

            <BusinessDetailsCard
                details={businessInfo}

            />

            {/* Similar for other parts */}
            <ContactCard />
            <TimingCard />
            <CategoryCard />
            <ProductCard />
            <PhotosVideosCard />
            <DocumentsCard />
        </ScrollView>
    </>
    );
};

export default BusinessDashboardScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa", padding: 10 },
});
