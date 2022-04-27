import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      state.push(action.payload);
    },
    todoUpdated(state, action) {
      const {id, title, start, end, content} = action.payload;
      const existingTodo = state.find(todo => todo.id === id);
      if (existingTodo) {
        if (title) existingTodo.title = title;
        if (start) existingTodo.start = start;
        if (end) existingTodo.end = end;
        if (content) existingTodo.content = content;
      }
    },
    todoDeleted(state, action) {
      return state.filter(todo => todo.id !== action.payload);
    },
    todoCompleted(state, action) {
      const existingTodo = state.find(todo => todo.id === action.payload);
      if (existingTodo) {
        existingTodo.status = 1;
      }
    },
  
  },
});
export const {
  todoAdded,
  todoUpdated,
  todoDeleted,
  todoCompleted,
} = todoSlice.actions;
export default todoSlice.reducer;
