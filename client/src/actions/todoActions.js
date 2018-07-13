import { getErrors } from './errorActions';
import moment from 'moment';
import axios from 'axios';

export const getTodos = () => dispatch => {
  dispatch(setLoading());
  return axios.get('/api/todos')
    .then(res => dispatch({
      type: 'GET_TODOS',
      todos: res.data
    }))
    .catch(err => dispatch({
      type: 'GET_TODOS',
      todos: null
    }));
};

export const setTodos = (todos) => ({
  type: 'SET_TODOS',
  todos
});

export const setTodo = (id) => ({
  type: 'SET_TODO',
  id
});

export const addTodo = (todoData) => dispatch => {
  axios.post('/api/todos', todoData)
    .then(res => dispatch({
      type: 'ADD_TODO',
      todo: res.data
    }))
    .catch(err => dispatch(getErrors(err.response.data)));
}

export const removeTodo = (id) => dispatch => {
  axios.delete(`/api/todos/${id}`)
    .then(res => dispatch({
      type: 'REMOVE_TODO',
      id
    }))
    .catch(err => console.log(err));
}

export const setLoading = () => ({
  type: 'SET_LOADING'
});

export const getTodo = (id) => dispatch => {
  axios.get(`/api/todos/${id}`)
    .then(res => dispatch({
      type: 'GET_TODO',
      todo: res.data
    }))
    .catch(err => console.log(err));
};

export const editTodo = (id, todoData) => dispatch => {
  axios.put(`/api/todos/${id}`, todoData)
    .then(res => dispatch({
      type: 'EDIT_TODO',
      todo: res.data
    }))
    .catch(err => dispatch(getErrors(err.response.data)));
};

export const setCompleted = (id, todoData) => dispatch => {
  axios.put(`/api/todos/${id}`, todoData)
    .then(res => dispatch({
      type: 'SET_COMPLETED',
      todo: res.data
    }))
    .catch(err => console.log(err));
}

export const clearTodo = () => ({
  type: 'CLEAR_TODO'
});

export const getTodosByFilters = (todos, { text, startDate, endDate, showCompleted, sortBy }) => {
  return todos.filter(todo => {
    const startDateMatch = moment(todo.createdAt).isSameOrAfter(moment(startDate)) || startDate === null;
    const endDateMatch = moment(todo.deadline).isSameOrBefore(moment(endDate)) || endDate === null;
    const textMatch = todo.text.includes(text) || todo.text === '';
    const showCompletedMatch = !(!showCompleted && todo.completed);

    return startDateMatch && endDateMatch && textMatch && showCompletedMatch;
  }).sort((a, b) => {
    if(sortBy === 'deadline') {
      return moment(a.deadline) - moment(b.deadline);
    } else if(sortBy === 'startDate') {
      return moment(a.createdAt) - moment(b.createdAt);
    }
  });
}