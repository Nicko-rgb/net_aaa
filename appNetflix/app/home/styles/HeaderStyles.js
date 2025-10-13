import { StyleSheet } from 'react-native';

const HeaderStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        // paddingTop: 10,
        paddingBottom: 20,
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    logoImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    navigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        flex: 1
    },
    navButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    navButtonText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#e50914',
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    loginButtonText: {
        fontWeight: 'bold',
    },
});

export default HeaderStyles;