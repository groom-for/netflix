import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./MovieModal.css" // ✅ 파일명 오타 수정

/**
 * @typedef {import("../../types/tmdb").MovieModalProps} MovieModalProps
 */

const BASE_URL = "https://image.tmdb.org/t/p/original/"; // ✅ BASE_URL 상수 정의
const TRAILER_DELAY_MS = 3000; // 영상 자동 재생 지연 시간

/**
 * 상세 영화 정보 모달.
 * @param {MovieModalProps} props
 */
const MovieModal = ({
  id,
  backdrop_path,
  poster_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  credits,
  genres,
  release_dates,
  tagline,
  adult,
  content_ratings,
  videos,
  setModalOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const trailerKey =
    videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type?.toLowerCase().includes("trailer") &&
        video.key
    )?.key || "";

  useEffect(() => {
    setShowTrailer(false);
    if (!trailerKey) return;

    const timer = setTimeout(() => setShowTrailer(true), TRAILER_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setShowTrailer(false);
    };
  }, [trailerKey]);

  const handleClose = () => {
    if (typeof setModalOpen === "function") {
      setModalOpen(false);
    }
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleGoToDetail = () => {
    if (!id) return;
    handleClose();
    navigate(`/movie/${id}`);
  };

  const director = getCrewNames(credits, "Director");
  const writers = getCrewNames(credits, "Screenplay");
  const cast = getCastNames(credits);
  const genreNames = getGenreNames(genres);
  const certification = adult
    ? "청소년 관람 불가"
    : getCertification({ release_dates, content_ratings });

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal" onClick={handleClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {/* ✅ props 이름에 맞게 함수명 수정 */}
          <span className="modal-close" onClick={handleClose}>
            X
          </span>

          <div className="modal__videoArea">
            {showTrailer && trailerKey ? (
              <iframe
                title="movie-trailer"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : backdrop_path || poster_path ? (
              <img
                className="modal_poster-img"
                src={`${BASE_URL}${backdrop_path || poster_path}`}
                alt="modal__poster-img"
                loading="lazy"
              />
            ) : (
              <div className="modal__placeholder">재생 가능한 영상이 없습니다.</div>
            )}
          </div>

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span><span className="space"> </span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
            <div className="modal__detail-list">
              <DetailRow label="감독" value={director} />
              <DetailRow label="출연" value={cast} />
              <DetailRow label="각본" value={writers} />
              <DetailRow label="장르" value={genreNames} />
              <DetailRow label="영화 특징" value={tagline} />
              <DetailRow label="관람 등급" value={certification} />
            </div>
            {id && (
              <button className="modal__detail-button" onClick={handleGoToDetail}>
                자세히 보기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function DetailRow({ label, value }) {
  return (
    <p className="modal__detail-row">
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

function getCertification({ release_dates, content_ratings }) {
  const release = release_dates?.results?.find(
    (item) => item.iso_3166_1 === "KR" || item.iso_3166_1 === "US"
  );
  const certification = release?.release_dates?.[0]?.certification;
  if (certification) return certification;

  const rating = content_ratings?.results?.find(
    (item) => item.iso_3166_1 === "KR" || item.iso_3166_1 === "US"
  )?.rating;
  return rating || "정보 없음";
}

export default MovieModal; 
