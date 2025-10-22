import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/cardVideo.js';

const CardVideo = ({ video }) => {
    // console.log(video);
    
    return (
        <View style={styles.card}>
            <Image source={{ uri: video.image }} style={styles.imagen} />
            <Text style={styles.title}>{video.title}</Text>
        </View>
    );
}

export default CardVideo