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
        width: 280,
        backgroundColor: '#141414',
        height: '100%',
        paddingTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 20,
    },
    userProfileSection: {
        marginTop: -20,
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginBottom: 20,
    },
    userIconContainer: {
        marginBottom: 15,
    },
    userName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        textAlign: 'center',
    },
    userEmail: {
        color: '#999',
        fontSize: 14,
        textAlign: 'center',
    },
    navigationSection: {
        flex: 1,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 5,
    },
    menuIcon: {
        marginRight: 15,
        width: 20,
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    logoutSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 20,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#393939ff',
    },
    logoutText: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
