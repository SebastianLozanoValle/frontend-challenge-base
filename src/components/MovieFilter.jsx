import { useMovies } from "@/hooks/useMovies";
import styles from "@/styles/MovieFilter.module.css"
import { useEffect, useState } from "react";

export const MovieFilter = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
    const [genres, setGenres] = useState([]);
    const fetchGenres = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
      const data = await response.json();
      setGenres(data.genres);
    };
    const { movies, loading, error, loadMoreMovies } = useMovies({
      apiKey,
      genreId: selectedGenre,
      itemsPerPage: 1,
    });
  
    useEffect(() => {
      fetchGenres();
    }, []);
  
    const handleGenreChange = (event) => {
      setSelectedGenre(Number(event.target.value));
    };
  
    return (
      <div>
        <h1>Filtrar Películas por Género</h1>
        
        <select value={selectedGenre || ''} onChange={handleGenreChange}>
          <option value="">Selecciona un género</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
  
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error.message}</p>}
  
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.uuid} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
  
        {!loading && movies.length > 0 && (
          <button onClick={loadMoreMovies}>Cargar más</button>
        )}
      </div>
    );
  };