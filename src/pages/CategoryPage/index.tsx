import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import MovieGrid from "../../components/MovieGrid.js";
import MovieModal from "../../components/MovieModal/MovieModal.jsx";
import requests from "../../api/requests.js";
import "./CategoryPage.css";
import { TmdbMovie } from "../../types/tmdb";
const CATEGORY_CONFIG = {
  series: { title: "시리즈", fetchUrl: requests.fetchNetflixOriginals },
  movies: { title: "영화", fetchUrl: requests.fetchTopRated },
  games: { title: "게임", fetchUrl: requests.fetchActionMovies },
  new: { title: "NEW! 요즘 대세 콘텐츠", fetchUrl: requests.fetchTrending },
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const config = categoryId
    ? CATEGORY_CONFIG[categoryId as keyof typeof CATEGORY_CONFIG]
    : undefined;
  const [items, setItems] = useState<TmdbMovie[]>([]);
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
  }>({ loading: false, error: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!config?.fetchUrl) return;
    let cancelled = false;

    const fetchCategoryItems = async () => {
      setStatus({ loading: true, error: null });
      try {
        const response = await axios.get(config.fetchUrl);
        if (cancelled) return;
        const results = (response.data.results || []).filter(
          hasDisplayableImage
        );
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

    fetchCategoryItems();
    return () => {
      cancelled = true;
    };
  }, [config?.fetchUrl]);

  const handleSelect = async (movie: TmdbMovie) => {
    if (!movie) return;
    try {
      const type = getMediaType(movie, config?.fetchUrl || "");
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

  if (!config) {
    return (
      <div className="category-page">
        <h1>카테고리를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="category-page">
      <h1>{config.title}</h1>
      {status.loading && (
        <p className="category-page__status">불러오는 중...</p>
      )}
      {status.error && (
        <p className="category-page__status error">{status.error}</p>
      )}
      {!status.loading && !status.error && (
        <MovieGrid items={items} onSelect={handleSelect} />
      )}

      {modalOpen && selectedMovie && (
        <MovieModal
          {...(selectedMovie as TmdbMovie)}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}

function hasDisplayableImage(item: TmdbMovie) {
  return Boolean(item?.backdrop_path || item?.poster_path);
}

function getMediaType(item: TmdbMovie, fetchUrl: string) {
  if (item?.media_type === "tv") return "tv";
  if (item?.media_type === "movie") return "movie";
  if (fetchUrl?.includes("/tv")) return "tv";
  if (fetchUrl?.includes("/movie")) return "movie";
  if (item?.first_air_date && !item?.release_date) return "tv";
  return "movie";
}
