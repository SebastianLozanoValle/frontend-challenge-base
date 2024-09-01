'use'
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useTrendMovies = (apiKey) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          params: {
            api_key: apiKey,
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // Realiza la solicitud a la API una sola vez cuando el componente se monta
  }, [apiKey]);

  return { movies, loading, error };
};
