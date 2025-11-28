import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Row.css';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import MovieModal from './MovieModal/MovieModal';

/**
 * @typedef {import('../types/tmdb').TmdbMovie} TmdbMovie
 * @typedef {import('../types/tmdb').RowProps} RowProps
 */

const BASE_URL = "https://image.tmdb.org/t/p/original/";
const ADULT_CERTIFICATIONS = new Set([
  "18",
  "18+",
  "19",
  "19+",
  "R-18",
  "R18",
  "R18+",
  "NC-17",
  "X",
  "X18",
]);

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState(
    /** @type {TmdbMovie[]} */([])
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState(
    /** @type {TmdbMovie | null} */(null)
  );

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    const results = request.data.results || [];
    const filtered = [];

    for (const item of results) {
      if (isExcludedTitle(item)) continue;
      if (isUnwantedAnime(item)) continue;
      if (!hasValidImage(item)) continue;
      if (await isRestrictedAnime(item, fetchUrl)) continue;
      filtered.push(item);
    }

    setMovies(filtered);
    return request;
  };

  const handleCardClick = async (movie) => {
    try {
      const type = getMediaType(movie, fetchUrl);
      const appendParam =
        type === "tv"
          ? "videos,credits,content_ratings"
          : "videos,credits,release_dates";
      const { data } = await axios.get(`/${type}/${movie.id}`, {
        params: { append_to_response: appendParam },
      });
      setMovieSelection(data);
      setModalOpen(true);
    } catch (error) {
      console.error("영화 정보를 불러오지 못했습니다.", error);
    }
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            const slider = document.getElementById(id);
            if (slider) slider.scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow"><FaChevronLeft /></span>
        </div>

        <div id={id} className="row__posters">
          {movies?.map((movie) => {
            const imagePath = isLargeRow
              ? movie.poster_path || movie.backdrop_path
              : movie.backdrop_path || movie.poster_path;
            if (!imagePath) return null;

            return (
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${BASE_URL}${imagePath}`}
                loading="lazy"
                alt={movie.title || movie.name || "movie poster"}
                onClick={() => handleCardClick(movie)}
                draggable="false"
                style={{ userSelect: "none", WebkitUserDrag: "none" }}
              />
            );
          })}
        </div>

        <div
          className="slider__arrow-right"
          onClick={() => {
            const slider = document.getElementById(id);
            if (slider) slider.scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow"><FaChevronRight /></span>
        </div>
      </div>

      {
        modalOpen && movieSelected && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )
      }
    </section>
  );
}

function hasValidImage(item) {
  return Boolean(item?.backdrop_path || item?.poster_path);
}

const EXCLUDED_TITLE =
  "学園黙示録 HIGHSCHOOL OF THE DEAD ドリフターズ・オブ・ザ・デッド";

function isExcludedTitle(item) {
  const candidates = [
    item?.title,
    item?.original_title,
    item?.name,
    item?.original_name,
  ];
  return candidates.some((title) => title === EXCLUDED_TITLE);
}

function isJapaneseAnimeCandidate(item) {
  const originCountries = item.origin_country || [];
  const isJapaneseOrigin = originCountries.includes("JP") || item.original_language === "ja";
  const hasAnimationGenre = (item.genre_ids || []).includes(16);
  return isJapaneseOrigin && hasAnimationGenre;
}

function isUnwantedAnime(item) {
  const genreIds = item?.genre_ids || [];
  const hasAnimation = genreIds.includes(16);
  const hasHorror = genreIds.includes(27);
  return Boolean(item?.adult) || (hasAnimation && hasHorror);
}

async function isRestrictedAnime(item, fetchUrl) {
  if (!isJapaneseAnimeCandidate(item)) return false;
  if (item.adult) return true;

  const type = getMediaType(item, fetchUrl);
  try {
    const append = type === "tv" ? "content_ratings" : "release_dates";
    const { data } = await axios.get(`/${type}/${item.id}`, {
      params: { append_to_response: append },
    });
    return hasAdultCertification(data, type);
  } catch (error) {
    console.error("등급 정보를 확인하지 못했습니다.", error);
    return false;
  }
}

function getMediaType(item, fetchUrl) {
  if (item.media_type === "tv") return "tv";
  if (item.media_type === "movie") return "movie";
  if (fetchUrl.includes("/tv")) return "tv";
  if (fetchUrl.includes("/movie")) return "movie";
  if (item.first_air_date && !item.release_date) return "tv";
  return "movie";
}

function hasAdultCertification(detail, type) {
  if (type === "tv") {
    const ratings = detail?.content_ratings?.results || [];
    return ratings.some((entry) => {
      const rating = entry.rating?.toUpperCase().trim();
      return rating && ADULT_CERTIFICATIONS.has(rating);
    });
  }

  const releaseCountries = detail?.release_dates?.results || [];
  return releaseCountries.some((country) =>
    (country.release_dates || []).some((release) => {
      const rating = release.certification?.toUpperCase().trim();
      return rating && ADULT_CERTIFICATIONS.has(rating);
    })
  );
}
