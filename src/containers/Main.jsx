import React, { useEffect } from 'react';
import MovieCards from '../components/MovieCards';
import MovieInfo from '../components/MovieInfo';
import axios from 'axios';
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  BrowserRouter,
} from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/userReducer';
import Navbar from '../components/Navbar';

export default function Main() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    axios
      .get('/api/me')
      .then((res) => res.data)
      .then((user) => {
        dispatch(getUser(user));
        console.log('MAIN user loggedIn ->', user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/home" component={MovieCards} />
        <Route exact path="/movies" component={MovieCards} />
        <Route exact path="/movies/:id" component={MovieInfo} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/" component={MovieCards} />
      </Switch>
      {/* </BrowserRouter> */}
    </React.Fragment>
  );
}
