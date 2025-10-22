import { StyleSheet } from 'react-native';

const SliderIndicatorStyles = StyleSheet.create({
    indicatorsContainer: {
        position: 'absolute',
        bottom: 140,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        gap: 12,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    activeIndicator: {
        backgroundColor: '#e50914',
        borderColor: '#e50914',
        width: 12,
        height: 12,
    },
});

export default SliderIndicatorStyles;