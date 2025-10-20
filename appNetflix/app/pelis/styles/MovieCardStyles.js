import { StyleSheet } from 'react-native';

export const movieCardStyles = StyleSheet.create({
  container: {
    marginRight: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 4,
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderBottomLeftRadius: 4,
  },
  newText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});