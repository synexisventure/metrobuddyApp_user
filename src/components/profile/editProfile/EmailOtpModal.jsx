import React, { useRef, useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    BackHandler,
    Keyboard
} from 'react-native';

const OTP_LENGTH = 6;

const EmailOtpModal = ({ visible, onClose, email, onSuccess }) => {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const inputs = useRef([]);

    // ✅ keyboard visibility ref (NO STATE)
    const keyboardVisibleRef = useRef(false);

    // 🔑 Track keyboard visibility ONCE
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => {
            keyboardVisibleRef.current = true;
            console.log('⌨️ keyboardDidShow');
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            keyboardVisibleRef.current = false;
            console.log('⌨️ keyboardDidHide');
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // Android back button
    useEffect(() => {
        if (!visible) return;

        const backAction = () => {
            resetAndClose();
            return true;
        };

        const sub = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => sub.remove();
    }, [visible]);

    const resetOtp = () => {
        setOtp(Array(OTP_LENGTH).fill(''));
    };

    const resetAndClose = () => {
        resetOtp();
        onClose();
    };

    const handleChange = (text, index) => {
        if (!/^\d?$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace') {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = '';
            } else if (index > 0) {
                newOtp[index - 1] = '';
                inputs.current[index - 1]?.focus();
            }
            setOtp(newOtp);
        }
    };

    const handleVerify = () => {
        const finalOtp = otp.join('');
        if (finalOtp.length !== OTP_LENGTH) return;

        onSuccess(finalOtp);
        resetAndClose();
    };

    // ✅ CORRECT refocus logic
    const refocusIfKeyboardHidden = async (inputRef) => {
        console.log('PRESS | keyboard visible:', keyboardVisibleRef.current);

        if (keyboardVisibleRef.current) return;

        Keyboard.dismiss();
        await new Promise(r => setTimeout(r, 50));
        inputRef?.focus();

        console.log('REFOCUS');
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={resetAndClose}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>

                    <TouchableOpacity style={styles.closeBtn} onPress={resetAndClose}>
                        <Image
                            source={require('../../../assets/images/cross.png')}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Image
                            source={require('../../../assets/images/verificationImage.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>Verify Your Email</Text>
                        <Text style={styles.subtitle}>
                            We’ve sent a verification code to {email}
                        </Text>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                Please enter the OTP below to continue.
                            </Text>
                        </View>

                        <View style={styles.otpContainer}>
                            {otp.map((val, index) => (
                                <TextInput
                                    key={index}
                                    ref={(r) => (inputs.current[index] = r)}
                                    style={styles.otpInput}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={val}
                                    showSoftInputOnFocus
                                    onChangeText={(t) => handleChange(t, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    onPressIn={() =>
                                        refocusIfKeyboardHidden(inputs.current[index])
                                    }
                                />
                            ))}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleVerify}>
                            <Text style={styles.buttonText}>Verify & Continue</Text>
                        </TouchableOpacity>

                        <Text style={styles.footer}>
                            Do not share your OTP with anyone.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default EmailOtpModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 20,
    },
    closeBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
    },
    closeIcon: {
        width: 22,
        height: 22,
        tintColor: '#444',
    },
    scroll: {
        alignItems: 'center',
        paddingTop: 20,
    },
    image: {
        width: 160,
        height: 120,
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 12,
    },
    infoBox: {
        backgroundColor: '#EEF5FF',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        marginBottom: 16,
    },
    infoText: {
        fontSize: 13,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    otpInput: {
        width: 44,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 18,
        elevation: 3,
    },
    button: {
        backgroundColor: '#C01818',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        fontSize: 11, 
        color: '#777',
        textAlign: 'center',
    },
});
