import { useCallback } from 'react';
import { generateMaze } from 'src/features/mazeGeneration/js/mazeGeneration';
import { create_maze } from 'src/features/mazeGeneration/wasm/maze_generation';
import { USING_WASM } from '../constants';
import { postMeasurement } from '../network/postMeasurement';
import { useAppSelector } from '../state/hooks';
import { WasmModule } from '../types/WasmModule';

export const useGenerateMaze = () => {
  const { initialized } = useAppSelector((state) => state.wasm);
  return useCallback(
    async (cols: number, rows: number) => {
      let maze: number[] = [];
      const isWasm = USING_WASM; // && initialized.includes(WasmModule.mazeGeneration);
      window.performance.mark('start');
      for (let i = 0; i < 10; i++) {
        try {
          if (isWasm) {
            maze = Array.from(create_maze(cols, rows));
          } else maze = generateMaze(cols, rows);
        } catch (e: any) {
          throw e;
        }
        if (maze.length > 0) break;
      }
      const measurement = window.performance.measure(WasmModule.mazeGeneration, 'start');
      await postMeasurement({
        feature: WasmModule.mazeGeneration,
        isWasm,
        time: measurement.duration,
        timestamp: new Date(),
        height: rows,
        width: cols,
      });
      return maze;
    },
    [initialized]
  );
};
