const initialState = {
  todos: [],
  todo: {},
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.todos,
        loading: false
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todo
        ]
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    default: 
      return state;
  }
};