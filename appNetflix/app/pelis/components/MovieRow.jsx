import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MovieCard from './MovieCard';
import { movieRowStyles } from '../styles/MovieRowStyles';

const MovieRow = ({ title, movies, onMoviePress }) => {
  return (
    <View style={movieRowStyles.container}>
      <Text style={movieRowStyles.title}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={onMoviePress} />
        )}
        contentContainerStyle={movieRowStyles.listContent}
      />
    </View>
  );
};

export default MovieRow;