import { RootState } from 'store/root-reducer';

export const movieSearchDataSelector = (state: RootState) => state.movie.movies;
export const hasSearchMovieDataSelector = (state: RootState) => state.movie.hasDataSearch;
export const isLoadingSearchMovieSelector = (state: RootState) => state.movie.isLoadingSearch;
