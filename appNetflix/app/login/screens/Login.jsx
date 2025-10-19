import React, { useState, useRef } from 'react';
import { 
    View, 
    ScrollView, 
    Modal, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    Animated,
    Dimensions,
    PanResponder
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/login.js';
import { useAuth } from '../hooks/useAuth.js';

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

    const { login, register, loading, error, clearError } = useAuth();

    // Animación para el gesto de arrastrar
    const translateY = useRef(new Animated.Value(0)).current;
    const screenHeight = Dimensions.get('window').height;
    const SWIPE_THRESHOLD = 100; // Distancia mínima para cerrar el modal

    // PanResponder para manejar el gesto de arrastrar
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // Solo activar si el gesto es principalmente vertical hacia abajo
                return gestureState.dy > 10 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
            },
            onPanResponderGrant: () => {
                // Preparar la animación
                translateY.setOffset(translateY._value);
            },
            onPanResponderMove: (evt, gestureState) => {
                // Solo permitir movimiento hacia abajo
                if (gestureState.dy >= 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                translateY.flattenOffset();
                
                if (gestureState.dy > SWIPE_THRESHOLD) {
                    // Cerrar modal con animación
                    Animated.timing(translateY, {
                        toValue: screenHeight,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        handleClose();
                        translateY.setValue(0);
                    });
                } else {
                    // Volver a la posición original
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

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
        
        // Limpiar error general
        if (error) {
            clearError();
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
        
        try {
            let result;
            
            if (isLogin) {
                result = await login(formData.email, formData.password);
            } else {
                result = await register(formData.name, formData.email, formData.password);
            }
            
            if (result.success) {
                Alert.alert(
                    'Éxito',
                    isLogin ? 'Sesión iniciada correctamente' : 'Cuenta creada exitosamente',
                    [{ 
                        text: 'OK', 
                        onPress: () => {
                            onLoginSuccess();
                        }
                    }]
                );
            }
        } catch (err) {
            console.error('Error en autenticación:', err);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '' });
        setFieldErrors({});
        clearError();
    };

    const handleClose = () => {
        setFormData({ name: '', email: '', password: '' });
        setFieldErrors({});
        clearError();
        setFocusedField('');
        // Resetear la animación
        translateY.setValue(0);
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
                <Animated.View 
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{ translateY }]
                        }
                    ]}
                    {...panResponder.panHandlers}
                >
                    {/* Indicador de arrastre */}
                    <View style={styles.dragIndicator} />
                    
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

                        {/* Error general */}
                        {error && (
                            <Text style={styles.generalError}>{error}</Text>
                        )}

                        {/* Formulario */}
                        {!isLogin && renderInput('name', 'Nombre completo')}
                        {renderInput('email', 'Email o número de teléfono')}
                        {renderInput('password', 'Contraseña', true)}

                        {/* Botón de envío */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                loading && styles.buttonDisabled
                            ]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading 
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
                </Animated.View>
            </View>
        </Modal>
    );
};

export default Login;