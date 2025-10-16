import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles/HeaderStyles';
import indexImg from '../../../assets/img/indexImg';


const Header = ({ onPrivacyPress, onFAQPress, onLoginPress }) => {

    const { logoNet } = indexImg;

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image source={logoNet} style={styles.logoImage} />
            </View>

            <ScrollView horizontal contentContainerStyle={styles.navigationContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={onPrivacyPress}
                >
                    <Text style={styles.navButtonText} numberOfLines={1} ellipsizeMode="tail">Privacidad</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navButton}
                    onPress={onFAQPress}
                >
                    <Text style={styles.navButtonText} numberOfLines={1} ellipsizeMode="tail">Preguntas frecuentes</Text>
                </TouchableOpacity>
            </ScrollView>
            
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