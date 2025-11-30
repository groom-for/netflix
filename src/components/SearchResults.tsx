import "./SearchResults.css";
import MovieGrid from "./MovieGrid.jsx";
import { TmdbMovie } from "../types/tmdb";

interface SearchResultsProps {
  searchTerm: string;
  results: TmdbMovie[];
  isLoading: boolean;
  error: string | null;
  onSelect: (movie: TmdbMovie) => void;
  hasSearched: boolean;
}
/**
 * 2열 그리드 검색 결과 영역.
 */
export default function SearchResults({
  searchTerm,
  results,
  isLoading,
  error,
  onSelect,
  hasSearched,
}: SearchResultsProps) {
  const filteredResults = (results || []).filter(
    (item) =>
      item &&
      item.media_type !== "person" &&
      (item.poster_path || item.backdrop_path)
  );

  let content = null;

  if (!hasSearched) {
    content = <p className="search-results__status">검색어를 입력해 주세요.</p>;
  } else if (isLoading) {
    content = <p className="search-results__status">검색 중입니다...</p>;
  } else if (error) {
    content = <p className="search-results__status">{error}</p>;
  } else if (!filteredResults.length) {
    content = (
      <div className="search-results__status">
        <p>관련 영화가 없습니다.</p>
        <small>다른 키워드를 입력하거나 철자를 확인해 주세요.</small>
      </div>
    );
  } else {
    content = <MovieGrid items={filteredResults} onSelect={onSelect} />;
  }

  return (
    <div className="search-results">
      <h2 className="search-results__title">
        {hasSearched ? `"${searchTerm}" 검색 결과` : "콘텐츠 검색"}
      </h2>
      {content}
    </div>
  );
}
