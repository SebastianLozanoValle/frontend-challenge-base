'use client'
import styles from "@/styles/HeroBanne.module.css"
import { FaHeart } from "react-icons/fa";
import { PercentCircle } from "../general/PercentCircle";
import { useEffect, useState } from "react";
import { useTrendMovies } from "@/hooks/useTrendMovies"
import Image from "next/image";

export const HeroBanner = () => {
    const apiKey = process.env.API_KEY;
    const { movies, loading, error }: { movies, loading, error } = useTrendMovies(apiKey);

    const [currentMovie, setCurrentMovie]: [currentMovie: any, setCurrentMovie: any] = useState(null);

    useEffect(() => {
        if (movies.length > 0) {
            const updateMovie = () => {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                setCurrentMovie(randomMovie);
            };
            
            const interval = setInterval(updateMovie, 5000);

            updateMovie();

            return () => clearInterval(interval);
            
        }
        return
    }, [movies]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className={styles.herobanner}>
            {currentMovie?.backdrop_path && (
                <div className={styles.imageContainer}>
                    <Image
                        src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
                        alt="Background Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </div>
            )}
            <div className={styles.herobannercontent}>
                <div className={styles.highlightedmovie}>
                    <div className={styles.highlightedmoviecontent}>
                        {currentMovie && (
                            <>
                                <h2>{currentMovie.title}</h2>
                                <p>{currentMovie.overview}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.reactionscontainer}>
                    <button className={styles.favoriteicon}>
                        <FaHeart />
                    </button>
                    <div>
                        <div className={styles.percentagecontainer}>
                            {currentMovie && <PercentCircle percentage={Math.floor(parseFloat(currentMovie.vote_average) * 10)} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
