import React from "react";
import "../styles/MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ data }) {
  const CardItem = data.map(
    ({ episode_id, title, release_date, opening_crawl }, index) => {
      return (
        <li key={episode_id} className={`movie-card bg_${index}`}>
          <div className="movie-card-heading">
            <h3 className="title">{title}</h3>
            <p className="release-date">
              {new Date(release_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="opening-crawl">
            {opening_crawl.length > 260
              ? `${opening_crawl.substring(0, 260)}...`
              : opening_crawl}
          </div>
          <hr />
          <div className="more-info-wrapper">
            <Link to={`/movie/${episode_id}`} className="more-info">
              More Info
            </Link>
          </div>
        </li>
      );
    }
  );
  return (
    <div>
      <ul className="movie-card-wrapper">{CardItem}</ul>
    </div>
  );
}

export default MovieCard;
