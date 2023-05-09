import { useState, useEffect } from "react";
import deathStar from "../assets/death-star.png";
import axios from "axios";
import MovieDetails from "../components/MovieDetails";

function Movie() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/films/`);
        setData(response.data);
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
        {data && <MovieDetails data={data} />}
      </div>
    </div>
  );
}

export default Movie;
