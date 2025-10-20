import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const movieDetailStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxHeight: height * 0.85,
    backgroundColor: '#181818',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    position: 'relative',
    height: 400,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIcon: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 16,
    background: 'linear-gradient(to top, #181818 0%, transparent 100%)',
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: 12,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(42, 42, 42, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
    fontSize: 20,
  },
  info: {
    padding: 24,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  year: {
    color: '#46D369',
    fontSize: 14,
    fontWeight: 'bold',
  },
  duration: {
    color: '#FFF',
    fontSize: 14,
  },
  hdBadge: {
    borderWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  hdText: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ageBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  ageText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#777',
    fontSize: 13,
  },
  detailValue: {
    color: '#FFF',
    fontSize: 13,
    flex: 1,
  },
  collection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  collectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  collectionScroll: {
    marginHorizontal: -8,
  },
  collectionItem: {
    marginHorizontal: 4,
    position: 'relative',
  },
  collectionPoster: {
    width: 120,
    height: 180,
    borderRadius: 4,
  },
  collectionDuration: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});