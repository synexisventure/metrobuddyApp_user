import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubscriptionHeader = ({ isYearly, onToggle, isNavigateToBack = false }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* First Row - Back Button and Title */}
            <View style={styles.firstRow}>


                {(isNavigateToBack == true) ?
                    <>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require('../../assets/images/backArrow.png')}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>


                        <Text style={styles.title}>Choose Subscription Plan</Text>

                        {/* Empty view for balance */}
                        <View style={styles.placeholder} />

                    </>
                    : <>
                        {/* Empty view for balance */}
                        <View style={styles.placeholder} />

                        <Text style={styles.title}>Choose Subscription Plan</Text>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {

                                navigation.navigate("MainTabs", {
                                    screen: "Home"
                                })
                            }
                            }
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require('../../assets/images/cross.png')}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                    </>
                }

            </View>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
                Select the perfect plan for your {'\n'}business needs.
            </Text>

            {/* Switch Toggle */}
            <View style={styles.toggleContainer}>
                <Text style={[styles.toggleLabel, !isYearly && styles.activeLabel]}>
                    Monthly
                </Text>

                <TouchableOpacity
                    style={styles.switchWrapper}
                    activeOpacity={0.8}
                    onPress={onToggle}
                >
                    <View style={[styles.circle, isYearly && styles.circleRight]} />
                </TouchableOpacity>

                <Text style={[styles.toggleLabel, isYearly && styles.activeLabel]}>
                    Yearly
                </Text>
            </View>
        </View>
    );
};

export default SubscriptionHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B91C1C',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 20,
        height: 20,
        // tintColor: '#fff',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    placeholder: {
        width: 40,
    },
    subtitle: {
        color: '#E9EEFF',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 15,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignSelf: 'center',
    },
    toggleLabel: {
        color: '#D6DCFF',
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 8,
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '700',
    },
    switchWrapper: {
        width: 48,
        height: 26,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 3,
        marginHorizontal: 6,
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#B91C1C',
    },
    circleRight: {
        alignSelf: 'flex-end',
    },
});