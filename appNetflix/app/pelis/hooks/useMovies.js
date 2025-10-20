import { useState, useEffect } from 'react';

const useMovies = () => {
  const [movies, setMovies] = useState({
    featured: null,
    trending: [],
    action: [],
    comedy: [],
    drama: [],
    thriller: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    setTimeout(() => {
      setMovies({
        featured: {
          id: 1,
          title: 'La Mujer del Camarote 10',
          backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
          logo: 'https://via.placeholder.com/300x100/E50914/FFFFFF?text=LA+MUJER+DEL+CAMAROTE+10',
          genres: ['Suspenso', 'Drama', 'Misterio'],
        },
        trending: generateMovies('Películas de Colombia', 8),
        action: generateMovies('Películas de Perú', 8),
        comedy: generateMovies('Historias de época', 8),
        drama: generateMovies('Series emocionantes', 8),
        thriller: generateMovies('Continuando', 8),
      });
      setLoading(false);
    }, 1000);
  };

  const generateMovies = (category, count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${category}-${i}`,
      title: `${category} ${i + 1}`,
      poster: `https://picsum.photos/300/450?random=${category}-${i}`,
      backdrop: `https://picsum.photos/800/450?random=${category}-${i}-back`,
      logo: `https://via.placeholder.com/250x80/E50914/FFFFFF?text=${category.toUpperCase()}`,
      subtitle: 'Cachín. Qué blanquito te ha salido, qué suerte.',
      year: 2013 + (i % 10),
      duration: `${1 + (i % 2)}h ${30 + (i % 30)}min`,
      ageRating: i % 3 === 0 ? '7+' : i % 3 === 1 ? '13+' : '16+',
      description: `Sigue las aventuras del reconocido comediante Carlos Alcántara en su camino a la fama, desde el día en que nació hasta el día en que logró el éxito.`,
      cast: 'Carlos Alcántara, Ana Cecilia Costa, Gisela Ponce de León, más',
      genres: ['Drama', 'Comedia', 'Nostálgico'],
      tags: 'Nostálgico',
      isNew: Math.random() > 0.7,
      collectionName: category,
      collection: [
        {
          poster: `https://picsum.photos/300/450?random=col-${i}-1`,
          duration: '1h 36min',
        },
        {
          poster: `https://picsum.photos/300/450?random=col-${i}-2`,
          duration: '1h 39min',
        },
        {
          poster: `https://picsum.photos/300/450?random=col-${i}-3`,
          duration: '1h 52min',
        },
      ],
    }));
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
  };

  return { 
    movies, 
    loading, 
    selectedMovie, 
    selectMovie, 
    closeMovieDetail 
  };
};

export default useMovies;