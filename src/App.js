import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Banner from "./components/Banner";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Banner />

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
