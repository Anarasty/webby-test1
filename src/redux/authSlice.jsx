import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Регистрация
export const registerUser = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
  
        if (!res.ok || !result.token) {
          return thunkAPI.rejectWithValue(result.message || 'Registration failed');
        }
  
        return result; // { token }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

// Логин
export const loginUser = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/sessions', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
  
        if (!res.ok || !result.token) {
          return thunkAPI.rejectWithValue(result.message || 'Login failed');
        }
  
        return result; // { token }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    // name: localStorage.getItem('name') || null, // 👈
    isLoading: false,
    error: null,
    mode: 'login', // или 'register'
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    //   state.name = null; // 👈
      localStorage.removeItem('token');
    //   localStorage.removeItem('name'); // 👈
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'login' ? 'register' : 'login';
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => { state.isLoading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        // state.name = action.payload.name; // 👈 берём имя из ответа
        localStorage.setItem('token', action.payload.token);
        // localStorage.setItem('name', action.payload.name); // 👈 пишем в localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, state => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        // state.name = action.payload.name; // 👈
        localStorage.setItem('token', action.payload.token);
        // localStorage.setItem('name', action.payload.name); // 👈
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout, toggleMode } = authSlice.actions;
export default authSlice.reducer;