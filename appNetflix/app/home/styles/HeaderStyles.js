import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const isSmall = height <= 700;
const isVerySmall = height <= 600;

const headerPaddingVertical = isVerySmall ? 3 : isSmall ? 5 : 8;
const logoSize = isVerySmall ? 26 : isSmall ? 30 : 36; // keep logo as requested
// Slightly smaller nav font sizes
const navFontSize = isVerySmall ? 9 : isSmall ? 10 : 12;
const headerMarginBottom = isVerySmall ? 4 : isSmall ? 6 : 8;

const HeaderStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingTop: headerPaddingVertical,
        paddingBottom: headerPaddingVertical,
        zIndex: 10,
        backgroundColor: 'transparent',
        marginBottom: headerMarginBottom,
    },
    logoImage: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain',
    },
    navigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flex: 1,
        paddingHorizontal: 6,
        flexShrink: 1,
    },
    navButton: {
        paddingVertical: isVerySmall ? 3 : 5,
        paddingHorizontal: isVerySmall ? 5 : 6,
        borderRadius: 4,
    },
    navButtonText: {
        color: '#ffffff',
        fontSize: navFontSize,
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#e50914',
        paddingVertical: isVerySmall ? 6 : 8,
        paddingHorizontal: isVerySmall ? 8 : 10,
        borderRadius: 6,
    },
    loginButtonText: {
        fontWeight: '700',
        fontSize: navFontSize,
    },
});

export default HeaderStyles;