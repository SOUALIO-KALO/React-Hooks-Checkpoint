// MovieList.js
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          description={movie.description}
          posterURL={movie.posterURL}
          rating={movie.rating}
        />
      ))}
    </div>
  );
}

export default MovieList;
