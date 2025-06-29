import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "./MovieItem";
import AddMovie from "./AddMovie";
import SearchBar from "./UI/SearchBar";
import ImportMovies from "./ImportMovie";
import Modal from "./UI/Modal";

import { fetchMovies, fetchMovieById } from "../redux/movieThunk";
import { clearSelectedMovie } from "../redux/moviesSlice";

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
    return movie.title.toLowerCase().includes(query);
  });

  return (
    <div className="container my-4">
      <h2 className="mb-4">Movies</h2>

      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-success"
        >
          Add Movie
        </button>

        <ImportMovies />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!isLoading &&
        !error &&
        (filteredMovies.length > 0 ? (
          <div className="table-responsive">
            <table
              className="table table-striped table-hover w-auto"
              style={{ minWidth: "600px", maxWidth: "900px", margin: "0 auto" }}
            >
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Format</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((m) => (
                  <MovieItem
                    key={m.id}
                    movie={m}
                    onView={(movie) => dispatch(fetchMovieById(movie.id))}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No movies found</p>
        ))}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <AddMovie closeModal={() => setShowAddModal(false)} />
        </Modal>
      )}

      {selectedMovie && (
        <Modal onClose={() => dispatch(clearSelectedMovie())}>
          <h2>{selectedMovie.title}</h2>
          <p>
            <strong>ID:</strong> {selectedMovie.id}
          </p>
          <p>
            <strong>Year:</strong> {selectedMovie.year}
          </p>
          <p>
            <strong>Format:</strong> {selectedMovie.format}
          </p>
          <p>
            <strong>Actors:</strong> {selectedMovie.actors?.join(", ") || "—"}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default DisplayMovie;