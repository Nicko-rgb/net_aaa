import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Simple responsive adjustments based on screen height/width
const isSmallHeight = height <= 700;
const isVerySmallHeight = height <= 600;

const titleFontSize = isVerySmallHeight ? 24 : isSmallHeight ? 28 : 32;
const subtitleFontSize = isVerySmallHeight ? 14 : isSmallHeight ? 16 : 18;
const descriptionFontSize = isVerySmallHeight ? 12 : isSmallHeight ? 14 : 16;
const titleLineHeight = Math.round(titleFontSize * 1.15);
const subtitleLineHeight = Math.round(subtitleFontSize * 1.25);
const descriptionLineHeight = Math.round(descriptionFontSize * 1.35);
const verticalPadding = isVerySmallHeight ? 40 : isSmallHeight ? 60 : 100;
// Estimated header height to offset content so it doesn't overlap on small screens
const headerEstimatedHeight = isVerySmallHeight ? 54 : isSmallHeight ? 66 : 80;

const SliderStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Math.max(20, Math.round(width * 0.06)),
        paddingTop: headerEstimatedHeight + 12,
        paddingVertical: verticalPadding,
        zIndex: 1,
    },
    title: {
        fontSize: titleFontSize,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: isSmallHeight ? 14 : 20,
        lineHeight: titleLineHeight,
    },
    subtitle: {
        fontSize: subtitleFontSize,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: isSmallHeight ? 10 : 15,
        lineHeight: subtitleLineHeight,
    },
    description: {
        fontSize: descriptionFontSize,
        color: '#cccccc',
        textAlign: 'center',
        marginBottom: isSmallHeight ? 24 : 40,
        lineHeight: descriptionLineHeight,
        paddingHorizontal: isVerySmallHeight ? 6 : 10,
    },
    ctaButton: {
        backgroundColor: '#e50914',
        paddingVertical: isVerySmallHeight ? 10 : isSmallHeight ? 12 : 15,
        paddingHorizontal: isVerySmallHeight ? 30 : isSmallHeight ? 36 : 40,
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
        fontSize: isVerySmallHeight ? 16 : isSmallHeight ? 17 : 18,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default SliderStyles;