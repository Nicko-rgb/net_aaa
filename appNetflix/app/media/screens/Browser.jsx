import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../context/AuthContext';
import Header from '../components/Header';
import useBrowser from '../hooks/useBrowser';
import Inicio from './Inicio';
import Fovorites from './Fovorites';
import History from './History';
import styles from '../styles/browser';

const Browser = () => {
    const { currentScreen, handleScreenChange, searchQuery, setSearchQuery } = useBrowser();
    const { logout } = useAuthContext();

    const renderScreen = () => {
        switch (currentScreen) {
            case 'inicio':
                return <Inicio />;
            case 'favoritos':
                return <Fovorites />;
            case 'historial':
                return <History />;
            default:
                return <Inicio />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleScreenChange={handleScreenChange}
                onLogout={logout}
            />
            <View style={{ flex: 1 }}>
                {renderScreen()}
            </View>
        </SafeAreaView>
    );
};

export default Browser;