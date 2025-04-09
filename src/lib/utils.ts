import { TodosSlice } from "@/types";
import { Middleware } from "@reduxjs/toolkit";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadTodosFromLocalStorage = () => {
  const defaultState: TodosSlice = {
    todos: [],
  };
  try {
    const todos = localStorage.getItem("todos");
    if (todos) defaultState.todos = JSON.parse(todos);
    return defaultState;
  } catch (error) {
    return defaultState;
  }
};

const saveTodosToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const slice = store.getState().todosSlice;
  localStorage.setItem("todos", JSON.stringify(slice.todos));

  return result;
};

export default saveTodosToLocalStorage;
