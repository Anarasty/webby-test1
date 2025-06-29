import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control w-50"
      placeholder="Search by title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
