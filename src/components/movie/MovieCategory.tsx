import styles from "@/styles/MovieCategory.module.css"
import { MovieCard } from "../general/MovieCard"

export const MovieCategory = ({ movies, title }: { movies: Array<any>, title: string}) => {
    return (
        <section className={styles.moviescategory}>
            <h2>{title}</h2>
            <div className={styles.moviecards}>
                {movies.map(movie => (
                    <MovieCard movie={movie} key={movie.uuid} />
                ))}
            </div>
        </section>
    )
}