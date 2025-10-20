import React from 'react';
import { View, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import FeaturedMovie from '../components/FeaturedMovie';
import MovieRow from '../components/MovieRow';
import MovieDetail from '../components/MovieDetail';
import useMovies from '../hooks/useMovies';
import { moviesStyles } from '../styles/MoviesStyles';

const Movies = ({ navigation }) => {
  const { movies, loading, selectedMovie, selectMovie, closeMovieDetail } = useMovies();

  const handleMoviePress = (movie) => {
    selectMovie(movie);
  };

  const handlePlay = () => {
    console.log('Reproducir película:', selectedMovie?.title || 'destacada');
    // Aquí navegarías al reproductor
  };

  const handleMyList = () => {
    console.log('Agregar a mi lista');
  };

  const handleLike = () => {
    console.log('Me gusta');
  };

  if (loading) {
    return (
      <View style={moviesStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <View style={moviesStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView 
        style={moviesStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {movies.featured && (
          <FeaturedMovie 
            movie={movies.featured}
            onPlay={handlePlay}
            onMyList={handleMyList}
          />
        )}

        <View style={moviesStyles.rowsContainer}>
          <MovieRow 
            title="Películas y programas de Colombia" 
            movies={movies.trending}
            onMoviePress={handleMoviePress}
          />
          
          <MovieRow 
            title="Películas y programas peruanos" 
            movies={movies.action}
            onMoviePress={handleMoviePress}
          />
          
          <MovieRow 
            title="Historias de época" 
            movies={movies.comedy}
            onMoviePress={handleMoviePress}
          />
          
          <MovieRow 
            title="Series emocionantes" 
            movies={movies.drama}
            onMoviePress={handleMoviePress}
          />
          
          <MovieRow 
            title="Continuando viendo contenido de Bruno P" 
            movies={movies.thriller}
            onMoviePress={handleMoviePress}
          />
        </View>
      </ScrollView>

      {/* Modal de detalles de película */}
      <MovieDetail 
        visible={!!selectedMovie}
        movie={selectedMovie}
        onClose={closeMovieDetail}
        onPlay={handlePlay}
        onAddToList={handleMyList}
        onLike={handleLike}
      />
    </View>
  );
};

export default Movies;