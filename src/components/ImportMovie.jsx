import React from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/movieThunk'; // 🟢 FIXED
import { toast } from 'react-toastify';

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
        const lines = block.trim().split('\n');

        let title = '';
        let year = '';
        let format = '';
        let stars = [];

        lines.forEach((line) => {
          if (line.startsWith('Title:')) {
            title = line.replace('Title:', '').trim();
          } else if (line.startsWith('Release Year:')) {
            year = line.replace('Release Year:', '').trim();
          } else if (line.startsWith('Format:')) {
            format = line.replace('Format:', '').trim();
          } else if (line.startsWith('Stars:')) {
            stars = line.replace('Stars:', '').split(',').map((s) => s.trim());
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
        toast.success('Фильмы успешно импортированы');
      } catch (err) {
        toast.error(`Ошибка при импорте: ${err.message}`);
      }
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