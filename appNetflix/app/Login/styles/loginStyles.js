import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoText: {
        color: '#e50914',
        fontSize: 32,
        fontWeight: '700',
    },
    form: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        padding: 20,
        borderRadius: 8,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1,
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#e50914',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    optionText: {
        color: '#ddd',
        fontSize: 13,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
        alignItems: 'center',
    },
    footerText: {
        color: '#ddd',
    },
    linkText: {
        color: '#fff',
        fontWeight: '700',
    },
    termsText: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 14,
        textAlign: 'center',
    },
    errorText: {
        color: '#ff6b6b',
        textAlign: 'center',
        marginBottom: 8,
    }
    ,
    topHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 50,
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },
    backIcon: {
        color: '#fff',
        fontSize: 34,
        fontWeight: '800',
    },
    topLogoImage: {
        width: 36,
        height: 36,
        resizeMode: 'contain'
    }
});

export default styles;
