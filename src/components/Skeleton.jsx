import React from 'react';
import './Movie.css';

const Skeleton = () => {
    return (
        <div className="movie">
            <div className="movie__poster--skeleton" />
            <div className="movie__description--skeleton">
                <div className="movie__title--skeleton" />
                <div className="movie__info--wrapper">
                    <div className="movie__type">
                        <div className="movie__type--skeleton" />
                        <div className="movie__year--skeleton" />
                    </div>
                    <div className="movie__link--skeleton" />
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
