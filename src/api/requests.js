/**
 * TMDB REST endpoint map reused across 여러 컴포넌트.
 * @type {import("../types/tmdb").RequestsMap}
 */
const requests = {
    fetchNowPlaying: "movie/now_playing",
    fetchNetflixOriginals: "/discover/tv?with_networks=213",
    fetchTrending: "/trending/all/week",
    fetchTopRated: "/movie/top_rated",
    fetchActionMovies: "/discover/movie?with_genres=28",
    fetchComedyMovies: "/discover/movie?with_genres=35",
    fetchHorrorMovies: "/discover/movie?with_genres=27",
    fetchRomanceMovies: "/discover/movie?with_genres=10749",
    fetchDocumentaries: "/discover/movie?with_genres=99",
    fetchKidsFriendly: "/discover/movie?include_adult=false&certification_country=KR&certification.lte=12&with_release_type=2|3&sort_by=popularity.desc",
}

export default requests;
