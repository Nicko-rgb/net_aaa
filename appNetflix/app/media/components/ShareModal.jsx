import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import styles from '../styles/browser';

const ShareModal = ({ visible, onClose, video }) => {
    const [copied, setCopied] = useState(false);

    const getShareUrl = () => {
        if (!video?.videoUrl) return '';
        // Convertir la URL de Dropbox a formato de visualización web
        return video.videoUrl.replace('dl=1', 'dl=0');
    };

    const handleCopyLink = async () => {
        try {
            const shareUrl = getShareUrl();
            await Clipboard.setStringAsync(shareUrl);
            setCopied(true);
            
            // Resetear el estado después de 3 segundos
            setTimeout(() => setCopied(false), 3000);
        } catch (error) {
            Alert.alert(
                'Error',
                'No se pudo copiar el enlace',
                [{ text: 'OK' }]
            );
        }
    };

    const handleShare = () => {
        // Aquí se puede implementar funcionalidad adicional de compartir
        // como abrir el selector de apps nativo
        handleCopyLink();
    };

    if (!video) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.shareModalOverlay}>
                <View style={styles.shareModalContainer}>
                    {/* Header del Modal */}
                    <View style={styles.shareModalHeader}>
                        <Text style={styles.shareModalTitle}>Compartir Video</Text>
                        <TouchableOpacity 
                            style={styles.shareModalCloseButton}
                            onPress={onClose}
                        >
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Card de Información del Video */}
                    <View style={styles.shareVideoCard}>
                        <Image 
                            source={{ uri: video.image }} 
                            style={styles.shareVideoThumbnail}
                            resizeMode="cover"
                        />
                        <View style={styles.shareVideoInfo}>
                            <Text style={styles.shareVideoTitle} numberOfLines={2}>
                                {video.title}
                            </Text>
                            <Text style={styles.shareVideoYear}>
                                {video.year} • {video.category}
                            </Text>
                            <Text style={styles.shareVideoDescription} numberOfLines={3}>
                                {video.description}
                            </Text>
                        </View>
                    </View>

                    {/* Enlace para Compartir */}
                    <View style={styles.shareLinkContainer}>
                        <Text style={styles.shareLinkLabel}>Enlace del video:</Text>
                        <View style={styles.shareLinkBox}>
                            <Text style={styles.shareLinkText} numberOfLines={1}>
                                {getShareUrl()}
                            </Text>
                        </View>
                    </View>

                    {/* Botones de Acción */}
                    <View style={styles.shareButtonsContainer}>
                        <TouchableOpacity 
                            style={[styles.shareButton, styles.copyButton]}
                            onPress={handleCopyLink}
                        >
                            <Ionicons 
                                name={copied ? "checkmark" : "copy"} 
                                size={20} 
                                color="#fff" 
                            />
                            <Text style={styles.shareButtonText}>
                                {copied ? 'Copiado' : 'Copiar Enlace'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.shareButton, styles.shareActionButton]}
                            onPress={handleShare}
                        >
                            <Ionicons name="share" size={20} color="#fff" />
                            <Text style={styles.shareButtonText}>Compartir</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Información Adicional */}
                    <Text style={styles.shareModalFooter}>
                        Este enlace abrirá el video en Dropbox para su visualización
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default ShareModal;