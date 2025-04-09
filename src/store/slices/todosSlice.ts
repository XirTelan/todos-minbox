import { loadTodosFromLocalStorage } from "@/lib/utils";
import { TodosSlice } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: TodosSlice = loadTodosFromLocalStorage();

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: uuidv4(),
        text: action.payload,
        isCompleted: false,
      });
      state.active++;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => {
        if (todo.id === action.payload) {
          if (!todo.isCompleted) {
            state.active--;
          }
          return false;
        }
        return true;
      });
    },
    changeState: (state, action: PayloadAction<string>) => {
      console.log("acst", action.payload);
      const todo = state.todos.find((todo) => todo.id == action.payload);
      if (!todo) return;
      todo.isCompleted = !todo.isCompleted;
      state.active = todo.isCompleted ? --state.active : ++state.active;
    },
    clearCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
      state.active = state.todos.length;
    },
  },
});

export const { addTodo, deleteTodo, changeState, clearCompletedTodos } =
  todosSlice.actions;

export default todosSlice.reducer;
