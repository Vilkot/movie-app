import { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Search from "./components/Search";
import Footer from "./components/Footer";
import MovieDescription from "./components/MovieDescription";
import ScrollToTop from "./components/ScrollToTop";
import Selected from "./components/Selected";

function App() {
  const [searchResult, setSearchResult] = useState();
  const [inputValue, setInputValue] = useState('');

  function handleSearch(value, input) {
    setSearchResult(value);
    setInputValue(input);
  }

  return (
    <HashRouter>
      <div className="container">
        <ScrollToTop />
        <Navigation onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search searchResult={searchResult} inputValue={inputValue} />} />
          <Route path="/selected" element={<Selected />} />
          <Route path="/movie/:imdbId" element={<MovieDescription />} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
