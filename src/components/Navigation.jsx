import { BookmarkBorder, Login, Logout, Search, Theaters } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth, provider } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const Navigation = ({ onSearch }) => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [inputValue, setInputValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .catch(error => alert(error.message));
    };

    const handleSignOut = () => {
        signOut(auth)
            .catch((error) => {
                alert(error.message)
            });
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();

        const { data } = await axios.get(`https://www.omdbapi.com/?s=${inputValue}&apikey=2121abfd`);

        if (data.Search) {
            const filteredMovies = [];

            const loadPromises = data.Search.map(movie => new Promise((resolve) => {
                if (!movie.Poster || movie.Poster === 'N/A') {
                    resolve();
                } else {
                    const img = new Image();
                    img.src = movie.Poster;
                    img.onload = function () {
                        if (this.height > 330) {
                            filteredMovies.push(movie);
                        }
                        resolve();
                    };
                }
            }));

            await Promise.all(loadPromises);

            onSearch(filteredMovies.slice(0, 8), inputValue);
        } else {
            onSearch(null, inputValue);
        }

        setLoading(false);
        setInputValue('');
        navigate('/search');
    }

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <div className="navbar">
            <div className="navbar__left-section" onClick={() => navigate('/')}>
                <Theaters />

                <h1 className='navbar__logo-name'>REEL
                    <span style={{ color: '#000' }}>SPOT</span>
                </h1>
            </div>

            <div className='navbar__right-section'>
                <form onSubmit={handleSubmit} className='navbar__search'>
                    <input
                        className='navbar__search-input'
                        type="text"
                        placeholder="Search by title"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={(event) => event.key === "Enter" && handleSubmit(event)}
                    />
                    <button
                        className="navbar__search-btn"
                        type="submit"
                    >
                        {loading ? <FontAwesomeIcon className='navbar__search-spinner' icon={faSpinner} /> : <Search />}
                    </button>
                </form>

                <div className="navbar__profile" onClick={handleClick}>
                    {user ? (
                        <img src={user.photoURL} alt="Profile Picture" className="navbar__profile-img" />
                    ) : (
                        <Avatar style={{ width: 34, height: 34 }} />
                    )}
                </div>


                {
                    isClicked && (
                        <div className="navbar__menu">
                            {!user ? (
                                <div className="navbar__menu-item" onClick={signIn}>
                                    Sign in
                                    <Login />
                                </div>
                            ) : (
                                <div className="navbar__menu-item navbar__menu-item_signout" onClick={handleSignOut}>
                                    Sign out
                                    <Logout />
                                </div>
                            )}
                            <div className="navbar__menu-item" onClick={() => navigate('/selected')}>
                                Selected
                                <BookmarkBorder />
                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Navigation;
