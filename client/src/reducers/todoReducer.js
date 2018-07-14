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
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.todos
      };
    case 'SET_COMPLETED':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if(todo._id === action.todo._id) {
            return action.todo;
          }
          return todo;
        })
      };
    case 'GET_TODO':
      return {
        ...state,
        todo: action.todo
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          action.todo,
          ...state.todos
        ]
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todo: {}
      }
    case 'CLEAR_TODO':
      return {
        ...state,
        todo: {}
      };
    case 'REMOVE_TODO': 
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.id),
        todo: state.todo._id === action.id ? {} : state.todo 
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