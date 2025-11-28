import React from "react";
import "./SearchResults.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/**
 * 공통 카드 그리드 레이아웃.
 */
export default function MovieGrid({ items = [], onSelect }) {
  if (!items.length) {
    return (
      <div className="search-results__status">
        <p>표시할 콘텐츠가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="search-results__grid">
      {items.map((movie) => {
        const imagePath = movie?.backdrop_path || movie?.poster_path;
        if (!movie || !imagePath) return null;

        return (
          <button
            type="button"
            key={`${movie.media_type || "item"}-${movie.id}`}
            className="search-card"
            onClick={() => onSelect?.(movie)}
          >
            <img
              src={`${IMAGE_BASE}${imagePath}`}
              alt={movie.title || movie.name}
              loading="lazy"
            />
            <div className="search-card__body">
              <h3>{movie.title || movie.name}</h3>
              {(movie.release_date || movie.first_air_date) && (
                <span>{movie.release_date || movie.first_air_date}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
