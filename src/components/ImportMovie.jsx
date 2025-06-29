import React from "react";
import { useDispatch } from "react-redux";
import { importMovies } from "../redux/movieThunk";
import { toast } from "react-toastify";

const ImportMovies = () => {
  const dispatch = useDispatch();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(importMovies(file)).unwrap();
      toast.success("Import successful!");
    } catch (err) {
      toast.error(`Import failed: ${err.message}`);
    }
  };

  return (
    <div>
      <input
        type="file"
        className="form-control"
        accept=".txt"
        onChange={handleFile}
      />
    </div>
  );
};

export default ImportMovies;