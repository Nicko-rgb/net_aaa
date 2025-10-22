import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles/browser.js';
import CardVideo from '../components/CardVideo.jsx';

const Inicio = ({ categories, videos }) => {

    return (
        <View style={styles.views}>
            {/* ✅ Scroll horizontal para categorías */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsContainer}
            >
                {categories.map((tag, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.tagButton}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={videos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CardVideo video={item} />}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Inicio;
