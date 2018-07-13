const intialState = {
  text : '',
  startDate: null,
  endDate: null,
  sortBy: 'deadline',
  showCompleted: true
};

export default (state = intialState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };    
    case 'SORT_BY_STARTDATE':
      return { ...state, sortBy: 'startDate' };
    case 'SORT_BY_DEADLINE':
      return { ...state, sortBy: 'deadline' };
    case 'SHOW_COMPLETED': 
      return { ...state, showCompleted: !state.showCompleted };
    default:
      return state;
  }
};