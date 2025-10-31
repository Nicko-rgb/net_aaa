import React, { useEffect} from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import styles from '../styles/browser.js';
import useBrowser from '../hooks/useBrowser.js';
import CardVideo from '../components/CardVideo.jsx';

const Favoritos = ({ refreshing, onRefresh }) => {

    const { favorites, fetchFavorites } = useBrowser();

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#fff"
                    colors={['#fff']}
                />
            }
        >
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
        </ScrollView>
  )
}
export default Favoritos;
