import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: '#666666',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header: {
        alignItems: 'center',
    },
    logo: {
        fontSize: 32,
        fontWeight: '900',
        color: '#e50914',
        letterSpacing: 2,
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 10,
        maxWidth: 450,
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 30,
        textAlign: 'left',
    },
    inputContainer: {
        marginBottom: 16,
        position: 'relative',
    },
    input: {
        backgroundColor: '#333333',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 6,
        fontSize: 16,
        color: '#ffffff',
        height: 56,
        borderWidth: 0,
    },
    inputFocused: {
        backgroundColor: '#454545',
    },
    inputError: {
        backgroundColor: '#4a2c2c',
        borderWidth: 1,
        borderColor: '#e87c03',
    },
    inputLabel: {
        position: 'absolute',
        left: 20,
        top: 18,
        fontSize: 16,
        color: '#8c8c8c',
        pointerEvents: 'none',
    },
    inputLabelFocused: {
        top: 8,
        fontSize: 11,
        color: '#8c8c8c',
    },
    errorText: {
        color: '#e87c03',
        fontSize: 13,
        marginTop: 4,
        marginLeft: 4,
    },
    generalError: {
        backgroundColor: '#e87c03',
        color: '#ffffff',
        padding: 12,
        borderRadius: 4,
        marginBottom: 16,
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#e50914',
        borderRadius: 4,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#722f37',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 16,
        height: 16,
        backgroundColor: '#333333',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#737373',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#e50914',
        borderColor: '#e50914',
    },
    checkboxText: {
        color: '#b3b3b3',
        fontSize: 13,
    },
    helpLink: {
        color: '#b3b3b3',
        fontSize: 13,
        textDecorationLine: 'underline',
    },
    footer: {
        marginTop: 24,
    },
    switchText: {
        color: '#737373',
        fontSize: 16,
        marginBottom: 16,
    },
    switchLink: {
        color: '#ffffff',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    termsText: {
        color: '#8c8c8c',
        fontSize: 13,
        lineHeight: 18,
        marginTop: 16,
    },
    termsLink: {
        color: '#0071eb',
        textDecorationLine: 'underline',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    toggleButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    toggleButtonActive: {
        borderBottomColor: '#e50914',
    },
    toggleButtonText: {
        color: '#8c8c8c',
        fontSize: 16,
        fontWeight: '500',
    },
    toggleButtonTextActive: {
        color: '#ffffff',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
