import { Difficulty } from './Difficulty';
import { User } from './User';

export interface GameRecord extends User {
  difficulty: Difficulty;
  /** Completion time in s */
  completionTime: number;
}
