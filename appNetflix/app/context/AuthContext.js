import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import apiClient from '../utils/axiosInstance';

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext debe ser usado dentro de AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // 🔹 Cargar sesión al iniciar
    useEffect(() => {
        const loadStoredAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                const storedUser = await AsyncStorage.getItem('userData');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Error cargando sesión
            } finally {
                setLoading(false);
            }
        };
        loadStoredAuth();
    }, []);

    // 🔹 Login
    const login = async (email, password) => {
        // Prevenir múltiples llamadas simultáneas
        if (isProcessing) {
            return { success: false, error: 'Login en proceso...' };
        }

        try {
            setIsProcessing(true);
            
            // Validación previa antes de enviar
            if (!email || !password) {
                return { success: false, error: 'Email y contraseña son requeridos' };
            }
            
            const response = await apiClient.post('/login', { 
                email: email?.trim() || '', 
                password: password?.trim() || '' 
            });
            
            const { token, user, message } = response.data;

            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user));

            setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            return { success: true, message, user, token };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al iniciar sesión. Intenta nuevamente.';
            return { success: false, error: errorMessage };
        } finally {
            setIsProcessing(false);
        }
    };

    // 🔹 Registro
    const register = async (name, email, password) => {
        try {
            const response = await apiClient.post('/register', { name, email, password });
            const { token, user, message } = response.data;

            if (!token || !user) {
                throw new Error('Respuesta inválida del servidor');
            }

            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user));

            setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            return { success: true, message, user, token };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error al registrar usuario. Intenta nuevamente.';
            return { success: false, error: errorMessage };
        }
    };

    // 🔹 Logout
    const logout = async () => {
        try {
            await AsyncStorage.multiRemove(['authToken', 'userData']);
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Error cerrando sesión' };
        }
    };

    // 🔹 Actualizar datos del usuario
    const updateUser = async (newUserData) => {
        try {
            const updatedUser = { ...user, ...newUserData };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Error actualizando usuario' };
        }
    };

    const value = {
        isAuthenticated,
        user,
        token,
        loading,
        isProcessing,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
