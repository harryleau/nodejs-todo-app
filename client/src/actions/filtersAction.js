export const setText = (text) => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

export const sortByStartDate = () => ({
  type: 'SORT_BY_STARTDATE'
});

export const sortByDeadline = () => ({
  type: 'SORT_BY_DEADLINE'
});

export const showCompleted = () => ({
  type: 'SHOW_COMPLETED'
});

