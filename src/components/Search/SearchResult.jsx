import React from "react";

const SearchResult = ({ data }) => {
  if (!data) return null;

  if (data.length === 0) {
    return <p className="text-danger">No results found.</p>;
  }

  return (
    <div className="mt-3">
      <h5>Results:</h5>
      <ul className="list-group">
        {data.map((movie) => (
          <li key={movie.id} className="list-group-item">
            <strong>{movie.title}</strong> ({movie.year}) — {movie.format}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
