import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import deathStar from "../assets/death-star.png";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const [details, setDetails] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieId = id.split("/").filter(Boolean).pop(); // Extract the number from the URL

        const response = await fetch(`https://swapi.dev/api/films/${movieId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const movieData = await response.json();
        setDetails(movieData);

        // Fetch characters
        const characterPromises = movieData.characters.map((characterUrl) =>
          fetch(characterUrl).then((response) => response.json())
        );
        const charactersData = await Promise.all(characterPromises);
        setCharacters(charactersData);

        // Fetch planets
        const planetPromises = movieData.planets.map((planetUrl) =>
          fetch(planetUrl).then((response) => response.json())
        );
        const planetsData = await Promise.all(planetPromises);
        setPlanets(planetsData);

        // Fetch starships
        const starshipPromises = movieData.starships.map((starshipUrl) =>
          fetch(starshipUrl).then((response) => response.json())
        );
        const starshipsData = await Promise.all(starshipPromises);
        setStarships(starshipsData);

        // Fetch species
        const speciesPromises = movieData.species.map((speciesUrl) =>
          fetch(speciesUrl).then((response) => response.json())
        );
        const speciesData = await Promise.all(speciesPromises);
        setSpecies(speciesData);

        // Fetch vehicles
        const vehiclePromises = movieData.vehicles.map((vehicleUrl) =>
          fetch(vehicleUrl).then((response) => response.json())
        );
        const vehiclesData = await Promise.all(vehiclePromises);
        setVehicles(vehiclesData);

        setIsLoading(false); // Set loading state to false once all data is fetched
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading || !details) {
    return (
      <div className="loading-container">
        {<img className="loading" src={deathStar} />}
      </div>
    );
  }

  return (
    <div className="moreinfo-container">
      <Link to={"/"} className="backhome-container">
        &larr; Back to List
      </Link>

      <div className="details-container">
        <div className="heading">
          <h1 className="movie-title">{details.title}</h1>
          <p>Director: {details.director}</p>
          <p>Producer: {details.producer}</p>
        </div>
        <div className="description-container">
          <h3 className="info-title">Description</h3>
          <p>{details.opening_crawl}</p>
        </div>
      </div>

      <div className="characters-container">
        <h3 className="info-title">Characters</h3>
        <ul className="info-wrapper">
          {characters.map((character) => (
            <li key={character.url}>{character.name}</li>
          ))}
        </ul>
      </div>

      <div className="planets-container">
        <h3 className="info-title">Planets</h3>
        <ul className="info-wrapper">
          {planets.map((planet) => (
            <li key={planet.url}>{planet.name}</li>
          ))}
        </ul>
      </div>

      <div className="species-container">
        <h3 className="info-title">Species</h3>
        <ul className="info-wrapper">
          {species.map((specie) => (
            <li key={specie.url}>{specie.name}</li>
          ))}
        </ul>
      </div>

      <div className="starships-container">
        <h3 className="info-title">Starships</h3>
        <ul className="info-wrapper">
          {starships.map((starship) => (
            <li key={starship.url}>{starship.name}</li>
          ))}
        </ul>
      </div>

      <div className="vehicles-container">
        <h3 className="info-title">Vehicles</h3>
        <ul className="info-wrapper">
          {vehicles.map((vehicle) => (
            <li key={vehicle.url}>{vehicle.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
