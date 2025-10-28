// ForgotPassword.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import styles from '../styles/forgotStyles';
import apiClient from '../../utils/axiosInstance';


const ForgotPassword = ({ visible, onClose, onSent }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (value) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(value).toLowerCase());
    };

    const handleSend = async () => {
        if (!email || !validateEmail(email)) {
            Alert.alert('Email inválido', 'Por favor ingresa un email válido');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post('/forgot-password', { email });
            
            if (response.status === 200) {
                Alert.alert(
                    'Enviado', 
                    'Si el email existe, recibirás un código de verificación.',
                    [
                        {
                            text: 'Continuar',
                            onPress: () => {
                                if (onSent) onSent(email);
                                onClose && onClose();
                            }
                        }
                    ]
                );
            }
        } catch (error) {
            console.error('Error request-otp', error);
            const message = error.response?.data?.message || 'No se pudo enviar el código';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Recuperar contraseña</Text>
                <Text style={styles.subtitle}>Ingresa el email asociado a tu cuenta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email (ej. nombre@gmail.com)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar código</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.link} onPress={() => onClose && onClose()}>
                    <Text style={styles.linkText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ForgotPassword;