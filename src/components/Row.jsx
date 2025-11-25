import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Row.css';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import MovieModal from './MovieModal/MovieModal'; 

const BASE_URL = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow, id}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

useEffect(() => {
  fetchMovieData();
}, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
      <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left" onClick={() => { document.getElementById(id).scrollLeft -= window.innerWidth - 80; }}>
          <span className="arrow"><FaChevronLeft /></span>
        </div>
      
        <div id={id} className="row__posters">
          {movies?.map((movie) => (
            <img key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy" alt={movie.name}
              onClick={() => handleClick(movie)}  />
          ))}
        </div>
        
        <div className="slider__arrow-right" onClick={() => { document.getElementById(id).scrollLeft += window.innerWidth - 80; }}>
          <span className="arrow"><FaChevronRight /></span>
        </div>
      </div>

      { 
        modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen}  />
        )
      }
      </section>
      

  );
};
