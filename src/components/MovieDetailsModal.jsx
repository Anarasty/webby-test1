import React from "react";
// import "./MovieDetailsModal.css"; // создадим стили отдельно

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{movie.title}</h2>
        <p><strong>ID:</strong> {movie.id}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Format:</strong> {movie.format}</p>
        <p><strong>Actors:</strong> {movie.actors?.join(", ") || "—"}</p>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
