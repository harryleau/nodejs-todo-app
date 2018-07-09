import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { getErrors } from './errorActions';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => {
      dispatch(getErrors({}));
      history.push('/login');
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Login User
export const loginUser = (userData, history) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      dispatch(getErrors({}));
      history.push('/dashboard');
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};