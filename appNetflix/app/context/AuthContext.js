import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext debe ser usado dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar datos de sesión al iniciar la app
    useEffect(() => {
        loadStoredAuth();
    }, []);

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
            console.error('Error cargando datos de autenticación:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData, authToken) => {
        try {
            // Guardar en AsyncStorage
            await AsyncStorage.setItem('authToken', authToken);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            
            // Actualizar estado
            setToken(authToken);
            setUser(userData);
            setIsAuthenticated(true);
            
            return { success: true };
        } catch (error) {
            console.error('Error guardando datos de sesión:', error);
            return { success: false, error: 'Error guardando sesión' };
        }
    };

    const logout = async () => {
        try {
            // Limpiar AsyncStorage
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userData');
            
            // Limpiar estado
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            
            return { success: true };
        } catch (error) {
            console.error('Error cerrando sesión:', error);
            return { success: false, error: 'Error cerrando sesión' };
        }
    };

    const updateUser = async (newUserData) => {
        try {
            const updatedUser = { ...user, ...newUserData };
            await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            console.error('Error actualizando usuario:', error);
            return { success: false, error: 'Error actualizando usuario' };
        }
    };

    const value = {
        isAuthenticated,
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};