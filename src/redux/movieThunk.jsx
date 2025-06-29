import { createAsyncThunk } from "@reduxjs/toolkit";
import {MOVIES_API_SORTED, MOVIES_API} from '../api_const'

// const MOVIES_API_URL = process.env.REACT_APP_MOVIES_API;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    // const res = await fetch("http://localhost:8000/api/v1/movies?limit=500", {
    // console.log("MOVIES_API_URL:", MOVIES_API_URL);
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
