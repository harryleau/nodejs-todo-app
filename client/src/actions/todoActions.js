import { getErrors } from './errorActions';
import axios from 'axios';

export const getTodos = () => dispatch => {
  dispatch(setLoading());
  axios.get('/api/todos')
    .then(res => dispatch({
      type: 'GET_TODOS',
      todos: res.data
    }))
    .catch(err => dispatch({
      type: 'GET_TODOS',
      todos: null
    }));
};

export const addTodo = (todoData) => dispatch => {
  axios.post('/api/todos', todoData)
    .then(res => ({
      type: 'ADD_TODO',
      todo: res.data
    }))
    .catch(err => dispatch(getErrors(err.response.data)));
}

export const setLoading = () => ({
  type: 'SET_LOADING'
});