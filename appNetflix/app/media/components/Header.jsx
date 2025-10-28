import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../styles/header';
import { Ionicons } from '@expo/vector-icons';
import logoNet from '../../../assets/img/Logo.png';

const Header = ({ searchQuery, setSearchQuery, handleScreenChange, onRefresh, onToggleMenu }) => {

    const [searchVisible, setSearchVisible] = useState(false);
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        if (!searchVisible) {
            setSearchQuery('');
        }
    }

    const handleRefresh = () => {
        onRefresh();
        handleScreenChange('inicio')
    }

    return (
        <View style={styles.header}>
            {/* ====== IZQUIERDA: LOGO ====== */}
            <TouchableOpacity style={styles.leftSection} onPress={handleRefresh}>
                <Image source={logoNet} style={styles.logo} />
            </TouchableOpacity>

            {/* ====== BUSCADOR ====== */}
            {searchVisible && (
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
            )}

            {/* ====== DERECHA: ICONOS ====== */}
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
                    <Ionicons name="search" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onToggleMenu} style={styles.iconButton}>
                    <Ionicons name="menu" size={26} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
