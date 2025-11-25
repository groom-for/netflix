import React from 'react'
import "./MovieModal.css" // ✅ 파일명 오타 수정

const BASE_URL = "https://image.tmdb.org/t/p/original/"; // ✅ BASE_URL 상수 정의

const MovieModal = ({ // ✅ const 오타 수정
  backdrop_path, // ✅ 오타 수정
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          {/* ✅ props 이름에 맞게 함수명 수정 */}
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            X
          </span>

          {/* ✅ BASE_URL과 backdrop_path 오타 수정 */}
          <img className="modal_poster-img" src={`${BASE_URL}${backdrop_path}`} alt="modal__poster-img" loading="lazy"/>

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span><span className="space"> </span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 