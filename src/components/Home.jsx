import React from 'react';
import './Home.css'
import Suggested from './Suggested';

const Home = () => {
    return (
        <div className='home__description'>
            <h1 className='home__title'>
                The largest selection of
                <br />
                <span className='home__title_yellow'>Movies </span>
                &
                <span className='home__title_yellow'> Series</span>
            </h1>
            <p className='home__para'>
                Find and enjoy your <br /> favorite one.
            </p>
            <Suggested />
        </div>
    );
}

export default Home;
