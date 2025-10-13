import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderStyles';

const Slider2 = () => {
    return (
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Descarga tus series para verlas offline</Text>
            <Text style={styles.subtitle}>
                Guarda fácilmente tus favoritos y siempre tendrás algo para ver.
            </Text>
            <Text style={styles.description}>
                Solo en los planes sin anuncios. Disponible en dispositivos móviles y tablets.
            </Text>

            <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Descargar ahora</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Slider2;