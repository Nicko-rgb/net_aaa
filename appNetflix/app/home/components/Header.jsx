import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/HeaderStyles';
import indexImg from '../../../assets/img/indexImg';


const Header = ({ onPrivacyPress, onFAQPress, onLoginPress }) => {

    const { logoNet } = indexImg;

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image source={logoNet} style={styles.logoImage} />
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={onPrivacyPress}
                >
                    <Text style={styles.navButtonText}>Privacidad</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navButton}
                    onPress={onFAQPress}
                >
                    <Text style={styles.navButtonText}>Preguntas frecuentes</Text>
                </TouchableOpacity>

            </View>
            
            <TouchableOpacity
                style={[styles.navButton, styles.loginButton]}
                onPress={onLoginPress}
            >
                <Text style={[styles.navButtonText, styles.loginButtonText]}>
                    Iniciar sesión
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header;