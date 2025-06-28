import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/moviesSlice";

const MovieItem = ({ movie, onView }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{movie.id}</td>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>{movie.format}</td>
      <td>{movie.actors?.length ? movie.actors.join(", ") : "No actors listed"}</td>
      <td className="movie-actions">
        <button onClick={() => onView(movie)}>View</button>{" "}
        <button onClick={() => dispatch(deleteMovie(movie.id))}>Delete</button>
      </td>
    </tr>
  );
};

export default MovieItem;

