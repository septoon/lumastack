// /app/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './Features/servicesSlice';
import userReducer from './Features/userSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;