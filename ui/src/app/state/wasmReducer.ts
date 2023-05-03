import { createSlice } from '@reduxjs/toolkit';
import { WasmModule } from '../types/WasmModule';
import { initWasmModule } from '../utils/initWasmModule';

const initialState = {
  initialized: [],
} as {
  initialized: WasmModule[];
};

export const wasmSlice = createSlice({
  name: 'wasm',
  initialState: initialState,
  reducers: {
    addInitialized: (state, action) => {
      const wasmModule = action.payload;
      const unique = new Set(state.initialized);
      unique.add(wasmModule);
      state.initialized = Array.from(unique);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initWasmModule.pending, (state, action) => {
      const unique = new Set(state.initialized);
      unique.add(action.meta.arg);
      state.initialized = Array.from(unique);
    });
  },
});

export const { addInitialized } = wasmSlice.actions;

export default wasmSlice.reducer;
