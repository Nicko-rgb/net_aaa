import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';
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
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
    const videoRef = useRef(null);

    // Crear el reproductor de video
    const player = useVideoPlayer(videoData ? getDirectVideoUrl(videoData.videoUrl) : '', (player) => {
        player.loop = false;
        player.muted = false;
    });

    // Manejar cambios de orientación y dimensiones de pantalla
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    // Configurar orientación inicial
    useEffect(() => {
        const setupOrientation = async () => {
            await ScreenOrientation.unlockAsync();
        };
        setupOrientation();

        // Restaurar orientación al salir del componente
        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handlePlay = (video) => {
        setIsPlaying(true);
        addToHistory(video);
        player.play();
    };

    const handleFullscreenUpdate = async (isInFullscreen) => {
        console.log('Fullscreen update:', isInFullscreen);
        setIsFullscreen(isInFullscreen);
        
        // Agregar un pequeño delay para evitar conflictos de orientación
        setTimeout(async () => {
            try {
                if (isInFullscreen) {
                    await ScreenOrientation.unlockAsync();
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                } else {
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                }
            } catch (error) {
                console.log('Error changing orientation:', error);
            }
        }, 100);
    };

    // Escuchar eventos del reproductor
    useEffect(() => {
        const subscription = player.addListener('playbackStatusUpdate', (status) => {
            if (status.isLoaded && status.didJustFinish) {
                setIsPlaying(false);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [player]);

    const handleShare = () => {
        setShareModalVisible(true);
    };

    const handleOrientationToggle = async () => {
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        if (currentOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
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
        <SafeAreaView style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
            {/* Header con botón de retroceso - ocultar en fullscreen */}
            {!isFullscreen && (
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backIconButton} onPress={handleGoBack}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {videoData.title}
                    </Text>
                    <TouchableOpacity style={styles.backIconButton} onPress={handleOrientationToggle}>
                        <Ionicons name="phone-portrait-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Imagen principal del video o reproductor */}
                <View style={[
                    styles.videoImageContainer, 
                    isFullscreen && { 
                        height: screenDimensions.height, 
                        width: screenDimensions.width 
                    }
                ]}>
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
                        <VideoView
                            ref={videoRef}
                            player={player}
                            style={[
                                styles.videoPlayer,
                                isFullscreen && styles.fullscreenVideoPlayer
                            ]}
                            allowsFullscreen
                            allowsPictureInPicture
                            nativeControls
                            contentFit="contain"
                            onFullscreenEnter={() => {
                                console.log('Entering fullscreen');
                                handleFullscreenUpdate(true);
                            }}
                            onFullscreenExit={() => {
                                console.log('Exiting fullscreen');
                                handleFullscreenUpdate(false);
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
