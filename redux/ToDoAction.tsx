import {ADD_TASK, DELETE_TASK, EDIT_TASK} from './Strings';

export const addTask = (data, editIndex) => {
  return {
    type: ADD_TASK,
    payload: data,
    index: editIndex,
  };
};

export const deleteTask = task => {
  return {
    type: DELETE_TASK,
    payload: task,
  };
};
