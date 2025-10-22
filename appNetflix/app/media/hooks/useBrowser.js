import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const useBrowser = () => {
    const [currentScreen, setCurrentScreen] = useState('inicio');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [watchHistory, setWatchHistory] = useState([]);
    const [bannerVideos, setBannerVideos] = useState([]);
    const [error, setError] = useState('');

    // ✅ axios base url
    const api = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
    });

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    };

    // 🔑 Helper para obtener token
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            return token;
        } catch (err) {
            console.error('Error obteniendo token:', err);
            return null;
        }
    };

    // ✅ Obtener categorías
    const fetchCategories = async () => {
        try {
            const token = await getToken();
            const response = await api.get('/videos/categories', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCategories(['Todos', ...response.data]);
        } catch (err) {
            console.error('Error al cargar categorías:', err);
            setCategories([ 'Todos', 'Drama', 'Acción', 'Comedia', 'Terror', 'Romance', 'Ciencia Ficción', ]);
        }
    };

    // ✅ Obtener videos
    const fetchVideos = async () => {
        try {
            const token = await getToken();
            const response = await api.get('/videos', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVideos(response.data);
        } catch (err) {
            console.error('Error al cargar videos:', err);
            setError('Error al cargar los videos');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Obtener favoritos
    const fetchFavorites = async () => {
        try {
            const token = await getToken();
            const response = await api.get('/favorites', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavorites(response.data);
        } catch (err) {
            console.error('Error al cargar favoritos:', err);
        }
    };

    // ✅ Obtener historial de reproducción
    const fetchWatchHistory = async () => {
        try {
            const token = await getToken();
            const response = await api.get('/history', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWatchHistory(response.data);
        } catch (err) {
            console.error('Error al cargar historial:', err);
        }
    };

    // ✅ Obtener videos del banner
    const fetchBannerVideos = async () => {
        try {
            const token = await getToken();
            const response = await api.get('/videos/banner', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBannerVideos(response.data);
        } catch (err) {
            console.error('Error al cargar videos del banner:', err);
        }
    };

    // ✅ Cargar datos iniciales
    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                fetchCategories(),
                fetchVideos(),
                fetchFavorites(),
                fetchWatchHistory(),
                fetchBannerVideos(),
            ]);
        };

        loadData();
    }, []);

    const fetchPadre = () => {
        const loadData = async () => {
            await Promise.all([
                fetchCategories(),
                fetchVideos(),
                fetchFavorites(),
                fetchWatchHistory(),
                fetchBannerVideos(),
            ]);
        };
        loadData();
    }

    return {
        currentScreen,
        handleScreenChange,
        searchQuery,
        setSearchQuery,
        categories,
        videos,
        favorites,
        watchHistory,
        bannerVideos,
        loading,
        error,
        fetchCategories,
        fetchVideos,
        fetchFavorites,
        fetchWatchHistory,
        fetchBannerVideos,
        fetchPadre,
    };
};

export default useBrowser;
