import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: TodosSlice = {
  todos: [],
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: ({ todos }, action: PayloadAction<string>) => {
      todos.push({ id: uuidv4(), text: action.payload, isCompleted: false });
    },
    deleteTodo: ({ todos }, action: PayloadAction<string>) => {
      todos.filter((todo) => todo.id != action.payload);
    },
    completeTodo: () => {},
    clearCompletedTodos: () => {},
    clearAllTodos: () => {},
  },
});

export const { addTodo, deleteTodo, completeTodo, clearAllTodos } =
  todosSlice.actions;

export default todosSlice.reducer;
