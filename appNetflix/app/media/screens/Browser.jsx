import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../context/AuthContext';
import Header from '../components/Header';
import useBrowser from '../hooks/useBrowser';
import Sidebar from '../components/Sidebar';
import Inicio from './Inicio';
import Fovorites from './Fovorites';
import History from './History';
import styles from '../styles/browser';

const Browser = () => {
    const { currentScreen, handleScreenChange, searchQuery, setSearchQuery, categories, videos, fetchPadre } = useBrowser();
    const { logout } = useAuthContext();
    const [sidebar, setSidebar] = useState(false);

    const toggleMenu = () => setSidebar(!sidebar);

    const renderScreen = () => {
        switch (currentScreen) {
            case 'inicio':
                return <Inicio categories={categories} videos={videos} />;
            case 'favoritos':
                return <Fovorites />;
            case 'historial':
                return <History />;
            default:
                return <Inicio categories={categories} videos={videos} />;
        }
    };

    return (
        <SafeAreaView style={styles.browser}>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleScreenChange={handleScreenChange}
                onLogout={logout}
                onRefresh={fetchPadre}
                onToggleMenu={toggleMenu}
            />

            {renderScreen()}

            <Sidebar visible={sidebar} handleScreenChange={handleScreenChange} onClose={toggleMenu} />

        </SafeAreaView>
    );
};

export default Browser;
