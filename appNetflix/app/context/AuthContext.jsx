import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Determinar la URL base del API según la plataforma
    // - Android emulator (AVD) usa 10.0.2.2 para acceder al host
    // - iOS simulator y web pueden usar localhost
    // - En un dispositivo físico debes usar la IP de tu máquina (ej: http://192.168.1.100:7001)
    // Determinar host base:
    // - Si estamos en Android emulator (AVD) usar 10.0.2.2
    // - Si estamos en Expo Go (dispositivo físico), intentar obtener la IP desde Constants.manifest.debuggerHost
    // - Por defecto usar localhost (iOS simulator / web)
    let DEFAULT_HOST = Platform.OS === 'android' ? 'http://10.0.2.2:7001' : 'http://localhost:7001';

    try {
        // expo-constants expone debuggerHost en el manifiesto cuando se ejecuta en Expo
        const debuggerHost = Constants.manifest && (Constants.manifest.debuggerHost || Constants.manifest.packagerOpts?.devServerHost);
        if (debuggerHost) {
            const hostIp = debuggerHost.split(':')[0];
            // hostIp puede ser '192.168.1.10' o similar
            DEFAULT_HOST = `http://${hostIp}:7001`;
        } else {
            // Si no hay debuggerHost (caso común en Expo Go físico), usar la IP local conocida
            // Ajusta esta IP si tu máquina tiene otra en la red
            DEFAULT_HOST = 'http://192.168.18.22:7001';
        }
    } catch (e) {
        // En caso de error, usar la IP local proporcionada
        DEFAULT_HOST = 'http://192.168.18.22:7001';
    }

    const API_BASE = DEFAULT_HOST;

    // Crear una instancia de axios con baseURL
    const api = axios.create({ baseURL: API_BASE });

    useEffect(() => {
        const configure = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                delete api.defaults.headers.common['Authorization'];
            }
            setLoading(false);
        };
        configure();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/login', { email, password });
            if (response.data.token) {
                const { token: newToken, user: userData } = response.data;
                await AsyncStorage.setItem('token', newToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                setUser(userData);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            console.error('Login error', err?.response?.data || err.message);
            return { success: false, message: err.response?.data?.message || 'Connection error' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/api/register', { name, email, password });
            if (response.data.token) {
                const { token: newToken, user: userData } = response.data;
                await AsyncStorage.setItem('token', newToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                setUser(userData);
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            console.error('Register error', err?.response?.data || err.message);
            return { success: false, message: err.response?.data?.message || 'Connection error' };
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
