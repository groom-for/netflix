import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Banner from "./components/Banner";

const Layout = () => {
  return (
    <div>
<<<<<<< HEAD
     
=======
      <Nav />

      <Banner />
>>>>>>> 237e2e6713f5ffa1b392fa81d8f00f9e6cb374bd

    </div>
  );
};
function App() {
  return (
<<<<<<< HEAD
    
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 237e2e6713f5ffa1b392fa81d8f00f9e6cb374bd
}

export default App;
