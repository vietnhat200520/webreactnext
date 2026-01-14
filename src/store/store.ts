import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import courseReducer from './slices/courseSlice';
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
