import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/cardVideo.js';

const CardVideo = ({ video }) => {
    const navigation = useNavigation();

    const handleVideoPress = () => {
        navigation.navigate('Video', { videoData: video });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handleVideoPress} activeOpacity={0.8}>
            <Image source={{ uri: video.image }} style={styles.imagen} />
            <View style={styles.titleContainer}>
                <Ionicons name="play" size={24} color="white" style={styles.playIcon} />
                <Text style={styles.title}>{video.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CardVideo