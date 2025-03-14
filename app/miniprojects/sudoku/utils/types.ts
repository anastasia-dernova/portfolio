export type CellValue = number | null;
export type SudokuBoard = CellValue[][];
export type GameState = 'playing' | 'paused' | 'won';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CellState {
  value: CellValue;
  isGiven: boolean;
  isSelected: boolean;
  isInvalid: boolean;
  notes: boolean[];
}