import { useCallback, useEffect, useMemo, useState } from 'react';
import { useKey } from 'react-use';
import { Handler, KeyFilter } from 'react-use/lib/useKey.js';
import styled from 'styled-components';
import Cell from '../atoms/Cell.js';
import Player from '../atoms/Player.js';
import { generateMaze } from '../features/mazeGeneration.js';
import { GameFinishReason } from '../types/GameFinishReason.js';
import { GameMove } from '../types/GameMoves.js';
import { getPossibleMoves } from '../utils/getPossibleMoves.js';

const Grid = styled.div`
  display: grid;
  position: relative;
`;

interface Position {
  x: number;
  y: number;
}

interface GameProps {
  cols: number;
  rows: number;
  onStart: () => void;
  onFinish: (reason: GameFinishReason) => void;
}

const MAPPED_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const Game = ({ cols, rows, onStart, onFinish }: GameProps) => {
  const [mazeData, setMazeData] = useState<number[]>([]);
  const [cellSize, setCellSize] = useState(10);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const maze = useMemo(
    () =>
      mazeData.map((cell, index) => (
        <Cell key={index} borders={cell} size={cellSize} />
      )),
    [mazeData, cellSize]
  );

  useEffect(
    () => () => {
      onFinish(GameFinishReason.cancel);
    },
    []
  );

  useEffect(() => {
    setMazeData(generateMaze(cols, rows));
  }, [cols, rows]);

  useEffect(() => {
    if (maze?.length > 0) {
      onStart();
    }
  }, [maze?.length, onStart]);

  useEffect(() => {
    if (position.x === cols - 1 && position.y === rows - 1) {
      onFinish(GameFinishReason.win);
    }
  }, [position, onFinish, cols, rows]);

  const checkMoveBounds = useCallback(
    (move: GameMove) => {
      const borders = mazeData[position.y * cols + position.x];
      const moves = getPossibleMoves(borders);
      return moves.includes(move);
    },
    [cols, position, mazeData]
  );

  const makeStep = useCallback(
    ({ x, y }: Position) => {
      const newPosition = { x: position.x + x, y: position.y + y };
      if (
        newPosition.x >= cols ||
        newPosition.x < 0 ||
        newPosition.y >= rows ||
        newPosition.y < 0
      ) {
        return;
      }
      setPosition(newPosition);
    },
    [setPosition, cols, position, rows]
  );

  const calcStep = useCallback((move: GameMove) => {
    const step: Position = { x: 0, y: 0 };
    switch (move) {
      case GameMove.up:
        step.y = -1;
        break;
      case GameMove.down:
        step.y = 1;
        break;
      case GameMove.left:
        step.x = -1;
        break;
      case GameMove.right:
        step.x = 1;
        break;
    }
    return step;
  }, []);

  const handleKeyPress: Handler = useCallback(
    (event) => {
      let move: GameMove | null = null;
      switch (event.key) {
        case MAPPED_KEYS[0]:
          move = GameMove.up;
          break;
        case MAPPED_KEYS[1]:
          move = GameMove.down;
          break;
        case MAPPED_KEYS[2]:
          move = GameMove.left;
          break;
        case MAPPED_KEYS[3]:
          move = GameMove.right;
          break;
      }
      if (!move) return;
      if (checkMoveBounds(move)) {
        const step = calcStep(move);
        makeStep(step);
      }
    },
    [makeStep, checkMoveBounds, calcStep]
  );

  const predicate: KeyFilter = (event) => MAPPED_KEYS.includes(event.key);
  useKey(predicate, handleKeyPress);

  return (
    <div>
      <Grid style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {maze}
        <Player cellSize={cellSize} {...position} />
      </Grid>
    </div>
  );
};

export default Game;
