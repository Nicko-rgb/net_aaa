import { StyleSheet } from 'react-native';

const FooterStyles = StyleSheet.create({
    footerContainer: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingBottom: 10, // Reducido ya que SafeAreaView maneja el safe area automáticamente
        zIndex: 5,
    },
    startButton: {
        backgroundColor: '#e50914',
        paddingVertical: 15,
        paddingHorizontal: 60,
        elevation: 5,
        shadowColor: '#000',
        width: '100%',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        marginBottom: 15,
    },
    startButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 1,
    },
    footerText: {
        color: '#cccccc',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default FooterStyles;