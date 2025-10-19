import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e50914',
    },
    navButtons: {
        flexDirection: 'row',
    },
    navButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 20,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    searchInput: {
        backgroundColor: '#333',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        minWidth: 200,
        fontSize: 16,
    },
    userSection: {
        alignItems: 'flex-end',
    },
    userName: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },
    closeSesionBtn: {
        backgroundColor: '#e50914',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    closeSesionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default styles;