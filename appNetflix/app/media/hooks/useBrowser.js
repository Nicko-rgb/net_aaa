import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../utils/axiosInstance';
import { Linking, Alert } from 'react-native';

const useBrowser = () => {
    const [currentScreen, setCurrentScreen] = useState('inicio');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [allVideos, setAllVideos] = useState([]); // Almacenar todos los videos originales
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [watchHistory, setWatchHistory] = useState([]);
    const [bannerVideos, setBannerVideos] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState('');

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    };

    // ✅ Función para filtrar videos por búsqueda y categoría
    const filterVideos = (searchTerm = searchQuery, category = activeCategory) => {
        let filteredVideos = [...allVideos];

        // Filtrar por categoría
        if (category !== 'Todos') {
            filteredVideos = filteredVideos.filter(video => 
                video.category && video.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtrar por término de búsqueda
        if (searchTerm && searchTerm.trim() !== '') {
            filteredVideos = filteredVideos.filter(video =>
                video.title && video.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setVideos(filteredVideos);
    };

    // ✅ Función para cambiar categoría activa
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        filterVideos(searchQuery, category);
    };

    // ✅ Función para manejar cambios en la búsqueda
    const handleSearchChange = (searchTerm) => {
        setSearchQuery(searchTerm);
        filterVideos(searchTerm, activeCategory);
    };

    // ✅ Obtener categorías
    const fetchCategories = async () => {
        try {
            const response = await apiClient.get('/videos/categories');
            setCategories(['Todos', ...response.data]);
        } catch (err) {
            console.error('Error al cargar categorías:', err);
            setCategories(['Todos', 'Drama', 'Acción', 'Comedia', 'Terror', 'Romance', 'Ciencia Ficción',]);
        }
    };

    // ✅ Obtener videos
    const fetchVideos = async () => {
        try {
            const response = await apiClient.get('/videos');
            setAllVideos(response.data); // Guardar todos los videos originales
            setVideos(response.data); // Mostrar todos inicialmente
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
            const response = await apiClient.get('/favorites');
            setFavorites(response.data);
        } catch (err) {
            console.error('Error al cargar favoritos:', err);
        }
    };

    // ✅ Obtener historial de reproducción
    const fetchWatchHistory = async () => {
        try {
            const response = await apiClient.get('/history');
            setWatchHistory(response.data);
        } catch (err) {
            console.error('Error al cargar historial:', err);
        }
    };

    // ✅ Obtener videos del banner
    const fetchBannerVideos = async () => {
        try {
            const response = await apiClient.get('/videos/banner');
            setBannerVideos(response.data);
        } catch (err) {
            console.error('Error al cargar videos del banner:', err);
        }
    };

    // Verificar si un video específico está en favoritos
    const checkIsFavorite = async (videoId) => {
        try {
            const response = await apiClient.get(`/favorites/check/${videoId}`);
            return response.data.isFavorite;
        } catch (error) {
            console.error('Error al verificar favorito:', error);
            return false;
        }
    };

    // Verificar si un video está en favoritos (usando el array local)
    const isVideoInFavorites = (videoId) => {
        return favorites.some(fav => fav.id === videoId);
    };

    // Agregar/quitar de favoritos
    const toggleFavorite = async (video) => {
        if (!video || loading) return;

        setLoading(true);
        try {
            const currentlyFavorite = isVideoInFavorites(video.id);

            if (currentlyFavorite) {
                await apiClient.delete(`/favorites/${video.id}`);
            } else {
                await apiClient.post('/favorites',
                    { videoId: video.id }
                );
            }

            // Actualizar la lista de favoritos
            await fetchFavorites();
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
        } finally {
            setLoading(false);
        }
    };

    // Agregar al historial
    const addToHistory = async (video) => {
        if (!video || loading) return;
        try {
            await apiClient.post('/history',
                { videoId: video.id }
            );
            // Actualizar la lista de historial en el componente padre
            fetchWatchHistory();
        } catch (error) {
            console.error('Error al agregar al historial:', error);
        }
    };

    // Función para convertir URLs de Dropbox a enlaces directos
    const getDirectVideoUrl = (url) => {
        if (url && url.includes('dropbox.com')) {
            // Si es una URL de Dropbox, convertir a enlace directo
            if (url.includes('?')) {
                return url.includes('dl=1') ? url : url + '&dl=1';
            } else {
                return url + '?dl=1';
            }
        }
        return url;
    };

    // Funcion para descargar video
    const handleDownload = async (video) => {
        try {
            const directUrl = getDirectVideoUrl(video.videoUrl);
            
            // Abrir la URL de descarga en el navegador del sistema
            const supported = await Linking.canOpenURL(directUrl);
            
            if (supported) {
                await Linking.openURL(directUrl);
            } else {
                Alert.alert(
                    'Error',
                    'No se puede abrir la URL de descarga',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Error al abrir URL de descarga:', error);
        }
    };


    // ✅ Aplicar filtros cuando cambien los datos
    useEffect(() => {
        if (allVideos.length > 0) {
            filterVideos();
        }
    }, [allVideos, searchQuery, activeCategory]);

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
        setSearchQuery: handleSearchChange,
        activeCategory,
        handleCategoryChange,
        categories,
        videos,
        allVideos,
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
        toggleFavorite,
        addToHistory,
        checkIsFavorite,
        isVideoInFavorites,
        handleDownload,
        getDirectVideoUrl,
        filterVideos,
    };
};

export default useBrowser;
