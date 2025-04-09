// useMovies.js
import { useState, useEffect } from "react";

function useMovies(initialMovies = []) {
  const [movies, setMovies] = useState(initialMovies);
  const [filter, setFilter] = useState({ title: "", rating: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Simuler un chargement asynchrone initial
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simule 1 seconde de chargement
    return () => clearTimeout(timer);
  }, []);

  // Ajouter un film avec validation
  const addMovie = (newMovie) => {
    // Validation
    if (!newMovie.title || newMovie.title.trim() === "") {
      return { error: "Le titre est requis." };
    }
    if (
      !newMovie.rating ||
      isNaN(newMovie.rating) ||
      newMovie.rating < 0 ||
      newMovie.rating > 10
    ) {
      return { error: "La note doit être entre 0 et 10." };
    }
    // Validation de l'URL (simple regex pour vérifier si c'est une URL valide)
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i;
    if (newMovie.posterURL && !urlPattern.test(newMovie.posterURL)) {
      return {
        error:
          "L’URL de l’affiche doit être une image valide (png, jpg, etc.).",
      };
    }

    setIsLoading(true);
    setTimeout(() => {
      setMovies((prev) => [
        ...prev,
        {
          ...newMovie,
          rating: parseFloat(newMovie.rating),
          posterURL:
            newMovie.posterURL ||
            "https://via.placeholder.com/200x300?text=Aucune+image",
        },
      ]);
      setIsLoading(false);
    }, 500); // Simule un délai d'ajout
    return { error: null };
  };

  // Mettre à jour les filtres
  const updateFilter = (newFilter) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilter((prev) => ({ ...prev, ...newFilter }));
      setIsLoading(false);
    }, 500); // Simule un délai de filtrage
  };

  // Films filtrés
  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(filter.title.toLowerCase());
    const matchesRating = filter.rating
      ? movie.rating >= parseFloat(filter.rating)
      : true;
    return matchesTitle && matchesRating;
  });

  return { movies, filteredMovies, addMovie, updateFilter, isLoading };
}

export default useMovies;
