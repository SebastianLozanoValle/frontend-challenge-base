'use client'
import { useMovies } from "@/hooks/useMovies";
import styles from "@/styles/MovieGalery.module.css"
import { MovieCard } from "../general/MovieCard";
import { MovieCategory } from "../movie/MovieCategory";

export const MovieGalery = () => {
    const apiKey = process.env.API_KEY

    /* Popular, Now Paying, Upcoming, Top Rated Favorites */
    const { movies: actionMovies, loading: loadingAction, error: errorAction, loadMoreMovies: loadMoreAction } = useMovies({
      apiKey,
      genreId: 28,
      itemsPerPage: 1,
    });
    const { movies: kidsMovies, loading: loadingKids, error: errorKids, loadMoreMovies: loadMoreKids } = useMovies({
      apiKey,
      genreId: 16,
      itemsPerPage: 1,
    });
  
    if (loadingAction || loadingKids) return <div>Loading...</div>;
    if (errorAction || errorKids) return <div>Error: {errorAction?.message || errorKids?.message}</div>;



    return (
        <div>
            <MovieCategory movies={actionMovies} title="Action Movies" />

            <MovieCategory movies={kidsMovies} title="Kids Movies" />
        </div>
    )
}