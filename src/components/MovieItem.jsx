// import React from "react";
// import { useDispatch } from "react-redux";
// import { deleteMovie } from "../redux/movieThunk"; // 🟢 FIXED

// const MovieItem = ({ movie, onView }) => {
//   const dispatch = useDispatch();

//   return (
//     <tr>
//       <td>{movie.id}</td>
//       <td>{movie.title}</td>
//       <td>{movie.year}</td>
//       <td>{movie.format}</td>
//       <td>{movie.actors?.length ? movie.actors.join(", ") : "No actors listed"}</td>
//       <td className="movie-actions">
//         <button onClick={() => onView(movie)}>View</button>{" "}
//         <button onClick={() => dispatch(deleteMovie(movie.id))}>Delete</button>
//       </td>
//     </tr>
//   );
// };

// export default MovieItem;

import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/movieThunk";

const MovieItem = ({ movie, onView }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{movie.id}</td>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>{movie.format}</td>
      <td>{movie.actors?.length ? movie.actors.join(", ") : "No actors listed"}</td>
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