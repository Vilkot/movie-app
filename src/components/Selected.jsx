import React, { useEffect, useState } from 'react';
import './Selected.css';
import undraw_no_data from './assets/undraw_no_data.svg';
import Movie from './Movie';
import { collection, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { auth, db } from './firebase';

const Selected = () => {
    const [selectedMovies, setSelectedMovies] = useState([]);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) {
                const unsubscribeSnapshot = onSnapshot(collection(db, "users", user.uid, "Selected"), async (snapshot) => {
                    const imdbIDs = snapshot.docs.map(doc => doc.data().imdbID);
                    if (imdbIDs.length > 0) {
                        const movies = await Promise.all(imdbIDs.map(async imdbID => {
                            const { data } = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=2121abfd`);
                            return data;
                        }));
                        setSelectedMovies(movies);
                    } else {
                        setSelectedMovies([]);
                    }
                });
                return unsubscribeSnapshot;
            } else {
                setSelectedMovies([]);
            }
        });
    
        return () => {
            unsubscribeAuth();
        };
    }, []);

    return (
        <div className="selected">
            <p className="selected__header">
                {selectedMovies.length !== 0 ? "Your list of selected" : "Your list of selected is empty"}
            </p>
            <div className="selected__movies">
                {selectedMovies.length === 0 ? (
                    <img src={undraw_no_data} className="selected__movies--noData" alt="" />
                ) : (
                    selectedMovies.map((movie) => (
                        <Movie movie={movie} key={movie.imdbID} />
                    ))
                )}

            </div>
        </div>
    );
}

export default Selected;
