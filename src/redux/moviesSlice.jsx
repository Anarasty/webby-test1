import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Загрузка всех фильмов (список, без нормальных актёров)
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch("http://localhost:8000/api/v1/movies?limit=500", {
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch movies");
    const data = await res.json();
    return data.data; // массив фильмов
  }
);

// Добавление фильма
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch("http://localhost:8000/api/v1/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(movieData),
    });
    if (!res.ok) throw new Error("Failed to add movie");
    const data = await res.json();
    console.log('🔥 Added movie response:', data);
    return data;
  }
);

// Удаление фильма
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch(`http://localhost:8000/api/v1/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) throw new Error("Failed to delete movie");
    return movieId;
  }
);

// ✅ Новый — получить один фильм с актёрами
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch(`http://localhost:8000/api/v1/movies/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch movie details");
    const data = await res.json();
    return data.data;
  }
);

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
          actors: Array.isArray(movie.actors)
            ? movie.actors.map((actor) => actor.name)
            : [],
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
      .addCase(addMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        const movie = action.payload.data;
        state.items.push({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          format: movie.format,
          actors: Array.isArray(movie.actors)
            ? movie.actors.map((actor) => actor.name)
            : [],
        });
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