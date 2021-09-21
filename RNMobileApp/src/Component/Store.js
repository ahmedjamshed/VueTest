import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './Counter';
export const store = configureStore({
  reducer: {
    Counter: AuthSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
