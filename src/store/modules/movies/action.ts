import { createAsyncThunk } from '@reduxjs/toolkit';
import { moviesApi } from 'apis/movies';

export const fetchSearchMovies = createAsyncThunk('movies/searchMovies', async (query?: string) => {
  const res = await moviesApi.searchMovies(query);
  return res?.data?.results;
});
