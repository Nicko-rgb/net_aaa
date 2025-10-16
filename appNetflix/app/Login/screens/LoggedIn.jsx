import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/loggedInStyles';
import { useAuth } from '../../context/AuthContext';

const LoggedIn = ({ onClose }) => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        if (onClose) onClose();
    };

    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={styles.form}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 12 }}>
                    {user ? `Hola, ${user.name || user.email}` : 'Usuario autenticado'}
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoggedIn;
