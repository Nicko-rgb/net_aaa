import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { featuredMovieStyles } from '../styles/FeaturedMovieStyles';

const { height } = Dimensions.get('window');

const FeaturedMovie = ({ movie, onPlay, onMyList }) => {
  return (
    <View style={[featuredMovieStyles.container, { height: height * 0.7 }]}>
      <Image 
        source={{ uri: movie.backdrop }}
        style={featuredMovieStyles.backdrop}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
        style={featuredMovieStyles.gradient}
      >
        <View style={featuredMovieStyles.content}>
          <Image 
            source={{ uri: movie.logo }}
            style={featuredMovieStyles.logo}
            resizeMode="contain"
          />
          
          <View style={featuredMovieStyles.genres}>
            {movie.genres.map((genre, index) => (
              <React.Fragment key={genre}>
                <Text style={featuredMovieStyles.genreText}>{genre}</Text>
                {index < movie.genres.length - 1 && (
                  <View style={featuredMovieStyles.dot} />
                )}
              </React.Fragment>
            ))}
          </View>
          
          <View style={featuredMovieStyles.buttons}>
            <TouchableOpacity 
              style={featuredMovieStyles.playButton}
              onPress={onPlay}
            >
              <Text style={featuredMovieStyles.playIcon}>▶</Text>
              <Text style={featuredMovieStyles.playText}>Reproducir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={featuredMovieStyles.listButton}
              onPress={onMyList}
            >
              <Text style={featuredMovieStyles.plusIcon}>+</Text>
              <Text style={featuredMovieStyles.listText}>Mi lista</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default FeaturedMovie;