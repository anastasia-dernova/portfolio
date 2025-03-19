import { SudokuBoard, CellState } from './types';

export const isValid = (board: SudokuBoard, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (board[y][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[boxRow + y][boxCol + x] === num) return false;
    }
  }

  return true;
};

export const solveSudoku = (board: SudokuBoard): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            
            if (solveSudoku(board)) {
              return true;
            }
            
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const generateSolvedBoard = (): SudokuBoard => {
  const board: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(null));
  solveSudoku(board);
  return board;
};

export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard'): SudokuBoard => {
  const solvedBoard = generateSolvedBoard();
  
  const puzzle: SudokuBoard = JSON.parse(JSON.stringify(solvedBoard));
  
  const cellsToRemove = {
    easy: 30,
    medium: 45,
    hard: 55
  };
  
  let count = 0;
  const maxAttempts = 100;
  let attempts = 0;
  
  while (count < cellsToRemove[difficulty] && attempts < maxAttempts) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      count++;
    }
    attempts++;
  }
  
  return puzzle;
};

export const isBoardValid = (board: SudokuBoard): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== null) {
        board[row][col] = null;
        const valid = isValid(board, row, col, num);
        board[row][col] = num;
        
        if (!valid) return false;
      }
    }
  }
  return true;
};

export const isBoardComplete = (board: SudokuBoard): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) return false;
    }
  }

  return isBoardValid(board);
};

export const boardToCellStates = (board: SudokuBoard): CellState[][] => {
  return board.map(row => 
    row.map(value => ({
      value,
      isGiven: value !== null,
      isSelected: false,
      isInvalid: false,
      notes: Array(9).fill(false)
    }))
  );
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};