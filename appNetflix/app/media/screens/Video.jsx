import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Video as VideoPlayer } from 'expo-av';
import styles from '../styles/video';
import useBrowser from '../hooks/useBrowser';
import ShareModal from '../components/ShareModal';

const Video = () => {
    const navigation = useNavigation();
    const { toggleFavorite, addToHistory, isVideoInFavorites, handleDownload, getDirectVideoUrl } = useBrowser();
    const route = useRoute();
    const { videoData } = route.params || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [shareModalVisible, setShareModalVisible] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handlePlay = (video) => {
        setIsPlaying(true);
        addToHistory(video);
    };

    const handleShare = () => {
        setShareModalVisible(true);
    };

    const handleCloseShareModal = () => {
        setShareModalVisible(false);
    };

    if (!videoData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>No se encontraron datos del video</Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Text style={styles.backButtonText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header con botón de retroceso */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIconButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    {videoData.title}
                </Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Imagen principal del video o reproductor */}
                <View style={styles.videoImageContainer}>
                    {!isPlaying ? (
                        <>
                            <Image 
                                source={{ uri: videoData.image }} 
                                style={styles.videoImage}
                                resizeMode="cover"
                            />
                            <View style={styles.playButtonOverlay}>
                                <TouchableOpacity style={styles.playButton} onPress={() => handlePlay(videoData)}>
                                    <Ionicons name="play" size={40} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <VideoPlayer
                            source={{ uri: getDirectVideoUrl(videoData.videoUrl) }}
                            style={styles.videoPlayer}
                            useNativeControls
                            resizeMode="contain"
                            shouldPlay
                            onPlaybackStatusUpdate={(status) => {
                                if (status.didJustFinish) {
                                    setIsPlaying(false);
                                }
                            }}
                        />
                    )}
                </View>

                {/* Información del video */}
                <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle}>{videoData.title}</Text>
                    
                    <View style={styles.videoMeta}>
                        <Text style={styles.videoYear}>{videoData.year}</Text>
                        <Text style={styles.videoDot}>•</Text>
                        <Text style={styles.videoCategory}>{videoData.category}</Text>
                    </View>

                    <Text style={styles.videoDescription}>
                        {videoData.description || 'No hay descripción disponible para este video.'}
                    </Text>

                    {/* Botones de acción */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.primaryButton} onPress={() => handlePlay(videoData)}>
                            <Ionicons name="play" size={20} color="#000" />
                            <Text style={styles.primaryButtonText}>Reproducir</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.secondaryButton} onPress={() => handleDownload(videoData)}>
                            <Ionicons name="download-outline" size={20} color="#fff" />
                            <Text style={styles.secondaryButtonText}>Descargar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.additionalActions}>
                        <TouchableOpacity onPress={() => toggleFavorite(videoData)} style={styles.actionIcon}>
                            <Ionicons 
                                name={isVideoInFavorites(videoData.id) ? "heart" : "heart-outline"} 
                                size={24} 
                                color={isVideoInFavorites(videoData.id) ? "#e50914" : "#fff"} 
                            />
                            <Text style={styles.actionText}>
                                {isVideoInFavorites(videoData.id) ? "En favoritos" : "Me gusta"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionIcon}>
                            <Ionicons name="time-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>Ver más tarde</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.actionIcon} onPress={handleShare}>
                            <Ionicons name="share-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>Compartir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Modal de Compartir */}
            <ShareModal 
                visible={shareModalVisible}
                onClose={handleCloseShareModal}
                video={videoData}
            />
        </SafeAreaView>
    );
};

export default Video;
