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

	return (
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

						<TouchableOpacity onPress={() => Alert.alert('Ayuda', '¿Necesitas ayuda?')}>
							<Text style={styles.optionText}>¿Necesitas ayuda?</Text>
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
	);
};

export default Login;
