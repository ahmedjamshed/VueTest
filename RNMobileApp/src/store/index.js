import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todoSlice";
export const store = configureStore({
  reducer: {
    todoSlice: todoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
