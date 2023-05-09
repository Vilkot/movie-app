import React, { useEffect, useState } from 'react';
import './MoviePage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDescription = () => {
        const { imdbId } = useParams();
        const [data, setData] = useState(null);

        useEffect(() => {
            async function fetchData() {
                const { data } = await axios.get(
                    `https://www.omdbapi.com/?i=${imdbId}&apikey=2121abfd`
                );
                setData(data);
            }
            fetchData();
        }, [imdbId]);

        return (
            <div className="movie__page">
                {data && <img src={data.Poster} alt="Movie/Series Poster" />}
                <div className="movie__page-title">{data?.Title}</div>
            </div>
        );
    }

    export default MovieDescription;
