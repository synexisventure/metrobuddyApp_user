import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';

const SettingsBody = () => {
    const [push, setPush] = useState(true);
    const [email, setEmail] = useState(false);
    const [sms, setSms] = useState(true);
    const [dataQuality, setDataQuality] = useState('Medium');

    return (
        <View style={styles.container}>
            {/* 🔔 Notifications */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Image source={require('../../assets/images/bell.png')} style={styles.icon} />
                    <Text style={styles.sectionTitle}>Notifications</Text>
                </View>

                <View style={styles.optionRow}>
                    <View>
                        <Text style={styles.optionTitle}>Push Notifications</Text>
                        <Text style={styles.optionSubtitle}>Receive app notifications</Text>
                    </View>
                    <Switch
                        value={push}
                        onValueChange={setPush}
                        trackColor={{ false: "#E5E5EA", true: "#030213" }}
                        thumbColor={sms ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#E5E5EA"
                    />
                </View>

                <View style={styles.line} />

                <View style={styles.optionRow}>
                    <View>
                        <Text style={styles.optionTitle}>Email Notifications</Text>
                        <Text style={styles.optionSubtitle}>Receive updates via email</Text>
                    </View>
                    <Switch
                        value={email}
                        onValueChange={setEmail}
                        trackColor={{ false: "#E5E5EA", true: "#030213" }}
                        thumbColor={sms ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#E5E5EA"
                    />
                </View>

                <View style={styles.line} />

                <View style={styles.optionRow}>
                    <View>
                        <Text style={styles.optionTitle}>SMS Notifications</Text>
                        <Text style={styles.optionSubtitle}>Receive important updates via SMS</Text>
                    </View>
                    <Switch
                        value={sms}
                        onValueChange={setSms}
                        trackColor={{ false: "#E5E5EA", true: "#030213" }}
                        thumbColor={sms ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#E5E5EA"
                    />

                </View>
            </View>

            {/* 📶 Data Usage Preference */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    {/* <Image source={require('../../assets/images/data.png')} style={styles.icon} /> */}
                    <Text style={styles.sectionTitle}>Data Usage Preference</Text>
                </View>

                {['Low', 'Medium', 'High'].map((quality) => (
                    <TouchableOpacity
                        key={quality}
                        style={[
                            styles.radioOption,
                            dataQuality === quality && styles.selectedOption,
                        ]}
                        onPress={() => setDataQuality(quality)}
                    >
                        <View style={styles.radioTextContainer}>
                            <Text style={styles.optionTitle}>
                                {quality} Quality
                            </Text>
                            <Text style={styles.optionSubtitle}>
                                {quality === 'Low'
                                    ? 'Minimal data usage, faster loading'
                                    : quality === 'Medium'
                                        ? 'Balanced quality and data usage'
                                        : 'Best quality, higher data usage'}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.radioCircle,
                                dataQuality === quality && styles.radioCircleSelected,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* ⚙️ Account Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Actions</Text>

                <TouchableOpacity style={styles.actionRow}>
                    <Image source={require('../../assets/images/delete.png')} style={styles.actionIcon} />
                    <View>
                        <Text style={[styles.actionTitle, { color: '#E53935' }]}>Delete Account</Text>
                        <Text style={styles.optionSubtitle}>Permanently delete your account</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsBody;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 8,
        tintColor: '#000',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    optionSubtitle: {
        fontSize: 12,
        color: '#6b7280',
    },
    line: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 4,
    },
    radioOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginVertical: 5,
    },
    selectedOption: {
        borderColor: '#2563eb',
        backgroundColor: '#eff6ff',
    },
    radioTextContainer: {
        flex: 1,
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#9ca3af',
    },
    radioCircleSelected: {
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#9ca3af',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 8,
    },
    actionIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
        tintColor: '#E53935',
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E53935',
    },

});
