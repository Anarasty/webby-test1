import React from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/movieThunk";
import { toast } from "react-toastify";
import { fetchMovies } from "../redux/movieThunk";

const ImportMovies = () => {
  const dispatch = useDispatch();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target.result;
      const movies = [];
      const blocks = content.split(/\n\s*\n/);

      blocks.forEach((block) => {
        const lines = block.trim().split("\n");

        let title = "";
        let year = "";
        let format = "";
        let stars = [];

        lines.forEach((line) => {
          if (line.startsWith("Title:")) {
            title = line.replace("Title:", "").trim();
          } else if (line.startsWith("Release Year:")) {
            year = line.replace("Release Year:", "").trim();
          } else if (line.startsWith("Format:")) {
            format = line.replace("Format:", "").trim();
          } else if (line.startsWith("Stars:")) {
            stars = line
              .replace("Stars:", "")
              .split(",")
              .map((s) => s.trim());
          }
        });

        if (title) {
          movies.push({
            title,
            year: parseInt(year),
            format,
            actors: stars,
          });
        }
      });

      try {
        for (const movie of movies) {
          await dispatch(addMovie(movie)).unwrap();
        }

        await dispatch(fetchMovies());

        toast.success("Import successful");
      } catch (err) {
        toast.error(`Import Error: ${err.message}`);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        className="form-control form-control-sm"
        accept=".txt"
        onChange={handleFile}
        placeholder="test1"
      />
    </div>
  );
};

export default ImportMovies;
