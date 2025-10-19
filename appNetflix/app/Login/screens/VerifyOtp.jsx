// VerifyOtp.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import styles from '../styles/forgotStyles';

// Detecta la plataforma y usa la URL correcta
const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:7001' // para navegador / laptop
    : 'http://192.168.18.22:7001'; // para celular físico o emulador

const VerifyOtp = ({ visible, onClose, email, onReset }) => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length < 6)
      return Alert.alert('Código inválido', 'Ingresa el código de 6 dígitos');
    if (!password || password.length < 8)
      return Alert.alert('Contraseña', 'Debe tener al menos 8 caracteres');
    if (password !== confirm)
      return Alert.alert('Contraseñas', 'Las contraseñas no coinciden');

    setLoading(true);
    try {
      const resp = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await resp.json();
      console.log('Respuesta servidor verify-otp:', data);

      if (resp.ok) {
        // Si el código OTP es correcto, muestra un aviso antes de cambiar la contraseña
        if (data?.valid === false) {
          Platform.OS === 'web'
            ? alert('El código ingresado es incorrecto o ha expirado.')
            : Alert.alert('Error', 'El código ingresado es incorrecto o ha expirado.');
          return;
        }

        // ✅ Código correcto → cambiar contraseña
        if (Platform.OS === 'web') {
          alert('Tu contraseña fue cambiada correctamente. Ahora puedes iniciar sesión.');
          if (onReset) onReset(email, password);
          if (onClose) onClose();
        } else {
          Alert.alert(
            'Éxito',
            'Tu contraseña fue cambiada correctamente. Ahora puedes iniciar sesión.',
            [
              {
                text: 'Ir al login',
                onPress: () => {
                  if (onReset) onReset(email, password);
                  if (onClose) onClose();
                },
              },
            ]
          );
        }
      } else {
        // ❌ Si el servidor responde error, mostrar mensaje claro
        const msg = data?.message || 'Código incorrecto o expirado';
        Platform.OS === 'web' ? alert(msg) : Alert.alert('Error', msg);
      }
    } catch (err) {
      console.error('Error verify-otp', err);
      Platform.OS === 'web'
        ? alert('No se pudo conectar al servidor. Revisa la red y la URL.')
        : Alert.alert('Error', 'No se pudo conectar al servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Introduce el código</Text>
        <Text style={styles.subtitle}>Te hemos enviado un código a {email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Código (6 dígitos)"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cambiar contraseña</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => onClose && onClose()}>
          <Text style={styles.linkText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default VerifyOtp;
