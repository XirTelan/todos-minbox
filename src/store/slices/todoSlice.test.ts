import { describe, expect, test } from "@jest/globals";
import todosSlice, {
  addTodo,
  changeState,
  clearCompletedTodos,
  deleteTodo,
} from "./todosSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TodosSlice } from "@/types";

const setupStore = (defaultState: TodosSlice) =>
  configureStore({
    reducer: {
      todosSlice,
    },
    preloadedState: {
      todosSlice: defaultState,
    },
  });

describe("Todos Store Tests", () => {
  test("should add a new todo", () => {
    const initialState = { todos: [], active: 0 };

    const store = setupStore(initialState);

    store.dispatch(addTodo("test todo"));

    const newState = store.getState().todosSlice;

    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe("test todo");
    expect(newState.todos[0].isCompleted).toBe(false);
    expect(newState.active).toBe(1);
  });
  test("should change state", () => {
    const initialState = { todos: [], active: 0 };
    const store = setupStore(initialState);

    store.dispatch(addTodo("test todo"));
    let newState = store.getState().todosSlice;
    store.dispatch(changeState(newState.todos[0].id));
    newState = store.getState().todosSlice;

    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe("test todo");
    expect(newState.todos[0].isCompleted).toBe(true);
    expect(newState.active).toBe(0);
  });
  test("delete todo", () => {
    const initialState = { todos: [], active: 0 };
    const store = setupStore(initialState);

    store.dispatch(addTodo("test todo"));
    let newState = store.getState().todosSlice;
    store.dispatch(deleteTodo(newState.todos[0].id));
    newState = store.getState().todosSlice;

    expect(newState.todos).toHaveLength(0);
    expect(newState.active).toBe(0);
  });
  test("should delete only active todo", () => {
    const initialState = { todos: [], active: 0 };
    const store = setupStore(initialState);

    store.dispatch(addTodo("test 1"));
    store.dispatch(addTodo("test 2"));
    store.dispatch(addTodo("test 3"));

    let newState = store.getState().todosSlice;

    store.dispatch(changeState(newState.todos[0].id));
    store.dispatch(changeState(newState.todos[1].id));
    store.dispatch(clearCompletedTodos());

    newState = store.getState().todosSlice;

    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe("test 3");
    expect(newState.todos[0].isCompleted).toBe(false);
    expect(newState.active).toBe(1);
  });
});
