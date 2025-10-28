import React, { useEffect} from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles/browser.js';
import useBrowser from '../hooks/useBrowser.js';
import CardVideo from '../components/CardVideo.jsx';

const Favoritos = () => {

    const { favorites, fetchFavorites } = useBrowser();

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Favoritos</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CardVideo video={item} />}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
        </View>
  )
}
export default Favoritos;
