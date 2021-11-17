import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMoviesRequest = createAsyncThunk('GET_MOVIES', (title) => {
  // console.log('tit .>', title);
  return axios
    .get(`http://www.omdbapi.com/?apikey=e06cc121&s=${title}`)
    .then((r) => r.data)
    .catch((e) => console.log(e));
});

export const setMovies = createAction('SET_MOVIES');

export const moviesReducer = createReducer([], {
  [getMoviesRequest.fulfilled]: (state, action) => action.payload,
  [setMovies]: (state, action) => action.payload,
});

export const getMovie = createAsyncThunk('GET_MOVIE', (imdbID) => {
  // console.log('tit .>', title);
  return axios
    .get(`http://www.omdbapi.com/?apikey=e06cc121&i=${imdbID}`)
    .then((r) => r.data)
    .catch((e) => console.log(e));
});

export const setMovie = createAction('SET_MOVIE');

export const movieReducer = createReducer([], {
  [getMovie.fulfilled]: (state, action) => action.payload,
  [setMovie]: (state, action) => action.payload,
});

export default { moviesReducer, movieReducer };
