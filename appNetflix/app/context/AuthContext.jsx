import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
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

  // ✅ Dirección IP LOCAL de tu PC (la misma que muestra Expo Go: 192.168.18.22)
  // ⚠️ Asegúrate de que el servidor backend esté corriendo en ese puerto (7001)
  const API_BASE = 'http://192.168.18.22:7001';

  // Crear instancia de axios con baseURL
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
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
