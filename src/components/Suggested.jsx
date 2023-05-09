import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import './Suggested.css';
import './Movie.css'
import Skeleton from './Skeleton';

const Suggested = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState();

    async function getSuggested() {
        setLoading(true);

        const moviesUrl = 'https://www.omdbapi.com/?s=movie&type=movie&y=2023&apikey=2121abfd';
        const seriesUrl = 'https://www.omdbapi.com/?s=series&type=series&apikey=2121abfd';

        const [moviesData, seriesData] = await Promise.all([
            axios.get(moviesUrl),
            axios.get(seriesUrl),
        ]);

        const filteredMovies = []; // Масиви, які будуть містити відсортовані за
        const filteredSeries = []; // висотою обложки фільми та серіаліи

        // Створюємо Promise для кожного елемента масиву фільмів
        const moviesLoadPromises = moviesData.data.Search.map(movie => new Promise((resolve) => {
            if (!movie.Poster || movie.Poster === 'N/A') {
                resolve();
            } else {
                // Створюємо новий елемент img для
                // завантаження посилання на постер фільму
                const img = new Image();
                // Завантажуємо посилання на постер
                img.src = movie.Poster;
                // Чекаємо, коли постер завантажиться
                img.onload = function () {
                    if (this.height > 330) {
                        filteredMovies.push(movie);
                    }
                    resolve();
                }
            };
        }));

        const seriesLoadPromises = seriesData.data.Search.map(series => new Promise((resolve) => {
            if (!series.Poster || series.Poster === 'N/A') {
                resolve();
            } else {
                const img = new Image();
                img.src = series.Poster;
                img.onload = function () {
                    if (this.height > 330) {
                        filteredSeries.push(series);
                    }
                    resolve();
                }
            };
        }));

        await Promise.all([...moviesLoadPromises, ...seriesLoadPromises]);

        setMovies(filteredMovies.slice(0, 8));
        setSeries(filteredSeries.slice(0, 8));
        setLoading(false);
    }

    useEffect(() => {
        getSuggested();
    }, []);

    return (
        <>
            {loading ? (
                <div className="suggested">
                    <p className="suggested__header">Latest releases</p>
                    <div className="suggested__movies">
                        {new Array(8).fill(0).map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                    </div>
                    <p className="suggested__header suggested__header--2nd">Popular series</p>
                    <div className="suggested__movies">
                        {new Array(8).fill(0).map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="suggested">
                    <p className="suggested__header">Latest releases</p>
                    <div className="suggested__movies">
                        {movies.map(movie => (
                            <Movie movie={movie} key={movie.imdbID} />
                        ))}
                    </div>
                    <p className="suggested__header suggested__header--2nd">Popular series</p>
                    <div className="suggested__movies">
                        {series.map(series => (
                            <Movie series={series} key={series.imdbID} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );

}

export default Suggested;
