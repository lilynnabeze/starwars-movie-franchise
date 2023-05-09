// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Logo } from "./components/Header";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";

function App() {
  return (
    <div>
      <Header>
        <Logo />
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
