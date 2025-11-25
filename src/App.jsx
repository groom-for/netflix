import React, { useState } from 'react'
import './App.css'
import Nav from './components/Nav.jsx'
import Banner from './components/Banner.jsx'
import { requests } from './api/requests.js'
import Row from './components/Row.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (

      <div className='app'>
        <Nav />
        <Banner />

        <Row 
          title="NETFLIX ORIGINALS"
          id="NO"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow />
        
        <Row title="Trending Now" id="TN" 
        fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
        
        <Row
          title="Action Movies"
          id="AM"
          fetchUrl={requests.fetchActionMovies} />
        <Row
          title="Comedy Movies"
          id="CM"
          fetchUrl={requests.fetchComedyMovies} />
        <Row
          title="Horror Mivies"
          id="HM"
          fetchUrl={requests.fetchHorrorMovies} />
        <Row
          title="Romance Movies"
          id="RM"
          fetchUrl={requests.fetchRomanceMovies} />
        <Row
          title="Documentaries"
          id="DM"
          fetchUrl={requests.fetchDocumentaries} />

        <Footer />
      </div>

  )
}



export default App