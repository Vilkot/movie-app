import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Movie.css';

const Movie = ({ movie, series }) => {
    const [rating, setRating] = useState("");
    let navigate = useNavigate();

    async function getRating() {
        const { data } = await axios.get(`https://www.omdbapi.com/?i=${movie?.imdbID || series?.imdbID}&apikey=2121abfd`);
        setRating(data.imdbRating);
    }

    function navigateToMoviePage() {
        navigate(`/movie/${movie?.imdbID || series?.imdbID}`);
    }

    useEffect(() => {
        getRating();
    }, []);

    return (
        <div className="movie">
            <img className="movie__poster" src={movie?.Poster || series?.Poster} onClick={() => navigateToMoviePage()} />
            <div className="movie__description">
                <h1 className="movie__title" onClick={() => navigateToMoviePage()}>{movie?.Title || series?.Title}</h1>
                <div className="movie__info--wrapper">
                    <h2 className="movie__type">
                        {movie?.Type || series?.Type}
                        <span className="movie__year"> {`(${movie?.Year || series?.Year})`}</span>
                    </h2>
                    <Link to={`https://www.imdb.com/title/${movie?.imdbID || series?.imdbID}`} className="movie__link" target='_blank'>
                        {rating === "N/A" || !rating ? (
                            "IMDb"
                        ) : (
                            rating
                        )}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Movie;

