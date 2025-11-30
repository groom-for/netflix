import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests.js";
import "./Banner.css";
import MovieModal from "./MovieModal/MovieModal.jsx";
import { TmdbMovie } from "../types/tmdb";

const MIN_OVERVIEW_LENGTH = 40;

export default function Banner() {
  const [movie, setMovie] = useState<TmdbMovie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * TMDB 상영 중 데이터에서 조건을 만족하는 영화만 남기고,
   * 실제 트레일러가 있는 항목을 선택한다.
   */
  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);
    /** @type {TmdbMovie[]} */
    const results = request.data.results || [];

    const candidates = results.filter(
      /** @param {TmdbMovie} item */
      (item: TmdbMovie) =>
        item?.backdrop_path &&
        item?.overview &&
        item.overview.trim().length >= MIN_OVERVIEW_LENGTH
    );

    if (!candidates.length) {
      setMovie(null);
      return;
    }

    /** @type {TmdbMovie[]} */
    const pool = [...candidates];
    while (pool.length) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      const [picked] = pool.splice(randomIndex, 1);
      if (!picked) continue;

      const detailResponse = await axios.get(`movie/${picked.id}`, {
        params: { append_to_response: "videos,credits,release_dates" },
      });
      const detail = /** @type {TmdbMovie} */ detailResponse.data;

      const hasVideos = (detail.videos?.results || []).length > 0;
      if (hasVideos && detail.backdrop_path && detail.overview) {
        setMovie(detail);
        return;
      }
    }

    // 모든 후보가 트레일러를 갖고 있지 않은 경우: 첫 후보라도 사용
    const fallback = candidates[0];
    if (fallback) {
      const fallbackResponse = await axios.get(`movie/${fallback.id}`, {
        params: { append_to_response: "videos,credits,release_dates" },
      });
      const fallbackDetail = /** @type {TmdbMovie} */ fallbackResponse.data;
      setMovie(fallbackDetail);
    }
  };

  /**
   * @param {string} str
   * @param {number} n
   */
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const trailerKey = movie?.videos?.results?.[0]?.key || "";
  const hasVideo = Boolean(trailerKey);
  const backgroundImage = movie?.backdrop_path
    ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
    : undefined;

  if (!movie) {
    return null;
  }

  const handlePlay = () => {
    if (!hasVideo) return;
    setIsPlaying(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <header
      className="banner"
      style={{
        backgroundImage,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      {isPlaying && (
        <div
          className="banner__videoWrapper"
          onClick={() => setIsPlaying(false)}
          role="button"
          aria-label="영상 닫기"
        >
          <iframe
            className="banner__video"
            src={`https://www.youtube.com/embed/${
              trailerKey || "dQw4w9WgXcQ"
            }?controls=1&autoplay=1&loop=1&mute=1&playlist=${
              trailerKey || "dQw4w9WgXcQ"
            }`}
            title="Banner trailer"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="banner--fadeTop" />
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <h1 className="banner__description">
          {truncate(movie.overview ?? "", 100)}
        </h1>

        <div className="banner__buttons">
          <button
            className="banner__button play"
            onClick={handlePlay}
            disabled={!hasVideo}
            title={!hasVideo ? "재생 가능한 영상이 없습니다" : "재생"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 24 24"
              data-icon="PlayStandard"
              aria-hidden="true"
            >
              <path
                d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                fill="currentColor"
              ></path>
            </svg>
            재생
          </button>
          <button className="banner__button info" onClick={handleOpenModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 24 24"
              data-icon="CircleIStandard"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                fill="white"
              ></path>
            </svg>
            상세 정보
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom" />

      {isModalOpen && <MovieModal {...movie} setModalOpen={setIsModalOpen} />}
    </header>
  );
}
