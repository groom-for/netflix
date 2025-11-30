import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

const sections = [
  {
    title: "NETFLIX ORIGINALS",
    id: "NO",
    fetchUrl: requests.fetchNetflixOriginals,
    isLargeRow: true,
  },
  { title: "Trending Now", id: "TN", fetchUrl: requests.fetchTrending },
  { title: "Top Rated", id: "TR", fetchUrl: requests.fetchTopRated },
  { title: "Action Movies", id: "AM", fetchUrl: requests.fetchActionMovies },
  { title: "Comedy Movies", id: "CM", fetchUrl: requests.fetchComedyMovies },
  { title: "Horror Movies", id: "HM", fetchUrl: requests.fetchHorrorMovies },
  { title: "Romance Movies", id: "RM", fetchUrl: requests.fetchRomanceMovies },
  { title: "Documentaries", id: "DM", fetchUrl: requests.fetchDocumentaries },
];

export default function MainPage() {
  return (
    <>
      <Banner />
      {sections.map((section) => (
        <Row key={section.id} {...section} />
      ))}
    </>
  );
}
