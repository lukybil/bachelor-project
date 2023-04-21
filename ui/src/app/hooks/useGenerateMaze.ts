import { useCallback } from 'react';
import { generateMaze } from 'src/features/mazeGeneration/js/mazeGeneration';
import { create_maze } from 'src/features/mazeGeneration/wasm/maze-generation';
import { USING_WASM } from '../constants';
import { useAppSelector } from '../state/hooks';

export const useGenerateMaze = () => {
  const { initialized } = useAppSelector((state) => state.wasm);
  return useCallback(
    (cols: number, rows: number) => {
      if (USING_WASM && initialized) {
        return Array.from(create_maze(cols, rows));
      } else return generateMaze(cols, rows);
    },
    [initialized]
  );
};
