import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../styles/header';

const Header = ({ searchQuery, setSearchQuery, handleScreenChange }) => {
    const { user, logout } = useAuthContext();

    return (
        <View style={styles.header}>
            <Text style={styles.logo}>NETFLIX</Text>
            
            <View style={styles.navButtons}>
                <TouchableOpacity 
                    style={styles.navButton} 
                    onPress={() => handleScreenChange('inicio')}
                >
                    <Text style={styles.navButtonText}>Inicio</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navButton} 
                    onPress={() => handleScreenChange('favoritos')}
                >
                    <Text style={styles.navButtonText}>Favoritos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.navButton} 
                    onPress={() => handleScreenChange('historial')}
                >
                    <Text style={styles.navButtonText}>Historial</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <View style={styles.userSection}>
                <Text style={styles.userName}>{user?.email || 'Usuario'}</Text>
                <TouchableOpacity style={styles.closeSesionBtn} onPress={logout}>
                    <Text style={styles.closeSesionText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
