import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "./MovieItem";
import AddMovie from "./AddMovie";
import SearchBar from "./UI/SearchBar";
import Modal from "./UI/Modal";

import {
  fetchMovies,
  fetchMovieById,
} from "../redux/movieThunk"; // 🟢 FIXED
import { clearSelectedMovie } from "../redux/moviesSlice"; // 🟢 OK

const DisplayMovie = () => {
  const dispatch = useDispatch();
  const {
    items: movies,
    isLoading,
    error,
    selectedMovie,
  } = useSelector((state) => state.movies);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.actors?.some((actor) => actor.toLowerCase().includes(query))
    );
  });

  return (
    <div className="movie-list-container">
      <h2>Movies</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <button onClick={() => setShowAddModal(true)} className="add-btn">
          Add Movie
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && (
        filteredMovies.length > 0 ? (
          <table className="movie-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Year</th>
                <th>Format</th>
                <th>Actors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((m) => (
                <MovieItem
                  key={m.id || `${m.title}-${m.year}`}
                  movie={m}
                  onView={(movie) => dispatch(fetchMovieById(movie.id))}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No movies found</p>
        )
      )}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <AddMovie closeModal={() => setShowAddModal(false)} />
        </Modal>
      )}

      {selectedMovie && (
        <Modal onClose={() => dispatch(clearSelectedMovie())}>
          <h2>{selectedMovie.title}</h2>
          <p><strong>ID:</strong> {selectedMovie.id}</p>
          <p><strong>Year:</strong> {selectedMovie.year}</p>
          <p><strong>Format:</strong> {selectedMovie.format}</p>
          <p><strong>Actors:</strong> {selectedMovie.actors?.join(", ") || "—"}</p>
        </Modal>
      )}
    </div>
  );
};

export default DisplayMovie;