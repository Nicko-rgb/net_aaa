import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 10,
    },
    backIconButton: {
        padding: 8,
        marginRight: 12,
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    scrollContainer: {
        flex: 1,
    },
    videoImageContainer: {
        position: 'relative',
        width: width,
        height: height * 0.3,
        backgroundColor: '#000',
    },
    videoImage: {
        width: '100%',
        height: '100%',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    playButtonOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    playButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    videoInfo: {
        padding: 20,
    },
    videoTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    videoMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    videoYear: {
        color: '#999',
        fontSize: 14,
    },
    videoDot: {
        color: '#999',
        fontSize: 14,
        marginHorizontal: 8,
    },
    videoCategory: {
        color: '#999',
        fontSize: 14,
    },
    videoDescription: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 6,
        gap: 8,
    },
    primaryButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 6,
        gap: 8,
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    additionalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    actionIcon: {
        alignItems: 'center',
        gap: 8,
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#e50914',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Estilos para modo fullscreen
    fullscreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        zIndex: 1000,
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
    },
    fullscreenVideoPlayer: {
        flex: 1,
        backgroundColor: '#000',
        marginTop: 20, // Espacio para los controles superiores
        marginBottom: 20, // Espacio para los controles inferiores
    },
})