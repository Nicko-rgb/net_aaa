import React, { useState } from 'react';
import { View, ScrollView, Dimensions, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider1 from './Slider1';
import Slider2 from './Slider2';
import Slider3 from './Slider3';
import Header from '../components/Header';
import SliderIndicators from '../components/SliderIndicators';
import Footer from '../components/Footer';
import Questions from '../components/Questions';
import useSlider from '../hooks/useSlider';
import styles from '../styles/HomeStyles';
import { Modal } from 'react-native';
import Login from '../../Login/screens/login';
import Registro from '../../Login/screens/Registro';
import LoggedIn from '../../Login/screens/LoggedIn';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const [showQuestions, setShowQuestions] = useState(false);

    const {
        currentSlide,
        goToSlide,
        pauseAutoSlide,
        resumeAutoSlide,
        totalSlides
    } = useSlider(3, 4000);

    // Array de imágenes de fondo para cada slider
    const backgroundImages = [
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
        'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ];

    const sliders = [
        <Slider1 key="slider1" />,
        <Slider2 key="slider2" />,
        <Slider3 key="slider3" />
    ];

    const handleScroll = (event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slideIndex !== currentSlide) {
            goToSlide(slideIndex);
        }
    };

    const handlePrivacyPress = () => {
        Alert.alert('Privacidad', 'Información sobre privacidad de Netflix');
    };

    const handleFAQPress = () => {
        setShowQuestions(true);
    };

    const handleCloseQuestions = () => {
        setShowQuestions(false);
    };

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const [showLoggedInModal, setShowLoggedInModal] = useState(false);

    const handleLoginPress = () => {
        setShowLoginModal(true);
    };

    const handleStartPress = () => {
        setShowRegistroModal(true);
    };

    const closeLogin = () => setShowLoginModal(false);
    const closeRegistro = () => setShowRegistroModal(false);

    const openRegistroFromLogin = () => {
        setShowLoginModal(false);
        setShowRegistroModal(true);
    };

    const openLoginFromRegistro = () => {
        setShowRegistroModal(false);
        setShowLoginModal(true);
    };

    const onAuthSuccess = () => {
        // cerrar otros modales y abrir modal de sesión iniciada
        setShowLoginModal(false);
        setShowRegistroModal(false);
        setShowLoggedInModal(true);
    };

    const anyModalOpen = showLoginModal || showRegistroModal || showLoggedInModal;

    return (
        <View style={styles.container}>
            {/* Imagen de fondo dinámica */}
            <Image
                source={{ uri: backgroundImages[currentSlide] }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: width,
                    height: height,
                }}
                resizeMode="cover"
            />

            {/* Overlay para oscurecer la imagen */}
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: width,
                height: height,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }} />

            {/* Hide the main screen behind modals so the modal appears as a full screen experience */}
            {!anyModalOpen && (
                <SafeAreaView style={styles.safeAreaContainer}>
                    <Header
                        onPrivacyPress={handlePrivacyPress}
                        onFAQPress={handleFAQPress}
                        onLoginPress={handleLoginPress}
                    />

                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        onScrollBeginDrag={pauseAutoSlide}
                        onScrollEndDrag={resumeAutoSlide}
                        style={styles.sliderWrapper}
                    >
                        {sliders.map((slider, index) => (
                            <View key={index} style={styles.slideContainer}>
                                {slider}
                            </View>
                        ))}
                    </ScrollView>

                    <SliderIndicators
                        totalSlides={totalSlides}
                        currentSlide={currentSlide}
                        onIndicatorPress={goToSlide}
                    />

                    <Footer onStartPress={handleStartPress} />

                </SafeAreaView>
            )}
            <Questions
                visible={showQuestions}
                onClose={handleCloseQuestions}
            />
            {/* Login modal */}
            <Modal
                visible={showLoginModal}
                animationType="slide"
                onRequestClose={closeLogin}
                presentationStyle="fullScreen"
                transparent={false}
                hardwareAccelerated={true}
            >
                <Login onToggleView={openRegistroFromLogin} onSuccess={onAuthSuccess} onClose={closeLogin} />
            </Modal>

            {/* Registro modal */}
            <Modal
                visible={showRegistroModal}
                animationType="slide"
                onRequestClose={closeRegistro}
                presentationStyle="fullScreen"
                transparent={false}
                hardwareAccelerated={true}
            >
                <Registro onToggleView={openLoginFromRegistro} onSuccess={onAuthSuccess} onClose={closeRegistro} />
            </Modal>

            {/* Logged in modal */}
            <Modal
                visible={showLoggedInModal}
                animationType="slide"
                onRequestClose={() => setShowLoggedInModal(false)}
                presentationStyle="fullScreen"
                transparent={false}
                hardwareAccelerated={true}
            >
                <LoggedIn onClose={() => setShowLoggedInModal(false)} />
            </Modal>
        </View>
    );
};

export default Home;

