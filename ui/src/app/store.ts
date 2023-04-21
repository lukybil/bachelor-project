import { configureStore } from '@reduxjs/toolkit';
import userReducer from './state/userReducer';
import wasmReducer from './state/wasmReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    wasm: wasmReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
