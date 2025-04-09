// Filter.js
import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");

  const handleFilter = () => {
    onFilterChange({ title, rating });
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Filtrer par titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Filtrer par note (0-10)"
        min="0"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button
        onClick={handleFilter}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Filtrer
      </button>
    </div>
  );
}

export default Filter;
