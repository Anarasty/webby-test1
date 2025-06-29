import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMovies,
  addMovie,
  deleteMovie,
  fetchMovieById,
} from "./movieThunk";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    selectedMovie: null,
  },
  reducers: {
    importMovies: (state, action) => {
      state.items.push(...action.payload);
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          format: movie.format,
        }));
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.items = state.items.filter((m) => m.id !== action.payload);
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        const m = action.payload;
        state.selectedMovie = {
          id: m.id,
          title: m.title,
          year: m.year,
          format: m.format,
          actors: Array.isArray(m.actors) ? m.actors.map((a) => a.name) : [],
        };
      });
  },
});

export const { importMovies, clearSelectedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;

export { fetchMovies, addMovie, deleteMovie, fetchMovieById };