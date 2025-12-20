import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';

const EditProfileBody = () => {
    const {
        profile,
        profileLoading,
        fetchUserProfile,
    } = useContext(AppContext);

    // Call profile API when screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchUserProfile();
        }, [])
    );

    if (profileLoading) {
        return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Email Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={profile?.email || ''}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                />
                <Text style={styles.description}>
                    We'll use this email for updates and communication
                </Text>
            </View>

            {/* Full Name Section (if exists later) */}
            <View style={styles.section}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={profile?.name || ''}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                />
                <Text style={styles.description}>
                    We'll use this name for updates and communication
                </Text>
            </View>

            {/* Mobile Number Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                    style={styles.input}
                    value={profile?.phone ? String(profile.phone) : ''}
                    editable={false}
                />
            </View>
        </View>
    );
};

export default EditProfileBody;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    section: {
        marginBottom: 25,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 6,
        marginLeft: 5,
    },
})