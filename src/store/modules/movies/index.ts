import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from 'models/movie';
import { fetchSearchMovies } from './action';

type MovieState = {
  movies: IMovie['results'] | [];
  hasDataSearch?: boolean;
  isLoadingSearch?: boolean;
};

const initialState: MovieState = {
  movies: [],
  hasDataSearch: false,
  isLoadingSearch: true,
};

const { actions, reducer: movieReducer } = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    updateStateSearch: (state, action: PayloadAction<boolean>) => {
      state.hasDataSearch = action.payload;
    },
    clear() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoadingSearch = false;
    });
    builder.addCase(fetchSearchMovies.rejected, (state) => {
      state.movies = [];
      state.isLoadingSearch = false;
    });
  },
});

const movieActions = { ...actions, fetchSearchMovies };

export { movieReducer, movieActions };
