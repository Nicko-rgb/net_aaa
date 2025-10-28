import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 15,
        paddingLeft: 10,
    },
    logo: {
        width: 50,
        height: 35,
        objectFit: 'contain',
    },
    searchInput: {
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flex: 1
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    sideMenu: {
        width: 250,
        backgroundColor: '#111',
        paddingVertical: 20,
        paddingHorizontal: 15,
        height: '100%',
    },
    userName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20,
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 20,
        borderTopColor: '#333',
        borderTopWidth: 1,
    },
});
