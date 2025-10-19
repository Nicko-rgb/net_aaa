import { useState } from 'react';

const useBrowser = () => {
    const [currentScreen, setCurrentScreen] = useState('inicio');
    const [searchQuery, setSearchQuery] = useState('');

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    };

    return {
        currentScreen,
        handleScreenChange,
        searchQuery,
        setSearchQuery
    };
};

export default useBrowser;
