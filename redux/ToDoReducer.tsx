import {ADD_TASK, DELETE_TASK, EDIT_TASK} from './Strings';

const initialState = {
  tasks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks:
          action.index >=0
            ? action.payload
            : [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => item.task !== action.payload),
      };
    default:
      return state;
  }
};
