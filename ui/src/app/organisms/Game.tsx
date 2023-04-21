import { useCallback, useEffect, useMemo, useState } from 'react';
import { useKey } from 'react-use';
import { Handler, KeyFilter } from 'react-use/lib/useKey.js';
import styled from 'styled-components';
import Cell from '../atoms/Cell.js';
import GameTitle from '../atoms/GameTitle.js';
import LoadingSpinner from '../atoms/LoadingSpinner.js';
import Player from '../atoms/Player.js';
import { MAZE_SIZE, ZOOM_LEVEL } from '../constants.js';
import GameMenu from '../molecules/GameMenu.js';
import { SPACING } from '../style/style.js';
import { Difficulty } from '../types/Difficulty.js';
import { GameFinishReason } from '../types/GameFinishReason.js';
import { GameMove } from '../types/GameMoves.js';
import { Zoom } from '../types/Zoom.js';
import { getPossibleMoves } from '../utils/getPossibleMoves.js';

import { useGenerateMaze } from '../hooks/useGenerateMaze.js';

const Grid = styled.div`
  display: grid;
  position: relative;
  width: fit-content;
`;

interface Position {
  x: number;
  y: number;
}

interface GameProps {
  difficulty: Difficulty;
  onStart: () => void;
  onFinish: (reason: GameFinishReason) => void;
}

const MAPPED_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const Game = ({ difficulty, onStart, onFinish }: GameProps) => {
  const [mazeData, setMazeData] = useState<number[]>([]);
  const [cellSize, setCellSize] = useState(10);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const generateMaze = useGenerateMaze();
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null
  );
  const { width: cols, height: rows } = useMemo(
    () => MAZE_SIZE[difficulty],
    [difficulty]
  );

  const maze = useMemo(
    () =>
      mazeData.map((cell, index) => (
        <Cell id={`cell-${index}`} key={index} borders={cell} size={cellSize} />
      )),
    [mazeData, cellSize]
  );

  const handleStart = useCallback(() => {
    onStart();
    setTimer(setInterval(() => setSeconds((old) => old + 1), 1000));
  }, [onStart, setTimer, setSeconds]);

  const handleFinish = useCallback(() => {
    if (timer) clearInterval(timer);
    onFinish(GameFinishReason.cancel);
  }, [timer, onFinish]);

  const handleZoom = useCallback(
    (zoomChange: Zoom) => {
      const currentLevel = ZOOM_LEVEL.findIndex((level) => level === cellSize);
      const futureLevel = currentLevel + zoomChange;
      if (futureLevel >= 0 && futureLevel < ZOOM_LEVEL.length) {
        setCellSize(ZOOM_LEVEL[futureLevel]);
      }
    },
    [cellSize, setCellSize]
  );

  useEffect(
    () => () => {
      handleFinish();
    },
    []
  );

  useEffect(
    () => () => {
      if (timer) clearInterval(timer);
    },
    [timer]
  );

  useEffect(() => {
    console.log('generating');
    const maze = generateMaze(cols, rows);
    setMazeData(maze);
  }, []);

  useEffect(() => {
    if (maze?.length > 0) {
      handleStart();
    }
  }, [maze?.length, handleStart]);

  useEffect(() => {
    if (position.x === cols - 1 && position.y === rows - 1) {
      setTimeout(() => handleFinish(), 1);
    }
  }, [position, cols, rows, handleFinish]);

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.sm,
      }}
    >
      <GameTitle difficulty={difficulty} seconds={seconds} />
      {maze.length > 0 ? (
        <Grid
          id="game-grid"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {maze}
          <Player cellSize={cellSize} {...position} />
        </Grid>
      ) : (
        <div
          style={{
            width: cols * cellSize,
            height: rows * cellSize,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      )}
      <GameMenu onZoom={handleZoom} />
    </div>
  );
};

export default Game;
