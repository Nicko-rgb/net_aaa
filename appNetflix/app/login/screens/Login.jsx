import React, { useState } from 'react';
import { View, ScrollView, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/login.js';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Login = ({ visible, onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [focusedField, setFocusedField] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigation = useNavigation();

    const { login, register, loading, isProcessing } = useAuthContext();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Limpiar error del campo específico
        if (fieldErrors[field]) {
            setFieldErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.email.trim()) {
            errors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Ingresa un email válido';
        }
        
        if (!formData.password.trim()) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        
        if (!isLogin && !formData.name.trim()) {
            errors.name = 'El nombre es requerido';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        // Prevenir múltiples llamadas mientras está procesando
        if (loading || isProcessing) {
            return;
        }

        const result = isLogin
            ? await login(formData.email, formData.password)
            : await register(formData.name, formData.email, formData.password);

        if (result.success) {
            Alert.alert('Éxito', isLogin ? 'Sesión iniciada' : 'Cuenta creada', [
                {
                    text: 'OK',
                    onPress: () => {
                        onLoginSuccess();
                        // Navegar al Browser después del login exitoso
                        navigation.navigate('Browser');
                    }
                }
            ]);
        } else {
            Alert.alert('Error', result.error || 'Error desconocido');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '' });
        setFieldErrors({});
    };

    const handleClose = () => {
        setFormData({ name: '', email: '', password: '' });
        setFieldErrors({});
        setFocusedField('');
        onClose();
    };

    const renderInput = (field, placeholder, secureTextEntry = false) => {
        const isFocused = focusedField === field;
        const hasValue = formData[field].length > 0;
        const hasError = fieldErrors[field];

        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        isFocused && styles.inputFocused,
                        hasError && styles.inputError
                    ]}
                    value={formData[field]}
                    onChangeText={(value) => handleInputChange(field, value)}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField('')}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                    keyboardType={field === 'email' ? 'email-address' : 'default'}
                />
                <Text style={[
                    styles.inputLabel,
                    (isFocused || hasValue) && styles.inputLabelFocused
                ]}>
                    {placeholder}
                </Text>
                {hasError && (
                    <Text style={styles.errorText}>{hasError}</Text>
                )}
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={handleClose}
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={handleClose}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>

                    <ScrollView 
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={true}
                    >
                    <View style={styles.header}>
                        <Text style={styles.logo}>NETFOX</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Toggle entre Login y Registro */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    isLogin && styles.toggleButtonActive
                                ]}
                                onPress={() => setIsLogin(true)}
                            >
                                <Text style={[
                                    styles.toggleButtonText,
                                    isLogin && styles.toggleButtonTextActive
                                ]}>
                                    Iniciar sesión
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    !isLogin && styles.toggleButtonActive
                                ]}
                                onPress={() => setIsLogin(false)}
                            >
                                <Text style={[
                                    styles.toggleButtonText,
                                    !isLogin && styles.toggleButtonTextActive
                                ]}>
                                    Registrarse
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>
                            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
                        </Text>

                        {/* Formulario */}
                        {!isLogin && renderInput('name', 'Nombre completo')}
                        {renderInput('email', 'Email o número de teléfono')}
                        {renderInput('password', 'Contraseña', true)}

                        {/* Botón de envío */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                (loading || isProcessing) && styles.buttonDisabled
                            ]}
                            onPress={handleSubmit}
                            disabled={loading || isProcessing}
                        >
                            <Text style={styles.buttonText}>
                                {(loading || isProcessing)
                                    ? (isLogin ? 'Iniciando sesión...' : 'Creando cuenta...') 
                                    : (isLogin ? 'Iniciar sesión' : 'Registrarse')
                                }
                            </Text>
                        </TouchableOpacity>

                        {/* Opciones adicionales solo para login */}
                        {isLogin && (
                            <View style={styles.optionsContainer}>
                                <TouchableOpacity 
                                    style={styles.checkboxContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <View style={[
                                        styles.checkbox,
                                        rememberMe && styles.checkboxChecked
                                    ]}>
                                        {rememberMe && (
                                            <Text style={{ color: '#fff', fontSize: 10 }}>✓</Text>
                                        )}
                                    </View>
                                    <Text style={styles.checkboxText}>Recuérdame</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity>
                                    <Text style={styles.helpLink}>¿Necesitas ayuda?</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.switchText}>
                                {isLogin ? '¿Primera vez en Netflix?' : '¿Ya tienes una cuenta?'}
                                <TouchableOpacity onPress={toggleMode}>
                                    <Text style={styles.switchLink}>
                                        {isLogin ? ' Suscríbete ahora' : ' Inicia sesión'}
                                    </Text>
                                </TouchableOpacity>
                            </Text>
                            
                            <Text style={styles.termsText}>
                                Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
                                <Text style={styles.termsLink}> Más info.</Text>
                            </Text>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default Login;