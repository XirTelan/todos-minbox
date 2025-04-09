import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";
import saveTodosToLocalStorage from "@/lib/utils";

export const store = configureStore({
  reducer: {
    todosSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveTodosToLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
