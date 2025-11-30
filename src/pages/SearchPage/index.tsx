import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import SearchResults from "../../components/SearchResults.js";
import MovieModal from "../../components/MovieModal/MovieModal.jsx";
import useDebounce from "../../hooks/useDebounce";
import { TmdbMovie } from "../../types/tmdb";
const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const query = useQuery();
  const searchTerm = query.get("q") ?? "";
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
  }>({ loading: false, error: null });
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setSearchResults([]);
      setStatus({ loading: false, error: null });
      return;
    }

    let cancelled = false;

    const fetchSearchMovie = async () => {
      setStatus({ loading: true, error: null });
      try {
        const response = await axios.get(
          `/search/multi?include_adult=false&query=${encodeURIComponent(
            debouncedSearchTerm
          )}`
        );
        if (!cancelled) {
          setSearchResults(response.data.results || []);
          setStatus({ loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setStatus({
            loading: false,
            error: "검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          });
        }
      }
    };

    fetchSearchMovie();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm]);

  return (
    <div className="search-page">
      <SearchResults
        searchTerm={searchTerm}
        results={searchResults}
        isLoading={status.loading}
        error={status.error}
        onSelect={async (movie) => {
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
          } catch (error) {
            setStatus({
              loading: false,
              error: "영화 정보를 불러오지 못했습니다.",
            });
          }
        }}
        hasSearched={Boolean(searchTerm.trim())}
      />

      {selectedMovie && (
        <MovieModal
          {...(selectedMovie as TmdbMovie)}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;

function getMediaType(item: TmdbMovie) {
  if (item.media_type === "tv") return "tv";
  if (item.media_type === "movie") return "movie";
  if (item.first_air_date && !item.release_date) return "tv";
  return "movie";
}
