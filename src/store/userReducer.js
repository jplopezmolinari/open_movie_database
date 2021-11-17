import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('GET_USER', (user) => {
  return user;
});

// export const logoutUser = createAsyncThunk('LOGOUT_USER', () => {
//   return axios
//     .post('http://localhost:3001/api/users/logout')
//     .then((response) => {
//       return response.data;
//     });
// });

export const userReducer = createReducer(
  {},
  {
    [getUser.fulfilled]: (state, action) => action.payload,
  }
  // {
  //   [logoutUser.fulfilled]: (state, action) => {
  //     localStorage.removeItem('user');
  //     state = { ...initialState, loggedIn: false };
  //     return state;
  //   },
  // }
);

export default userReducer;
