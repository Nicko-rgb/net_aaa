import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderStyles';

const Slider1 = () => {
    return (
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Películas ilimitadas, series y más</Text>
            <Text style={styles.subtitle}>
                Disfruta donde quieras. Cancela cuando quieras.
            </Text>
            <Text style={styles.description}>
                ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.
            </Text>

            <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Empezar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Slider1;