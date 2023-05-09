import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Body.css";
import deathStar from "../assets/death-star.png";
import MovieCard from "../components/MovieCard";

function Body() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/films`);
        setData(response.data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="main">
      <div className="loading-container">
        {loading && <img className="loading" src={deathStar} />}
      </div>
      <div className="error-container">
        {error && <div className="error">{`${error}`}</div>}
      </div>

      <div className="movie-card-container">
        {data && <MovieCard data={data} />}
      </div>
    </div>
  );
}

export default Body;
