// moviesThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    return data.data;
  }
);

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
    console.log("🔥 Added movie response:", data);
    return data;
  }
);

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