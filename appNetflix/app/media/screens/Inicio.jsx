import React from 'react'
import { View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/browser.js';
import CardVideo from '../components/CardVideo.jsx';


const Inicio = ({ videos }) => {
    return (
        <View style={styles.vista}>
            <Text style={styles.title}>Inicio, lista todos los videos</Text>
            <View contentContainerStyle={styles.gridContainer} >
                {videos.map((video, index) => (
                    <FlatList
                        data={videos}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CardVideo video={item} />}
                        numColumns={2} // ✅ Muestra 2 columnas
                        columnWrapperStyle={styles.columnWrapper} // ✅ Alinea las columnas
                        contentContainerStyle={styles.gridContainer}
                        showsVerticalScrollIndicator={false}
                    />
                ))}
            </View>
        </View>
    )
}
export default Inicio;
