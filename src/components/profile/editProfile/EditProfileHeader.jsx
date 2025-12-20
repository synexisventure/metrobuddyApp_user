import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const EditProfileHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>

                {/* Back Button */}
                <Pressable
                    onPress={() => navigation.goBack()}
                    hitSlop={10}
                >
                    <Image
                        style={styles.backIcon}
                        source={require("../../../assets/images/backNavigation.png")}
                    />
                </Pressable>

                <Text style={styles.title}>Profile Update</Text>

                {/* Notification Button */}
                {/* <Pressable
                    onPress={() => {
                        navigation.navigate('NotificationsScreen');
                    }}
                    hitSlop={10}
                >
                    <Image
                        style={styles.notificationIcon}
                        source={require("../../../assets/images/notification.png")}
                    />
                </Pressable> */}
                <View></View>

            </View>
        </View>
    );
};

export default EditProfileHeader;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#B91C1C",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingBottom: 1,
    },
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backIcon: {
        height: 34,
        width: 17,
    },
    notificationIcon: {
        height: 18,
        width: 18,
    },
    title: {
        color: "#B91C1C",
        fontSize: 16,
        fontWeight: "700",
    },
});
