/**
 * Typed representation of the movie/video payloads returned by the TMDB API.
 * 이 파일은 JavaScript 컴포넌트에서도 JSDoc import type을 통해 재사용할 수 있는
 * 공통 타입 소스를 제공하기 위해 작성되었습니다.
 */

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
  published_at?: string;
}

export interface TmdbVideosPayload {
  results: TmdbVideo[];
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbCastMember {
  id: number;
  name: string;
  character?: string;
}

export interface TmdbCrewMember {
  id: number;
  name: string;
  job?: string;
}

export interface TmdbCredits {
  cast?: TmdbCastMember[];
  crew?: TmdbCrewMember[];
}

export interface TmdbReleaseDateEntry {
  iso_3166_1: string;
  release_dates?: Array<{
    certification?: string;
  }>;
}

export interface TmdbMovie {
  id: number;
  name?: string;
  title?: string;
  original_name?: string;
  original_title?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  production_countries?: { iso_3166_1: string }[];
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
  media_type?: "movie" | "tv" | "person";
  original_language?: string;
  genre_ids?: number[];
  videos?: TmdbVideosPayload;
  credits?: TmdbCredits;
  genres?: TmdbGenre[];
  release_dates?: { results?: TmdbReleaseDateEntry[] };
  tagline?: string;
  content_ratings?: {
    results?: Array<{
      iso_3166_1: string;
      rating?: string;
    }>;
  };
}

export interface FetchMoviesResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface RowProps {
  title: string;
  fetchUrl: string;
  id: string;
  isLargeRow?: boolean;
}

export type MovieModalProps = Pick<
  TmdbMovie,
  | "backdrop_path"
  | "poster_path"
  | "title"
  | "overview"
  | "name"
  | "release_date"
  | "first_air_date"
  | "vote_average"
  | "credits"
  | "genres"
  | "release_dates"
  | "content_ratings"
  | "tagline"
  | "adult"
  | "videos"
  | "id"
> & {
  setModalOpen?: (open: boolean) => void;
  onClose?: () => void;
};

export interface RequestsMap {
  fetchNowPlaying: string;
  fetchNetflixOriginals: string;
  fetchTrending: string;
  fetchTopRated: string;
  fetchActionMovies: string;
  fetchComedyMovies: string;
  fetchHorrorMovies: string;
  fetchRomanceMovies: string;
  fetchDocumentaries: string;
  fetchKidsFriendly: string;
}
