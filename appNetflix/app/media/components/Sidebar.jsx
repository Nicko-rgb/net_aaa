import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../styles/header';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ handleScreenChange, visible, onClose }) => {
    const { user, logout } = useAuthContext();
    const navigation = useNavigation();

    const handleLogout = () => {
        logout();
        navigation.navigate('Home');
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                onPress={onClose}
                activeOpacity={1}
            >
                <View style={styles.sideMenu}>
                    <Text style={styles.userLabel}>Mi Cuenta</Text>
                    {/* User Profile Section */}
                    <View style={styles.userProfileSection}>
                        <View style={styles.userIconContainer}>
                            <Ionicons name="person-circle" size={60} color="#ffffffff" />
                        </View>
                        <Text style={styles.userName}>{user?.name || 'usuario@netflix.com'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'usuario@netflix.com'}</Text>
                    </View>

                    {/* Navigation Menu */}
                    <View style={styles.navigationSection}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => { handleScreenChange('inicio'); onClose(); }}
                        >
                            <Ionicons name="home" size={20} color="#fff" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Inicio</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => { handleScreenChange('favoritos'); onClose(); }}
                        >
                            <Ionicons name="heart" size={20} color="#fff" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Favoritos</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => { handleScreenChange('historial'); onClose(); }}
                        >
                            <Ionicons name="time" size={20} color="#fff" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Historial</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Logout Section */}
                    <View style={styles.logoutSection}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => handleLogout()}
                        >
                            <Ionicons name="log-out" size={20} color="#ffffffff" style={styles.menuIcon} />
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default Sidebar;
