import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import requests from "./api/requests.js";
import Row from "./components/Row";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import CategoryPage from "./pages/CategoryPage";
import KidsPage from "./pages/KidsPage";

const HomePage = () => (
  <>
    <Banner />
    <Row
      title="NETFLIX ORIGINALS"
      id="NO"
      fetchUrl={requests.fetchNetflixOriginals}
      isLargeRow
    />
    <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
    <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
    <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
    <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />
    <Row title="Horror Mivies" id="HM" fetchUrl={requests.fetchHorrorMovies} />
    <Row
      title="Romance Movies"
      id="RM"
      fetchUrl={requests.fetchRomanceMovies}
    />
    <Row title="Documentaries" id="DM" fetchUrl={requests.fetchDocumentaries} />
  </>
);

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/movie/:movieId" element={<DetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
