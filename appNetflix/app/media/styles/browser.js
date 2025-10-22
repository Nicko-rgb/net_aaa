import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // categorias de videos
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        gap: 10,
        marginTop: 15,
        marginBottom: 10
    },
    tagButton: {
        paddingHorizontal: 15,
        // paddingVertical: 10,
        height: 35,
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: '#373737',
    },
    tagText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
    },
    tagButtonActive: {
        backgroundColor: '#e50914',
    },
    tagTextActive: {
        color: '#fff',
    },

    // Vista de inicio 
    title: {
        color: 'white',
    },

    gridContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between', // distribuye uniformemente las cards
        marginBottom: 15,
    },
});

export default styles;
