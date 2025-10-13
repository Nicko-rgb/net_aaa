import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderStyles';

const Slider3 = () => {
    return (
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Disfruta en tu TV</Text>
            <Text style={styles.subtitle}>
                Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.
            </Text>
            <Text style={styles.description}>
                Conecta tu dispositivo favorito y disfruta de Netflix en la pantalla grande.
            </Text>

            <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Ver en TV</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Slider3;