import React, { useEffect, useState } from 'react';
import './MovieDescription.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import udraw_video_files from './assets/undraw_video_files_fu10.svg';
import Movie from './Movie';
import Skeleton from './Skeleton';

const MovieDescription = () => {
    const { imdbId } = useParams();
    const [currMovie, setCurrMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(
                `https://www.omdbapi.com/?i=${imdbId}&apikey=2121abfd`
            );
            setCurrMovie(data);
        }
        fetchData();
    }, [imdbId]);

    return (
        <div className="movie-descr">
            {currMovie ? (
                <>
                    <div className="left-section">
                        <img src={currMovie.Poster} className="movie-descr__poster" alt="Movie/Series Poster" />
                        <div className="movie-descr__title">{currMovie.Title}</div>
                        <div className="movie-descr__prem">
                            <span className="text_bold">Premiere: </span>
                            {currMovie.Released}
                        </div>
                        <div className="movie-descr__duration">
                            <span className="text_bold">Duration: </span>
                            {currMovie.Runtime}
                        </div>
                        <div className="movie-descr__genre">
                            <span className="text_bold">Genre: </span>
                            {currMovie.Genre}
                        </div>
                        <div className="movie-descr__cast">
                            <span className="text_bold">Cast: </span>
                            {currMovie.Actors}
                        </div>
                        <div className="movie-descr__director">
                            <span className="text_bold">Director: </span>
                            {currMovie.Director}
                        </div>
                    </div>
                    <div className="middle-section">
                        <div className="movie-descr__plot">{currMovie.Plot}</div>
                        <img src={udraw_video_files} className="movie-descr__player" alt="Trailer/Player" />
                    </div>
                    <div className="right-section">
                        <Skeleton />
                        <Skeleton />
                    </div>
                </>
            ) : (
                <>
                    <div className="left-section left-section_skeleton"></div>
                    <div className="middle-section">
                        <div className="movie-descr__plot movie-descr__plot_skeleton"></div>
                        <div className="movie-descr__player movie-descr__player_skeleton"></div>
                    </div>
                    <div className="right-section">
                        <Skeleton />
                        <Skeleton />
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieDescription;
