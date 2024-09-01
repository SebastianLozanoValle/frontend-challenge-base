'use client'
import { useEffect, useState } from 'react';

export const useGenres = (apiKey) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [apiKey]);

  return { genres, loading, error };
};