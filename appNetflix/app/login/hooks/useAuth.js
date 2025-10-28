import { useState } from 'react';
import apiClient from '../../utils/axiosInstance';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Función para realizar login
    const login = async (email, password) => {
        setLoading(true);
        setError('');
        
        try {
            const response = await apiClient.post('/login', {
                email,
                password
            });

            const data = response.data;
            console.log('🔍 Respuesta del servidor:', data);
            console.log('🔍 Usuario del servidor:', data.user);
            console.log('🔍 Token del servidor:', data.token);
            
            setUser(data.user);
            setIsAuthenticated(true);
            // Aquí podrías guardar el token en AsyncStorage si lo necesitas
            return { success: true, user: data.user, token: data.token };
        } catch (err) {
            let errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
            
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función para realizar registro
    const register = async (name, email, password) => {
        setLoading(true);
        setError('');
        
        try {
            const response = await apiClient.post('/register', {
                name,
                email,
                password
            });

            const data = response.data;
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true, user: data.user, token: data.token };
        } catch (err) {
            let errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
            
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setError('');
    };

    // Función para limpiar errores
    const clearError = () => {
        setError('');
    };

    return {
        // Estados
        loading,
        error,
        user,
        isAuthenticated,
        
        // Funciones
        login,
        register,
        logout,
        clearError,
    };
};