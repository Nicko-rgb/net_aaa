import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    browser: {
        flex: 1,
        backgroundColor: '#141414',
    },
    views: {
        paddingHorizontal: 10
    },

    // categorias de videos
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        marginBottom: 10
    },
    tagButton: {
        paddingHorizontal: 15,
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
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 10,
    },
    gridContainer: {
        gap: 10,
    },

});

export default styles;
