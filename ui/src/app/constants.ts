import { Difficulty } from './types/Difficulty';
import { GameMove } from './types/GameMoves';

export const MAZE_SIZE = {
  [Difficulty.veryEasy]: { width: 5, height: 5 },
  [Difficulty.easy]: { width: 20, height: 20 },
  [Difficulty.medium]: { width: 40, height: 40 },
  [Difficulty.hard]: { width: 60, height: 50 },
  [Difficulty.veryHard]: { width: 90, height: 50 },
};

export const DIFFICULTY = {
  [Difficulty.veryEasy]: 'Very Easy',
  [Difficulty.easy]: 'Easy',
  [Difficulty.medium]: 'Medium',
  [Difficulty.hard]: 'Hard',
  [Difficulty.veryHard]: 'Very Hard',
};

export const MOVES = {
  [GameMove.up]: { y: -1, x: 0 },
  [GameMove.down]: { y: 1, x: 0 },
  [GameMove.left]: { y: 0, x: -1 },
  [GameMove.right]: { y: 0, x: 1 },
};
