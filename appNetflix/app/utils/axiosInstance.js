import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token automáticamente a todas las requests
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error obteniendo token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores globalmente
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // Si el token ha expirado (401), podrías limpiar el storage y redirigir al login
        if (error.response?.status === 401) {
            try {
                await AsyncStorage.multiRemove(['authToken', 'userData']);
                // Aquí podrías emitir un evento o usar un contexto para redirigir al login
            } catch (storageError) {
                console.error('Error limpiando storage:', storageError);
            }
        }
        return Promise.reject(error);
    }
);

// Helper function para obtener el token manualmente si es necesario
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('authToken');
    } catch (error) {
        console.error('Error obteniendo token:', error);
        return null;
    }
};

// Helper function para establecer el token manualmente
export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.error('Error guardando token:', error);
    }
};

// Helper function para limpiar el token
export const clearToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error limpiando token:', error);
    }
};

export default apiClient;