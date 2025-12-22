import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmailOtpModal from './EmailOtpModal';
import LoadingOverlay from "../../commonLoading/LoadingOverlay";
import Toast from 'react-native-toast-message';

const EditProfileBody = () => {
    const {
        API_BASE_URL,
        profile,
        profileLoading,
        fetchUserProfile,
    } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);

    // Fetch profile on focus
    useFocusEffect(
        useCallback(() => {
            fetchUserProfile();
        }, [])
    );

    // Populate inputs
    useEffect(() => {
        if (profile) {
            setEmail(profile.email || '');
            setName(profile.name || '');
        }
    }, [profile]);

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // ================= EMAIL =================
    const handleEmailDone = async () => {

        console.log("New email is : ", email);
        console.log("Old email is : ", profile);
        console.log("Route of send otp to email is : ", `${API_BASE_URL}/user/send-email-update-otp`);

        setEmailError('');

        if (!email.trim()) {
            setEmailError('Email cannot be empty');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        if (email.trim() === profile?.email) {
            setEmailError('Email not changed');
            return;
        }

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const resp = await axios.post(
                `${API_BASE_URL}/user/send-email-update-otp`,
                { newEmail: email.trim() },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('otp send to (email):', resp.data);
            Keyboard.dismiss();
            setShowEmailOtpModal(true); // OPEN MODAL

        } catch (err) {
            console.log(err.response);

            setEmailError(err?.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    // ================= NAME =================
    const handleNameDone = async () => {
        setNameError('');

        if (!name.trim()) {
            setNameError('Name cannot be empty');
            return;
        }

        if (name.trim() === profile?.name) {
            setNameError('Name not changed');
            return;
        }

        try {
            setLoading(true);

            const token = await AsyncStorage.getItem('token');

            const resp = await axios.put(
                `${API_BASE_URL}/user/profile`,
                { name: name.trim() },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Update profile (name):', resp.data);

            Keyboard.dismiss();
            fetchUserProfile();

        } catch (err) {
            setNameError(err?.response?.data?.message || 'Name update failed');
        } finally {
            setLoading(false);
        }
    };

    // ================= verify otp =================
    const verifyEmailOtp = async (otp) => {

        console.log('FINAL OTP:', otp);

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const resp = await axios.post(
                `${API_BASE_URL}/user/verify-email-update`,
                { otp: otp },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Toast.show({
                type: "success",
                text1: "Email Updated",
                text2: "Your email address has been changed successfully.",
            });

            console.log('otp verify for email : ', resp.data);
            Keyboard.dismiss();
            setShowEmailOtpModal(false); // OPEN MODAL

        } catch (err) {
            console.log(err.response);

            Alert.alert(err?.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    if (profileLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                {/* EMAIL */}
                <View style={styles.section}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Add your email..."
                        placeholderTextColor="#555"
                        returnKeyType="done"
                        onSubmitEditing={!loading ? handleEmailDone : null}
                        editable={!loading}
                    />
                    {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                </View>

                {/* NAME */}
                <View style={styles.section}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Add your name..."
                        placeholderTextColor="#555"
                        returnKeyType="done"
                        onSubmitEditing={!loading ? handleNameDone : null}
                        editable={!loading}
                    />
                    {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
                </View>

                {/* PHONE */}
                <View style={styles.section}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput
                        style={[styles.input, styles.disabled]}
                        value={profile?.phone ? String(profile.phone) : ''}
                        editable={false}
                    />
                </View>

                {loading && <LoadingOverlay />}

            </ScrollView>

            <EmailOtpModal
                visible={showEmailOtpModal}
                onClose={() => setShowEmailOtpModal(false)}
                email={email}
                onSuccess={(otp) => {
                    verifyEmailOtp(otp);
                }}
            />

        </KeyboardAvoidingView>
    );
};

export default EditProfileBody;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 25,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
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
    disabled: {
        backgroundColor: '#eee',
    },
    error: {
        color: 'red',
        marginTop: 6,
    },
});
