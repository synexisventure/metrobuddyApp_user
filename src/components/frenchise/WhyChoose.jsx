import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const data = [
    {
        id: 1,
        icon: require('../../assets/images/dollar.png'),
        title: 'Low Investment',
        desc: 'Start with just ₹5.5L investment',
        // bg: '#E8FFF3',
    },
    {
        id: 2,
        icon: require('../../assets/images/franchise.png'),
        title: 'High ROI',
        desc: 'Guaranteed returns up to 200%',
        // bg: '#E9F4FF',
    },
    {
        id: 3,
        icon: require('../../assets/images/support.png'),
        title: '24*7 Support',
        desc: 'Round-the-clock assistance',
        // bg: '#F4E9FF',
    },
    {
        id: 4,
        icon: require('../../assets/images/team.png'),
        title: 'Training Provided',
        desc: 'Complete business training',
        // bg: '#FFF2E8',
    },
];

const WhyChoose = () => {
    return (
        <View style={styles.container}>
            {data.map(item => (
                <View key={item.id} style={[styles.card, { backgroundColor: item.bg }]}>
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                </View>
            ))}
        </View>
    );
};

export default WhyChoose;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor : "#fff"
    },
    card: {
        width: '47%',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth : 1,
        borderColor : "#e2e8f0"
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    desc: {
        fontSize: 13,
        textAlign: 'center',
        color: '#555',
    },
});
