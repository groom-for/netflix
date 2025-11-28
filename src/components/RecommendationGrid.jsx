import React from "react";
import "./SearchResults.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function RecommendationGrid({ movies, onSelect }) {
  const filtered = (movies || []).filter(
    (item) => item && (item.poster_path || item.backdrop_path)
  );

  if (!filtered.length) {
    return <p className="detail-page__status">추천 콘텐츠가 없습니다.</p>;
  }

  return (
    <div className="search-results recommendations-block">
      <div className="search-results__grid">
        {filtered.map((movie) => (
          <button
            type="button"
            key={movie.id}
            className="search-card"
            onClick={() => onSelect?.(movie)}
          >
            <img
              src={`${IMAGE_BASE}${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title || movie.name}
              loading="lazy"
            />
            <div className="search-card__body">
              <h3>{movie.title || movie.name}</h3>
              {movie.release_date && <span>{movie.release_date}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
