import { GameMove } from '../types/GameMoves';

export const getPossibleMoves = (cellData: number) => {
  let bordersData = cellData;
  const possibleMoves: GameMove[] = [];
  if (bordersData >= 8) {
    possibleMoves.push(GameMove.left);
    bordersData -= 8;
  }
  if (bordersData >= 4) {
    possibleMoves.push(GameMove.down);
    bordersData -= 4;
  }
  if (bordersData >= 2) {
    possibleMoves.push(GameMove.right);
    bordersData -= 2;
  }
  if (bordersData >= 1) {
    possibleMoves.push(GameMove.up);
    bordersData -= 1;
  }
  return possibleMoves;
};
