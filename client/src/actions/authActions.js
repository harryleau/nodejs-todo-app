import axios from 'axios';
import { getErrors } from './errorActions';
import setToken from '../utils/setToken';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Login User
export const loginUser = (userData, history) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const token = res.headers['x-auth'];
      const user = res.data;

      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);

      dispatch(setCurrentUser(user));

      history.push('/dashboard');
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

// logout user
export const logoutUser = (history) => dispatch => {
  axios.delete('/api/users/logout')
    .then(res => {
      if(res.data.status === 'success') {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        setToken(null);
        dispatch(setCurrentUser({}));
        history.push('/');
      }
    })
    .catch(err => dispatch(getErrors(err.response.data)));
}

// set current user
export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  user
});