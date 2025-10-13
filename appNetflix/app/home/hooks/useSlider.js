import { useState, useEffect, useCallback } from 'react';

const useSlider = (totalSlides = 3, autoSlideInterval = 5000) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    // Función para ir al siguiente slide
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    // Función para ir al slide anterior
    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // Función para ir a un slide específico
    const goToSlide = useCallback((slideIndex) => {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            setCurrentSlide(slideIndex);
        }
    }, [totalSlides]);

    // Función para pausar el auto-slide
    const pauseAutoSlide = useCallback(() => {
        setIsAutoSliding(false);
    }, []);

    // Función para reanudar el auto-slide
    const resumeAutoSlide = useCallback(() => {
        setIsAutoSliding(true);
    }, []);

    return {
        currentSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        pauseAutoSlide,
        resumeAutoSlide,
        isAutoSliding,
        totalSlides
    };
};

export default useSlider;