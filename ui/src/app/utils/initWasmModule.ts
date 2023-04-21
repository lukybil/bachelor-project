import { createAsyncThunk } from '@reduxjs/toolkit';
import initImageResize from 'src/features/imageResize/wasm/resize_image';
import initMazeGeneration from 'src/features/mazeGeneration/wasm/maze-generation';
import { WasmModule } from '../types/WasmModule';

export const initWasmModule = createAsyncThunk(
  'initWasmModule',
  async (name: WasmModule): Promise<WasmModule> => {
    console.log('initing', name);
    if (name === WasmModule.mazeGeneration) await initMazeGeneration();
    else if (name === WasmModule.imageResize) await initImageResize();
    return name;
  }
);
