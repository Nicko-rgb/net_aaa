import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SliderStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 100,
        zIndex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 38,
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 24,
    },
    description: {
        fontSize: 16,
        color: '#cccccc',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    ctaButton: {
        backgroundColor: '#e50914',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    ctaButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SliderStyles;