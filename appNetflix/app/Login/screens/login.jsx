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
import styles from '../styles/loginStyles';
import { useAuth } from '../../context/AuthContext';
import indexImg from '../../../assets/img/indexImg';
import ForgotPassword from './ForgotPassword';
import VerifyOtp from './VerifyOtp';

const Login = ({ navigation, onToggleView, onSuccess, onClose }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { login } = useAuth();

	const handleSubmit = async () => {
		setError('');
		if (!email || !password) {
			setError('Por favor completa todos los campos');
			return;
		}

		setLoading(true);
			try {
				const result = await login(email, password);
				if (result && result.success) {
					if (onSuccess) onSuccess();
				} else {
					setError(result?.message || 'Credenciales inválidas');
				}
			} catch (err) {
				setError('Error de conexión. Intenta nuevamente.');
			} finally {
				setLoading(false);
			}
	};

	const keyboardVerticalOffset = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

	const [showForgot, setShowForgot] = useState(false);
	const [showVerify, setShowVerify] = useState(false);
	const [devOtp, setDevOtp] = useState(null);
	const [otpEmail, setOtpEmail] = useState('');

	// Handler cuando ForgotPassword genera y "envía" el OTP (modo dev)
	const handleForgotSent = (email, otp) => {
		setOtpEmail(email);
		setDevOtp(otp);
		setShowForgot(false);
		setShowVerify(true);
		// Mostrar el OTP en un alert para pruebas locales (no hacer esto en producción)
		Alert.alert('Código (dev)', `Código enviado: ${otp}`);
	};

	const handleReset = (email, newPassword) => {
		setShowVerify(false);  // cierra el modal de verificación
		setShowForgot(false);  // asegura que el de recuperar esté cerrado
		setEmail(email);       // deja el correo listo
		setPassword('');       // limpia contraseña anterior
	};



	return (
		<>
			<SafeAreaView style={styles.container}>
				{/* top-left NETFOX + back arrow */}
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
						<Text style={styles.title}>Iniciar sesión</Text>

						{error ? <Text style={styles.errorText}>{error}</Text> : null}

						<TextInput
							style={styles.input}
							placeholder="Email o número de teléfono"
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

						<TouchableOpacity
							style={[styles.button, loading && styles.buttonDisabled]}
							onPress={handleSubmit}
							disabled={loading}
						>
							{loading ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.buttonText}>Iniciar sesión</Text>
							)}
						</TouchableOpacity>

							<View style={styles.optionsRow}>
								<TouchableOpacity onPress={() => Alert.alert('Recuérdame', 'Implementa esta función si la necesitas') }>
									<Text style={styles.optionText}>Recuérdame</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => setShowForgot(true)}>
									<Text style={styles.optionText}>¿Has olvidado la contraseña?</Text>
								</TouchableOpacity>
							</View>

						<View style={styles.footer}>
							<Text style={styles.footerText}>¿Primera vez en Netflix?</Text>
							<TouchableOpacity onPress={() => onToggleView && onToggleView()}>
								<Text style={styles.linkText}> Suscríbete ahora</Text>
							</TouchableOpacity>
						</View>

						<Text style={styles.termsText}>
							Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
						</Text>
					</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
			{/* Forgot password modal */}
			<ForgotPassword visible={showForgot} onClose={() => setShowForgot(false)} onSent={handleForgotSent} />
			{/* Verify OTP modal */}
			<VerifyOtp visible={showVerify} onClose={() => setShowVerify(false)} email={otpEmail} serverOtp={devOtp} onReset={handleReset} />
		</>
	);
};

export default Login;