import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function MovieDetails({ data }) {
  const [details, setDetails] = useState("");
  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    const moviesInfo = data.results.find(
      (movieInfo) => movieInfo.episode_id === Number(id)
    );
    if (moviesInfo) {
      setDetails(moviesInfo);
    }
  }, [id]);

  return <div>{details.title}</div>;
}
