import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    form: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        padding: 20,
        borderRadius: 8,
        width: '100%',
        maxWidth: 500,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#e50914',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
});

export default styles;
