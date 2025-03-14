import { SudokuBoard, CellState } from './types';

// Check if placing a number in a position is valid
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

// Solve the Sudoku puzzle using backtracking
export const solveSudoku = (board: SudokuBoard): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        // Try placing each number 1-9
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            
            // Recursively try to solve the rest of the puzzle
            if (solveSudoku(board)) {
              return true;
            }
            
            // If placing this number doesn't lead to a solution, backtrack
            board[row][col] = null;
          }
        }
        // If no number works, puzzle is unsolvable
        return false;
      }
    }
  }
  // If we've filled all cells, the puzzle is solved
  return true;
};

// Generate a solved Sudoku board
export const generateSolvedBoard = (): SudokuBoard => {
  const board: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(null));
  solveSudoku(board);
  return board;
};

// Create a puzzle by removing numbers from a solved board
export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard'): SudokuBoard => {
  // Create a solved board
  const solvedBoard = generateSolvedBoard();
  
  // Clone the board for our puzzle
  const puzzle: SudokuBoard = JSON.parse(JSON.stringify(solvedBoard));
  
  // Define how many cells to remove based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 45,
    hard: 55
  };
  
  // Remove random cells
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

// Check if the current board state is valid (no conflicts)
export const isBoardValid = (board: SudokuBoard): boolean => {
  // Check each cell
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== null) {
        // Temporarily set cell to null to check if placing this number is valid
        board[row][col] = null;
        const valid = isValid(board, row, col, num);
        board[row][col] = num;
        
        if (!valid) return false;
      }
    }
  }
  return true;
};

// Check if the board is completely filled and valid
export const isBoardComplete = (board: SudokuBoard): boolean => {
  // Check if all cells are filled
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) return false;
    }
  }
  
  // Check if the board is valid
  return isBoardValid(board);
};

// Convert board to cell states
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

// Format timer display
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};