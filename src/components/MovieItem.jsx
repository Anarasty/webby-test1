import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/moviesSlice";

const MovieItem = ({ movie }) => {
  console.log("🎬 MovieItem:", movie);

  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <p>ID === {movie.id}</p>
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>Format: {movie.format}</p>
      <p>
        Actors:{" "}
        {movie.actors && movie.actors.length > 0
          ? movie.actors.join(", ")
          : "No actors listed"}
      </p>
      <button onClick={() => dispatch(deleteMovie(movie.id))}>Delete</button>
    </div>
  );
};

export default MovieItem;
