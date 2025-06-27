import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../redux/moviesSlice";
import MovieItem from "./MovieItem";
import AddMovie from "./AddMovie";

const DisplayMovie = () => {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movies) || {};
  const movies = moviesState.items || [];
  const isLoading = moviesState.isLoading;
  const error = moviesState.error;

  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <h2>Movies</h2>
      <button onClick={() => setShowModal(true)}>Add Movie</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        movies.length > 0
          ? movies.map((m) => <MovieItem key={m.id || `${m.title}-${m.year}`} movie={m} />)
          : <p>No movies</p>
      )}

      {/* {showModal && (
        <AddMovie closeModal={() => setShowModal(false)} />
      )} */}
      {showModal && (
  <div className="modal-backdrop" onClick={() => setShowModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={() => setShowModal(false)}>
        ✖
      </button>
      <AddMovie closeModal={() => setShowModal(false)} />
    </div>
  </div>
)}
    </div>
  );
};

export default DisplayMovie;