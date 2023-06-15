import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Movie.css';
import { Add, Remove } from '@mui/icons-material';
import { auth, db } from './firebase';
import { addDoc, collection, deleteDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

const Movie = ({ movie, series }) => {
    const [rating, setRating] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    let navigate = useNavigate();

    async function getRating() {
        const { data } = await axios.get(`https://www.omdbapi.com/?i=${movie?.imdbID || series?.imdbID}&apikey=2121abfd`);
        setRating(data.imdbRating);
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const unsubscribe = onSnapshot(collection(db, "users", user.uid, "Selected"), (snapshot) => {
                setIsSelected(snapshot.docs.some(doc => doc.data().imdbID === (movie?.imdbID || series?.imdbID)));
            });
            return unsubscribe;
        } else {
            setIsSelected(false);
        }
    }, []);

    async function addToSelected() {
        const user = auth.currentUser;
        if (user) {
            try {
                await addDoc(collection(db, "users", user.uid, "Selected"), {
                    imdbID: movie?.imdbID || series?.imdbID
                });
            } catch (e) {
                alert("Error adding document: ", e);
            }
        } else {
            alert("You are not signed in")
        }
    }

    async function removeFromSelected() {
        const user = auth.currentUser;
        const q = query(collection(db, "users", user.uid, "Selected"), where("imdbID", "==", movie?.imdbID || series?.imdbID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
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
                    {isSelected ?
                        <Remove onClick={removeFromSelected} />
                        :
                        <Add onClick={addToSelected} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Movie;

