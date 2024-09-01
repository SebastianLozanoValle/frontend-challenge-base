'use client';
import { useState, useEffect } from 'react';
import { useGenres } from "@/hooks/useGenres";
import styles from "@/styles/MovieGalery.module.css";
import { MovieCategory } from "../movie/MovieCategory";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MovieCard } from '../general/MovieCard';

export const MovieGalery = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [genre, setGenre] = useState({ value: null, text: "________________________" });
  const [inputKeyword, setInputKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categoriesMovies, setCategoriesMovies] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);

  const apiKey = "e71937fb1ccb3737f2120e5b18735116";

  const { genres, loading: loadingGenres, error: errorGenres } = useGenres(apiKey);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoadingCategories(true);
      try {
        if (keyword !== "") {
          const moviesByKeyword = await fetchMoviesByKeyword(keyword);
          setCategoriesMovies({ searchResults: moviesByKeyword });
        } else {
          const moviesByCategory = {};
          for (const genre of genres) {
            const movies = await fetchMoviesForGenre(genre.id);
            moviesByCategory[genre.id] = movies;
          }
          setCategoriesMovies(moviesByCategory);
        }
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoadingCategories(false);
      }
    };
  
    const fetchMoviesByKeyword = async (keyword) => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${keyword}&page=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      return data.results.map((movie) => ({
        ...movie,
        uuid: movie.id
      }));
    };
  
    const fetchMoviesForGenre = async (genreId) => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&with_genres=${genreId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      return data.results.map((movie) => ({
        ...movie,
        uuid: movie.id
      }));
    };
  
    if (genres.length > 0) {
      fetchAllMovies();
    }
  }, [genres, apiKey, keyword]);

  const handleGenreChange = (genre) => {
    setGenre(genre);
    setKeyword("");
    setInputKeyword("");
    setIsOpenOptions(false);
  };

  const handleSearchClick = () => {
    setKeyword(inputKeyword);
    setGenre({ value: null, text: "________________________" });
  };

  if (loadingGenres || loadingCategories) return <div className={styles.loading}>Loading...</div>;
  if (errorGenres) return <div>Error: {errorGenres.message}</div>;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setKeyword(inputKeyword);
      setGenre({ value: null, text: "________________________" });
    }
  }

  return (
    <div className={styles.galerycontainer}>
      <div className={styles.filtercontainer}>
        <div className={styles.openclosecontainer}>
          <button onClick={() => setIsOpenFilter(!isOpenFilter)} className={styles.openclosebtn}>
            {isOpenFilter ? <IoIosArrowUp /> : <div className={styles.closebtn}><h4>Search Filters</h4><IoIosArrowDown /></div>}
          </button>
        </div>
        {isOpenFilter && (
          <>
            <div className={styles.searchcontainer}>
              <label htmlFor="search">Search</label>
              <div className={styles.inputcontainer}>
                <input
                  id="search"
                  placeholder="Keywords"
                  type="text"
                  value={inputKeyword}
                  onChange={(e) => setInputKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearchClick}>
                  <IoSearchOutline />
                </button>
              </div>
            </div>
            <div className={styles.categoryselectcontainer}>
              <label htmlFor="genre">Genre</label>
              <button className={styles.genrebtn} onClick={() => setIsOpenOptions(!isOpenOptions)} id="genre">{genre.text}{isOpenOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
              {isOpenOptions &&
                <div className={styles.optionscontainer}>
                  <button onClick={() => handleGenreChange({ value: null, text: "________________________" })}>
                    ________________________
                  </button>
                  {genres.map((g) => (
                    <button key={g.id} onClick={() => handleGenreChange({ value: g.id, text: g.name })}>
                      {g.name}
                    </button>
                  ))}
                </div>
              }
            </div>
          </>
        )}
      </div>
      <div className={styles.categoriescontainer}>
        {genre.value === null && keyword === "" ? (
          genres.map((g) => (
            <MovieCategory
              key={g.id}
              movies={categoriesMovies[g.id] || []}
              title={`${g.name} Movies`}
            />
          ))
        ) : keyword !== "" ? (
          <div className={styles.selectedGenreContainer}>
            <h2>Search Results for &quot;{keyword}&quot;</h2>
            {categoriesMovies.searchResults?.length === 0 ? (
              <div>No movies found.</div>
            ) : (
              <div className={styles.defaultCard}>
                <ul className={styles.moviescolumns}>
                  {categoriesMovies.searchResults?.map((movie) => (
                    <li key={movie.uuid}><MovieCard movie={movie} /></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          genre.value !== null && (
            <div className={styles.selectedGenreContainer}>
              <h2>{genre.text} Movies</h2>
              {categoriesMovies[genre.value]?.length === 0 ? (
                <div>No movies found.</div>
              ) : (
                <div className={styles.defaultCard}>
                  <ul className={styles.moviescolumns}>
                    {categoriesMovies[genre.value]?.map((movie) => (
                      <li key={movie.uuid}><MovieCard movie={movie} /></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};
