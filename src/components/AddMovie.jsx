import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/moviesSlice";
import { toast } from "react-toastify";

const AddMovie = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [format, setFormat] = useState("DVD");
  const [actors, setActors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        addMovie({
          title,
          year: parseInt(year),
          format,
          actors: actors.split(",").map((a) => a.trim()),
        })
      ).unwrap();

      toast.success("Movie added!");
      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h3>Add New Movie</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required type="number" />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option>VHS</option>
        <option>DVD</option>
        <option>Blu-ray</option>
      </select>
      <input
        value={actors}
        onChange={(e) => setActors(e.target.value)}
        placeholder="Actors (comma separated)"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddMovie;