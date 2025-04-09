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
    active: 0,
  };
  try {
    const todos = localStorage.getItem("todos");
    if (todos) return JSON.parse(todos);
    else return defaultState;
  } catch {
    return defaultState;
  }
};

const saveTodosToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const slice = store.getState().todosSlice;
  localStorage.setItem("todos", JSON.stringify(slice));

  return result;
};

export default saveTodosToLocalStorage;
