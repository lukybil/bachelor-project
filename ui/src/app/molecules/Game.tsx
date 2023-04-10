import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Cell from '../atoms/Cell.js';
import { generateMaze } from '../features/mazeGeneration.js';

const Grid = styled.div`
  display: grid;
`;

interface GameProps {
  cols: number;
  rows: number;
}

const Game = ({ cols, rows }: GameProps) => {
  const [mazeData, setMazeData] = useState<number[]>([]);

  const maze = useMemo(
    () => mazeData.map((cell, index) => <Cell key={index} borders={cell} />),
    [mazeData]
  );

  useEffect(() => {
    setMazeData(generateMaze(cols, rows));
  }, [cols, rows]);

  return (
    <div>
      Game
      <Grid style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {maze}
      </Grid>
    </div>
  );
};

export default Game;
