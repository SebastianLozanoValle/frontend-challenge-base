import styles from "@/styles/MovieCard.module.css"
import Image from "next/image"
import { PercentCircle } from "./PercentCircle";
import { FaHeart } from "react-icons/fa6";

export const MovieCard = ({ movie }: {movie: any}) => {

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

    return (
        <div className={styles.moviecard} key={movie.uuid}>
            <div className={styles.imagecontainer}>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <div className={styles.moviecardcontent}>
                <h3>
                    {movie.title}
                </h3>
                <span>
                    {formatDate(movie.release_date)}
                </span>
                <div className={styles.reactionscontainer}>
                    <div className={styles.reaction}>
                        <p>Rating</p>
                        <div className={styles.moviecardpercentagecontainer}>
                            <PercentCircle percentage={Math.floor(parseFloat(movie.vote_average) * 10)} />
                        </div>
                    </div>
                    <div className={styles.reaction}>
                        <p>Favorites</p>
                        <button className={styles.moviecardpercentagecontainer}>
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}