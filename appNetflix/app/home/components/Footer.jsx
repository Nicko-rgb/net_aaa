import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/FooterStyles';

const Footer = ({ onStartPress }) => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity
                style={styles.startButton}
                onPress={onStartPress}
            >
                <Text style={styles.startButtonText}>Comienza ya</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Únete a millones de usuarios que ya disfrutan de Netflix
            </Text>
        </View>
    );
};

export default Footer;