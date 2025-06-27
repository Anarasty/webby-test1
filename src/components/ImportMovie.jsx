import React from 'react';
import { useDispatch } from 'react-redux';
import { importMovies } from '../redux/moviesSlice';

const ImportMovies = () => {
  const dispatch = useDispatch();

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const movies = [];
      const blocks = content.split(/\n\s*\n/); // разбиваем по пустой строке

      blocks.forEach(block => {
        const lines = block.trim().split('\n');

        let title = '';
        let year = '';
        let format = '';
        let stars = [];

        lines.forEach(line => {
          if (line.startsWith('Title:')) {
            title = line.replace('Title:', '').trim();
          } else if (line.startsWith('Release Year:')) {
            year = line.replace('Release Year:', '').trim();
          } else if (line.startsWith('Format:')) {
            format = line.replace('Format:', '').trim();
          } else if (line.startsWith('Stars:')) {
            stars = line.replace('Stars:', '').split(',').map(s => s.trim());
          }
        });

        if (title) {
          movies.push({
            title,
            year,
            format,
            actors: stars
          });
        }
      });

      dispatch(importMovies(movies));
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h3>Импорт фильмов из TXT</h3>
      <input type="file" accept=".txt" onChange={handleFile} />
    </div>
  );
};

export default ImportMovies;