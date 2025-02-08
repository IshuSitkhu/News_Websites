import React, { useState } from "react";//STATE HOOKS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";//REACT ROUTER for navigation between diferent paeges.
import LoadingBar from "react-top-loading-bar";//LOADINGBAR for a progress indicator
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import About from "./components/About";
import Navbar from "./components/Navbar";

const App = () => {
  const [progress, setProgress] = useState(0);//track for a loading bar
  const [category, setCategory] = useState("general");//track currently selected news category

  const updateProgress = (value) => {
    setProgress(value); //Updates the progress state. It’s passed as a prop to NewsList to dynamically update the loading bar while fetching news.
  };

  return (
    <Router>
      <LoadingBar color="#f11946" progress={progress} />
      <Navbar setCategory={setCategory} />
      <div className="container">
        <Routes>
          <Route path="/" element={<NewsList category={category} onProgress={updateProgress} />} />
          <Route path="/about" element={<About />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
