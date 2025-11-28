import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import MovieModal from "../../components/MovieModal/MovieModal.jsx";
import RecommendationGrid from "../../components/RecommendationGrid.jsx";
import "./DetailPage.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    let cancelled = false;

    const fetchMovieDetail = async () => {
      setStatus({ loading: true, error: null });
      try {
        const response = await axios.get(`/movie/${movieId}`, {
          params: {
            append_to_response: "videos,credits,release_dates",
          },
        });
        if (!cancelled) {
          setMovie(response.data);
          setStatus({ loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setStatus({
            loading: false,
            error: "상세 정보를 불러오는 중 오류가 발생했습니다.",
          });
        }
      }
    };

    fetchMovieDetail();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    let cancelled = false;

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/movie/${movieId}/similar`);
        if (!cancelled) {
          const filtered = (response.data.results || []).filter(hasValidImage);
          setRecommendations(filtered);
        }
      } catch (error) {
        console.error("추천 영상을 불러오지 못했습니다.", error);
      }
    };

    fetchRecommendations();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (status.loading) {
    return (
      <div className="detail-page__status">
        상세 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (status.error) {
    return <div className="detail-page__status">{status.error}</div>;
  }

  if (!movie) {
    return (
      <div className="detail-page__status">
        영화를 찾을 수 없습니다.
      </div>
    );
  }

  const director = getCrewNames(movie?.credits, "Director");
  const writers = getCrewNames(movie?.credits, "Screenplay");
  const cast = getCastNames(movie?.credits);
  const genres = getGenreNames(movie?.genres);
  const certification = movie.adult
    ? "청소년 관람 불가"
    : getCertification(movie?.release_dates);

  const handleRecommendationClick = async (rec) => {
    try {
      const { data } = await axios.get(`/movie/${rec.id}`, {
        params: { append_to_response: "videos,credits,release_dates" },
      });
      setSelectedMovie(data);
      setModalOpen(true);
    } catch (error) {
      console.error("추천 콘텐츠 정보를 불러오지 못했습니다.", error);
    }
  };

  return (
    <div className="detail-page">
      {movie.backdrop_path && (
        <img
          className="detail-page__backdrop"
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
        />
      )}
      <div className="detail-page__inner">
        {movie.poster_path && (
          <div className="detail-page__poster">
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={`${movie.title} poster`}
              loading="lazy"
            />
          </div>
        )}
        <div className="detail-page__info">
          <h1 className="detail-page__title">
            {movie.title}{" "}
            {movie.original_title && movie.original_title !== movie.title ? (
              <span>({movie.original_title})</span>
            ) : null}
          </h1>
          <div className="detail-page__meta">
            {movie.release_date && <span>개봉일: {movie.release_date}</span>}
            {movie.runtime ? <span>러닝타임: {movie.runtime}분</span> : null}
            {movie.vote_average ? (
              <span>평점: {movie.vote_average.toFixed(1)}</span>
            ) : null}
          </div>
          <p className="detail-page__overview">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>
          <div className="detail-page__detail-list">
            <DetailRow label="감독" value={director} />
            <DetailRow label="출연" value={cast} />
            <DetailRow label="각본" value={writers} />
            <DetailRow label="장르" value={genres} />
            <DetailRow label="영화 특징" value={movie.tagline} />
            <DetailRow label="관람 등급" value={certification} />
          </div>
        </div>
      </div>

      <section className="detail-page__recommendations">
        <h2>추천 콘텐츠</h2>
        <RecommendationGrid
          movies={recommendations}
          onSelect={handleRecommendationClick}
        />
      </section>

      {modalOpen && selectedMovie && (
        <MovieModal {...selectedMovie} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <p className="detail-page__detail-row">
      <span>{label} :</span> {value || "정보 없음"}
    </p>
  );
}

function getCrewNames(credits, job) {
  return credits?.crew
    ?.filter((member) => member.job === job)
    .map((member) => member.name)
    .join(", ");
}

function getCastNames(credits) {
  return credits?.cast?.slice(0, 5).map((member) => member.name).join(", ");
}

function getGenreNames(genres) {
  return genres?.map((genre) => genre.name).join(", ");
}

function getCertification(release_dates) {
  const release = release_dates?.results?.find(
    (item) => item.iso_3166_1 === "KR" || item.iso_3166_1 === "US"
  );
  const certification = release?.release_dates?.[0]?.certification;
  return certification || "정보 없음";
}

function hasValidImage(item) {
  return Boolean(item?.poster_path || item?.backdrop_path);
}
