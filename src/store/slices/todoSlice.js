import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    todosActive: [],
    todosCompleted: [],
    themeType: 'light',

    viewTodos: [],

  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      state.viewTodos = [...state.todos];
    },
    markTodoAsCompleted: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos.find(todo => todo.id === todoId);
      todo.done = !todo.done;
      state.viewTodos = state.todos;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.viewTodos = state.todos;
    },
    clearAllCompletedTodos: (state) => {
      state.todos = state.todos.filter(todo => !todo.done);
      state.viewTodos = state.todos;
    },
    allTodos: (state) => {
      state.todos = state.todos.filter(todo => !todo.done || todo.done);
      state.viewTodos = state.todos;
    },
    activeTodos: (state) => {
      state.todosActive = state.todos.filter(todo => !todo.done);
      state.viewTodos = state.todosActive;
    },
    completeTodos: (state) => {
      state.todosCompleted = state.todos.filter(todo => todo.done);
      state.viewTodos = state.todosCompleted;
    },
    setNewOrder: (state, action) => {
      state.todos = action.payload;
      state.viewTodos = action.payload;
    },
    setLocalStorage: (state, action) => {
      state.todos = action.payload;
      state.viewTodos = action.payload;
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  addTodo,
  markTodoAsCompleted,
  deleteTodo,
  allTodos,
  clearAllCompletedTodos,
  activeTodos,
  completeTodos,
  setNewOrder,
  setLocalStorage,
  themeType
}
  = todoSlice.actions;