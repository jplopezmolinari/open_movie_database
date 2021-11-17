import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { moviesReducer, movieReducer } from './moviesReducer';
import { userReducer } from './userReducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    movies: moviesReducer,
    movie: movieReducer,
    user: userReducer,
  },
});

// Store has all of the default middleware added, _plus_ the logger middleware

export default store;
