// MovieCard.js
import React from "react";

function MovieCard({ title, description, posterURL, rating }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "200px",
      }}
    >
      <img
        src={posterURL}
        alt={title}
        style={{ width: "100%", height: "auto" }}
      />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Note : {rating}/10</p>
    </div>
  );
}

export default MovieCard;
