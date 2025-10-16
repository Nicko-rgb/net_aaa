import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/registroStyles';
import { useAuth } from '../../context/AuthContext';
import indexImg from '../../../assets/img/indexImg';

const Registro = ({ navigation, onToggleView, onSuccess, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('Por favor completa todos los campos');
            return false;
        }
        if (/\d/.test(name)) {
            setError('Solo se permiten letras en el nombre');
            return false;
        }
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor ingresa un email válido');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        setError('');
        if (!validateForm()) return;

        setLoading(true);
        try {
            const result = await register(name, email, password);
            if (result && result.success) {
                if (onSuccess) onSuccess();
            } else {
                setError(result?.message || 'Error en el registro');
            }
        } catch (err) {
            setError('Error de conexión. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const keyboardVerticalOffset = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

    return (
        <SafeAreaView style={styles.container}>
            {(onClose || navigation) && (
                <View style={styles.topHeader}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            if (onClose) return onClose();
                            if (navigation && navigation.goBack) return navigation.goBack();
                        }}
                    >
                        <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>
                    <Image source={indexImg.logoNet} style={styles.topLogoImage} />
                </View>
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.logoText}>NETFOX</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.title}>Crear cuenta</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar contraseña"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Crear cuenta</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity onPress={() => onToggleView && onToggleView()}>
                            <Text style={styles.linkText}> Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.termsText}>
                        Al hacer clic en "Crear cuenta", aceptas nuestros Términos de uso y Política de privacidad.
                    </Text>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Registro;
