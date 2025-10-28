import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles/browser.js';
import useBrowser  from '../hooks/useBrowser.js';
import CardVideo from '../components/CardVideo.jsx';

const History = () => {
    const { watchHistory } = useBrowser();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de videos</Text>
            <FlatList
                data={watchHistory}
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
export default History;
