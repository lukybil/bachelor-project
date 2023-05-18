import { createAsyncThunk } from '@reduxjs/toolkit';
import initImageResize from 'src/features/imageResize/wasm/resize_image';
import initJsonToCsv from 'src/features/jsonToCsv/wasm/wasm_csv_json';
import initMazeGeneration from 'src/features/mazeGeneration/wasm/maze_generation';
import { postMeasurement } from '../network/postMeasurement';
import { WasmModule } from '../types/WasmModule';

export const initWasmModule = createAsyncThunk('initWasmModule', async (name: WasmModule): Promise<WasmModule> => {
  if ([WasmModule.mazeGeneration, WasmModule.imageResize].includes(name)) return name;
  console.log('initing', name);
  window.performance.mark('start');
  if (name === WasmModule.mazeGeneration) {
    await initMazeGeneration();
  } else if (name === WasmModule.imageResize) {
    await initImageResize();
  } else if (name === WasmModule.jsonToCsv) {
    await initJsonToCsv();
  }
  const measurement = window.performance.measure(`init_${name}`, 'start');
  postMeasurement({
    feature: `init_${name}`,
    time: measurement.duration,
    timestamp: new Date(),
  });
  return name;
});
