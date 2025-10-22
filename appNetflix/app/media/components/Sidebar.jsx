import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../styles/header';
import { Ionicons } from '@expo/vector-icons';
import logoNet from '../../../assets/img/Logo.png';
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
        < Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                onPress={onClose}
                activeOpacity={1}
            >
                <View style={styles.sideMenu}>
                    <Text style={styles.userName}>{user?.email || 'Usuario'}</Text>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { handleScreenChange('inicio'); onClose(); }}
                    >
                        <Text style={styles.menuText}>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { handleScreenChange('favoritos'); onClose(); }}
                    >
                        <Text style={styles.menuText}>Favoritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { handleScreenChange('historial'); onClose(); }}
                    >
                        <Text style={styles.menuText}>Historial</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, styles.logoutButton]}
                        onPress={() => handleLogout()}
                    >
                        <Text style={styles.menuText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal >
    );
};

export default Sidebar;
