// ForgotPassword.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import styles from '../styles/forgotStyles';

// Ajusta baseUrl según tu entorno:
// - Android emulator: 'http://10.0.2.2:7001'
// - iOS simulator / web: 'http://localhost:7001'
// - Dispositivo físico: 'http://<IP_DE_TU_PC>:7001'
// const BASE_URL = 'http://10.0.2.2:7001';
const BASE_URL = 'http://192.168.18.22:7001';


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
      const resp = await fetch(`${BASE_URL}/api/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await resp.json();
      if (resp.ok) {
        Alert.alert('Enviado', 'Si el email existe, recibirás un código de verificación.');
        if (onSent) onSent(email);
        onClose && onClose();
      } else {
        Alert.alert('Error', data?.message || 'No se pudo enviar el código');
      }
    } catch (err) {
      console.error('Error request-otp', err);
      Alert.alert('Error', 'No se pudo conectar al servidor. Revisa la red y la URL.');
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