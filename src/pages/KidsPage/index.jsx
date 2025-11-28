import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieGrid from "../../components/MovieGrid.jsx";
import MovieModal from "../../components/MovieModal/MovieModal.jsx";
import requests from "../../api/requests.js";
import "./KidsPage.css";

export default function KidsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: null });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchKids = async () => {
      setStatus({ loading: true, error: null });
      try {
        const response = await axios.get(requests.fetchKidsFriendly);
        if (cancelled) return;
        const results = (response.data.results || []).filter(hasDisplayableImage);
        setItems(results);
        setStatus({ loading: false, error: null });
      } catch (error) {
        if (!cancelled) {
          setStatus({
            loading: false,
            error: "콘텐츠를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
          });
        }
      }
    };

    fetchKids();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = async (movie) => {
    if (!movie) return;
    try {
      const type = getMediaType(movie);
      const appendParam =
        type === "tv"
          ? "videos,credits,content_ratings"
          : "videos,credits,release_dates";
      const { data } = await axios.get(`/${type}/${movie.id}`, {
        params: { append_to_response: appendParam },
      });
      setSelectedMovie(data);
      setModalOpen(true);
    } catch (error) {
      setStatus({
        loading: false,
        error: "영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    }
  };

  return (
    <div className="kids-page">
      <h1>키즈 전용 콘텐츠</h1>
      <p>전체관람가 및 12세 이하 관람가 작품을 모아 보여드립니다.</p>
      <h3>키즈 추천</h3>

      {status.loading && <p className="kids-page__status">불러오는 중...</p>}
      {status.error && (
        <p className="kids-page__status kids-page__status--error">{status.error}</p>
      )}
      {!status.loading && !status.error && (
        <MovieGrid items={items} onSelect={handleSelect} />
      )}

      {modalOpen && selectedMovie && (
        <MovieModal {...selectedMovie} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}

function hasDisplayableImage(item) {
  return Boolean(item?.backdrop_path || item?.poster_path);
}

function getMediaType(item) {
  if (item?.media_type === "tv") return "tv";
  if (item?.media_type === "movie") return "movie";
  if (item?.first_air_date && !item?.release_date) return "tv";
  return "movie";
}
