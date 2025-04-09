// App.js
import React, { useState } from "react";
import MovieList from "./MovieList";
import Filter from "./Filter";
import useMovies from "./useMovies";
import Spinner from "./Spinner";

function App() {
  // Initialisation avec quelques films
  const initialMovies = [
    {
      title: "Inception",
      description: "Un voleur spécialisé dans l'infiltration des rêves.",
      posterURL:
        "https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/72/34/14/19476654.jpg",
      rating: 5.8,
    },
    {
      title: "The Matrix",
      description: "Un hacker découvre la réalité simulée.",
      posterURL:
        "https://th.bing.com/th/id/OIP.ySWxYh_FXsn-gqyMAnJ3bQHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      rating: 8.7,
    },
    {
      title: "Interstellar",
      description:
        "Une équipe d'astronautes explore l'espace pour sauver l'humanité.",
      posterURL:
        "https://th.bing.com/th/id/OIP.CndH96dwahm5jhb7IaS4cwHaHa?w=159&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      rating: 9.6,
    },
  ];

  // Utilisation du Hook personnalisé
  const { filteredMovies, addMovie, updateFilter, isLoading } =
    useMovies(initialMovies);

  // État pour le formulaire
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
  });
  const [error, setError] = useState(null);

  // Gestion des entrées du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
    setError(null); // Réinitialiser l'erreur
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addMovie(newMovie);
    if (result.error) {
      setError(result.error);
    } else {
      setNewMovie({ title: "", description: "", posterURL: "", rating: "" }); // Réinitialiser
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mes Films Préférés</h1>

      {/* Formulaire pour ajouter un film */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newMovie.title}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="posterURL"
          placeholder="URL de l'affiche"
          value={newMovie.posterURL}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="rating"
          placeholder="Note (0-10)"
          min="0"
          max="10"
          step="0.1"
          value={newMovie.rating}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Spinner */}
      {isLoading && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Spinner />
        </div>
      )}

      {/* Filtre */}
      {!isLoading && <Filter onFilterChange={updateFilter} />}

      {/* Liste des films */}
      {!isLoading && filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        !isLoading && <p>Aucun film trouvé.</p>
      )}
    </div>
  );
}

export default App;
