import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderIndicatorStyles';

const SliderIndicators = ({ totalSlides, currentSlide, onIndicatorPress }) => {
    return (
        <View style={styles.indicatorsContainer}>
            {Array.from({ length: totalSlides }, (_, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.indicator,
                        currentSlide === index && styles.activeIndicator
                    ]}
                    onPress={() => onIndicatorPress(index)}
                />
            ))}
        </View>
    );
};

export default SliderIndicators;