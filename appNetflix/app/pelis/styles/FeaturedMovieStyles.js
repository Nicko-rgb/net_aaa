import { StyleSheet } from 'react-native';

export const featuredMovieStyles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 16,
  },
  genres: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  genreText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E50914',
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#000',
  },
  playText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listButton: {
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#FFF',
  },
  listText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});