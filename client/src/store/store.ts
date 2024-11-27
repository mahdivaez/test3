import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import formReducer from './slices/formSlice';
import bpmnReducer from './slices/bpmnSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    bpmn: bpmnReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

