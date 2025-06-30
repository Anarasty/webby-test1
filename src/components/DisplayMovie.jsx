import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "./MovieItem";
import AddMovie from "./AddMovie";
import ImportMovies from "./ImportMovie";
import Modal from "./UI/Modal";
import SearchBlock from "../components/Search/SearchBlock";

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

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Movies</h2>

      <SearchBlock />

      <div className="d-flex justify-content-center gap-2 my-4 flex-wrap">
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
        (movies.length > 0 ? (
          <div className="table-responsive">
            <table
              className="table table-striped table-hover mx-auto"
              style={{ minWidth: "600px", maxWidth: "900px" }}
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
                {movies.map((m) => (
                  <MovieItem
                    key={m.id}
                    movie={m}
                    onView={() => dispatch(fetchMovieById(m.id))}
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
