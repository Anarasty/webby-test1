import { createAsyncThunk } from "@reduxjs/toolkit";
import {MOVIES_API_SORTED, MOVIES_API, IMPORT_API} from '../api_const'

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch(
      `${MOVIES_API_SORTED}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch movies");
    const data = await res.json();
    return data.data;
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch(`${MOVIES_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(movieData),
    });
    if (!res.ok) throw new Error("Failed to add movie");
    const data = await res.json();

    await thunkAPI.dispatch(fetchMovies());

    console.log("Added movie response:", data);
    return data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await fetch(`${MOVIES_API}/${movieId}`, {
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
    const res = await fetch(`${MOVIES_API}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch movie details");
    const data = await res.json();
    return data.data;
  }
);

export const importMovies = createAsyncThunk(
    "movies/importMovies",
    async (file, thunkAPI) => {
      const token = thunkAPI.getState().auth.token;
      const formData = new FormData();
      formData.append("movies", file, file.name);
  
      const res = await fetch(`${IMPORT_API}`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
  
      const result = await res.json();
  
      if (!res.ok || result.status === 0) {
        throw new Error(result?.error?.message || "Import failed");
      }
  
      await thunkAPI.dispatch(fetchMovies());
  
      return result;
    }
  );