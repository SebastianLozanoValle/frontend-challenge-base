'use client'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useMovies = ({ apiKey, genreId, itemsPerPage = 20, keyword = '' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMovies = async (page) => {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${genreId || ''}&query=${keyword}&per_page=${itemsPerPage}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      return data.results.map((movie) => ({
        ...movie,
        uuid: uuidv4()
      }));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const newMovies = await fetchMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [apiKey, genreId, page, keyword]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { movies, loading, error, loadMoreMovies };
};
