import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { movieCardStyles } from '../styles/MovieCardStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity 
      style={[movieCardStyles.container, { width: CARD_WIDTH }]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: movie.poster }}
        style={movieCardStyles.poster}
        resizeMode="cover"
      />
      {movie.isNew && (
        <View style={movieCardStyles.newBadge}>
          <Text style={movieCardStyles.newText}>NUEVO</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MovieCard;