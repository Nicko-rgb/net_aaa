import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    safeAreaContainer: {
        flex: 1,
    },
    sliderWrapper: {
        flex: 1,
    },
    slideContainer: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeStyles;