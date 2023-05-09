import React from 'react';
import Movie from './Movie';
import './Search.css';
import undraw from '../undraw_no_data.svg';

const Search = ({ searchResult, inputValue }) => {

    return (
        <div className="search">

            <p className="search__header">
                {!inputValue ? "No request"
                    : !searchResult ? `No results for "${inputValue}"`
                        : `Results for "${inputValue}"`
                }
            </p>
            <div className="search__movies">
                {!searchResult ? (
                    <img src={undraw} className="search__movies--noData" alt="" />
                ) : (
                    searchResult?.map((movie, index) => (
                        <Movie movie={movie} key={index} />
                    ))
                )}

            </div>
        </div>
    );
}

export default Search;
