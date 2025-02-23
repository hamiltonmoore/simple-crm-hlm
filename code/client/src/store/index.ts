import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Explicitly use UserState in RootState
export type RootState = { user: UserState };
export type AppDispatch = typeof store.dispatch;