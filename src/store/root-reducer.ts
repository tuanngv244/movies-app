import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './modules/auth';
import { movieReducer } from './modules/movies';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
