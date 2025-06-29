import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/movieThunk";
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

      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h3 className="mb-4">Add New Movie</h3>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Year</label>
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="1950 - 2020"
          required
          type="number"
          className="form-control"
          min="1950"
          max="2020"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="form-select"
        >
          <option value="VHS">VHS</option>
          <option value="DVD">DVD</option>
          <option value="Blu-Ray">Blu-Ray</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label">Actors</label>
        <input
          value={actors}
          onChange={(e) => setActors(e.target.value)}
          placeholder="Actors (comma separated)"
          required
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary me-2">
        Save
      </button>
      <button type="button" onClick={closeModal} className="btn btn-secondary">
        Cancel
      </button>
    </form>
  );
};

export default AddMovie;
