import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/movieThunk";

const MovieItem = ({ movie, onView }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>{movie.format}</td>
      <td>
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => onView(movie)}
        >
          View
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => dispatch(deleteMovie(movie.id))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieItem;
