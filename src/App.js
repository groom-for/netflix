import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
