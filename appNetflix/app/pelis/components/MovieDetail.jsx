import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { movieDetailStyles } from '../styles/MovieDetailStyles';

const MovieDetail = ({ visible, movie, onClose, onPlay, onAddToList, onLike }) => {
  if (!movie) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={movieDetailStyles.overlay}>
        <View style={movieDetailStyles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header con backdrop */}
            <View style={movieDetailStyles.header}>
              <Image 
                source={{ uri: movie.backdrop }}
                style={movieDetailStyles.backdrop}
                resizeMode="cover"
              />
              
              {/* Botón cerrar */}
              <TouchableOpacity 
                style={movieDetailStyles.closeButton}
                onPress={onClose}
              >
                <Text style={movieDetailStyles.closeIcon}>✕</Text>
              </TouchableOpacity>

              {/* Contenido sobre la imagen */}
              <View style={movieDetailStyles.headerContent}>
                <Image 
                  source={{ uri: movie.logo }}
                  style={movieDetailStyles.logo}
                  resizeMode="contain"
                />
                
                {movie.subtitle && (
                  <Text style={movieDetailStyles.subtitle}>{movie.subtitle}</Text>
                )}

                {/* Botones de acción */}
                <View style={movieDetailStyles.actions}>
                  <TouchableOpacity 
                    style={movieDetailStyles.playButton}
                    onPress={onPlay}
                  >
                    <Text style={movieDetailStyles.playIcon}>▶</Text>
                    <Text style={movieDetailStyles.playText}>Reproducir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={movieDetailStyles.iconButton}
                    onPress={onAddToList}
                  >
                    <Text style={movieDetailStyles.iconText}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={movieDetailStyles.iconButton}
                    onPress={onLike}
                  >
                    <Text style={movieDetailStyles.iconText}>👍</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Información de la película */}
            <View style={movieDetailStyles.info}>
              <View style={movieDetailStyles.metadata}>
                <Text style={movieDetailStyles.year}>{movie.year}</Text>
                <Text style={movieDetailStyles.duration}>{movie.duration}</Text>
                <View style={movieDetailStyles.hdBadge}>
                  <Text style={movieDetailStyles.hdText}>HD</Text>
                </View>
                <View style={movieDetailStyles.ageBadge}>
                  <Text style={movieDetailStyles.ageText}>{movie.ageRating}</Text>
                </View>
              </View>

              <Text style={movieDetailStyles.description}>
                {movie.description}
              </Text>

              <View style={movieDetailStyles.detailRow}>
                <Text style={movieDetailStyles.detailLabel}>Elenco: </Text>
                <Text style={movieDetailStyles.detailValue}>{movie.cast}</Text>
              </View>

              <View style={movieDetailStyles.detailRow}>
                <Text style={movieDetailStyles.detailLabel}>Géneros: </Text>
                <Text style={movieDetailStyles.detailValue}>{movie.genres.join(', ')}</Text>
              </View>

              <View style={movieDetailStyles.detailRow}>
                <Text style={movieDetailStyles.detailLabel}>Este título es: </Text>
                <Text style={movieDetailStyles.detailValue}>{movie.tags}</Text>
              </View>

              {/* Colección relacionada */}
              {movie.collection && (
                <View style={movieDetailStyles.collection}>
                  <Text style={movieDetailStyles.collectionTitle}>
                    🎬 Colección de {movie.collectionName}
                  </Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={movieDetailStyles.collectionScroll}
                  >
                    {movie.collection.map((item, index) => (
                      <View key={index} style={movieDetailStyles.collectionItem}>
                        <Image 
                          source={{ uri: item.poster }}
                          style={movieDetailStyles.collectionPoster}
                        />
                        <Text style={movieDetailStyles.collectionDuration}>
                          {item.duration}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MovieDetail;