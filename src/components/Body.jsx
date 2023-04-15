import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function Body() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films`)
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`Page not found: Error ${response.status}`);
        // }
        // console.log(response.json() )
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        // setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
console.log(data, 'data')
  return (
    <div>
      <div>{loading && <div>Waiting...</div>}</div>
      <div>{error && <div>{`${error}`}</div>}</div>

      <div>
        <MovieCard data={data} />
      </div>
    </div>
  );
}

export default Body;
