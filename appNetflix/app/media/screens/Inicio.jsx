import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/browser.js';
import CardVideo from '../components/CardVideo.jsx';

const { width, height } = Dimensions.get('window');

const Inicio = ({ categories, videos, bannerVideos, activeCategory, onCategoryChange }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigation = useNavigation();

    // Auto-slide functionality
    useEffect(() => {
        if (bannerVideos && bannerVideos.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % bannerVideos.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [bannerVideos]);

    const handleVideoPress = (video) => {
        navigation.navigate('Video', { videoData: video });
    };

    const handleCategoryPress = (category) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    return (
        <View style={styles.views}>
            {/* Categories */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsContainer}
            >
                {categories.map((tag, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tagButton,
                            activeCategory === tag && styles.tagButtonActive
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handleCategoryPress(tag)}
                    >
                        <Text style={[
                            styles.tagText,
                            activeCategory === tag && styles.tagTextActive
                        ]}>
                            {tag}
                        </Text>
                        {activeCategory === tag && (
                            <Ionicons 
                                name="checkmark" 
                                size={16} 
                                color="#fff" 
                                style={styles.checkIcon}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView>

                {/* Banner Section */}
                {bannerVideos && bannerVideos.length > 0 && (
                    <View style={styles.heroBanner}>
                        <Image
                            source={{ uri: bannerVideos[currentSlide]?.image || 'https://via.placeholder.com/1920x1080' }}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />

                        <View style={styles.bannerContent}>
                            <Text style={styles.bannerTitle} numberOfLines={2}>
                                {bannerVideos[currentSlide]?.title}
                            </Text>
                            <Text style={styles.bannerDescription} numberOfLines={3}>
                                {bannerVideos[currentSlide]?.description}
                            </Text>

                            <View>
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => handleVideoPress(bannerVideos[currentSlide])}
                                >
                                    <Ionicons name="play" size={20} color="#fff" />
                                    <Text style={styles.playButtonText}>Reproducir</Text>
                                </TouchableOpacity>

                                {/* Slide indicators */}
                                <View style={styles.slideIndicators}>
                                    {bannerVideos.map((_, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.indicator,
                                                index === currentSlide && styles.indicatorActive
                                            ]}
                                            onPress={() => setCurrentSlide(index)}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {/* Videos Grid */}
                
                <FlatList
                    data={videos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardVideo video={item} />}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

export default Inicio;
