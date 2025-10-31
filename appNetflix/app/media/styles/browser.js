import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    browser: {
        flex: 1,
        backgroundColor: '#141414',
    },
    views: {
        paddingHorizontal: 10,
        flex: 1,
    },
    container: {
        paddingHorizontal: 10,
        marginTop: 10,
    },

    // categorias de videos
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 15,
        marginBottom: 10
    },
    tagButton: {
        paddingHorizontal: 15,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: '#373737',
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
    },
    tagButtonActive: {
        backgroundColor: '#bc171fff',
    },
    tagTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    checkIcon: {
        marginLeft: 3,
    },

    // Vista de inicio 
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 10,
    },
    gridContainer: {
        gap: 10,
    },

    // Banner styles
    heroBanner: {
        marginTop: 10,
        height: 400,
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bannerContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
    },
    bannerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    bannerDescription: {
        fontSize: 14,
        color: 'white',
        lineHeight: 20,
        marginBottom: 15,
    },
    playButton: {
        backgroundColor: '#c20c15ff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 5,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    playButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    slideIndicators: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        gap: 8,
        zIndex: 2,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorActive: {
        backgroundColor: '#e50914',
    },

    // ESTILOS DEL MODAL DE COMPARTIR
    shareModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    shareModalContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        // maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    shareModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    shareModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    shareModalCloseButton: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    shareVideoCard: {
        flexDirection: 'row',
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    shareVideoThumbnail: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 15,
    },
    shareVideoInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    shareVideoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    shareVideoYear: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    shareVideoDescription: {
        fontSize: 12,
        color: '#ccc',
        lineHeight: 16,
    },
    shareLinkContainer: {
        marginBottom: 20,
    },
    shareLinkLabel: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 8,
        fontWeight: '500',
    },
    shareLinkBox: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#444',
    },
    shareLinkText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'monospace',
    },
    shareButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
    },
    shareButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    copyButton: {
        backgroundColor: '#4a4a4a',
    },
    shareActionButton: {
        backgroundColor: '#bc171fff',
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    shareModalFooter: {
        fontSize: 11,
        color: '#999',
        textAlign: 'center',
        fontStyle: 'italic',
    },

    // STYLOS COMPARTIDOS
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

});

export default styles;
