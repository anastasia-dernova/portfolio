import { useState, useEffect, useRef } from 'react';
import { 
  CellState, 
  SudokuBoard, 
  GameState, 
  Difficulty 
} from '../utils/types';
import { 
  generatePuzzle, 
  boardToCellStates, 
  isValid, 
  isBoardComplete, 
  solveSudoku 
} from '../utils/sudokuUtils';

export function useSudokuGame() {
  // State
  const [cellStates, setCellStates] = useState<CellState[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [notesMode, setNotesMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [originalBoard, setOriginalBoard] = useState<SudokuBoard>([]);
  const [solution, setSolution] = useState<SudokuBoard>([]);

  // Timer ref for cleanup
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get current board values from cell states
  const getCurrentBoard = (): SudokuBoard => {
    return cellStates.map(row => row.map(cell => cell.value));
  };
  
  // Generate a new puzzle
  const generateNewPuzzle = () => {
    setIsLoading(true);
    setTimer(0);
    setGameState('playing');
    
    // Generate puzzle with selected difficulty
    const newBoard = generatePuzzle(difficulty);
    setOriginalBoard(JSON.parse(JSON.stringify(newBoard)));
    
    // Save the solution
    const solutionBoard = JSON.parse(JSON.stringify(newBoard));
    solveSudoku(solutionBoard);
    setSolution(solutionBoard);
    
    // Convert to cell states for UI
    setCellStates(boardToCellStates(newBoard));
    setSelectedCell(null);
    setIsLoading(false);
  };
  
  // Handle cell selection
  const handleCellClick = (row: number, col: number) => {
    if (!cellStates[row][col].isGiven) {
      setSelectedCell([row, col]);
      
      setCellStates(prev => {
        const newStates = [...prev];
        
        // Deselect all cells
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            newStates[r][c] = {...newStates[r][c], isSelected: false};
          }
        }
        
        // Select this cell
        newStates[row][col] = {...newStates[row][col], isSelected: true};
        return newStates;
      });
    }
  };
  
  // Handle number input
  const handleNumberInput = (num: number | null) => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const [row, col] = selectedCell;
    
    if (cellStates[row][col].isGiven) return;
    
    setCellStates(prev => {
      const newStates = [...prev];
      
      if (notesMode && num !== null) {
        // Toggle note
        const notes = [...newStates[row][col].notes];
        notes[num - 1] = !notes[num - 1];
        newStates[row][col] = {...newStates[row][col], notes};
      } else {
        // Set value
        newStates[row][col] = {
          ...newStates[row][col], 
          value: num,
          notes: Array(9).fill(false)
        };
        
        // Check validity
        const currentBoard = newStates.map(r => r.map(c => c.value));
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (newStates[r][c].value !== null) {
              const val = newStates[r][c].value as number;
              currentBoard[r][c] = null;
              newStates[r][c].isInvalid = !isValid(currentBoard, r, c, val);
              currentBoard[r][c] = val;
            } else {
              newStates[r][c].isInvalid = false;
            }
          }
        }
      }
      
      return newStates;
    });
    
    // Check if game is won
    const currentBoard = getCurrentBoard();
    if (isBoardComplete(currentBoard)) {
      setGameState('won');
    }
  };
  
  // Toggle pause
  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };
  
  // Toggle notes mode - FIX #1: Add this function
//   const toggleNotes = () => {
//     setNotesMode(prev => !prev);
//   };
  
  // Get a hint
  const getHint = () => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const [row, col] = selectedCell;
    if (cellStates[row][col].isGiven) return;
    
    setCellStates(prev => {
      const newStates = [...prev];
      newStates[row][col] = {
        ...newStates[row][col],
        value: solution[row][col],
        isInvalid: false,
        notes: Array(9).fill(false)
      };
      return newStates;
    });
    
    // Check if game is won after hint
    const updatedBoard = getCurrentBoard();
    updatedBoard[row][col] = solution[row][col];
    if (isBoardComplete(updatedBoard)) {
      setGameState('won');
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);
  
  useEffect(() => {
    generateNewPuzzle();
  }, [difficulty]);
  
  return {
    cellStates,
    selectedCell,
    isLoading,
    gameState,
    difficulty,
    notesMode,
    timer,
    setDifficulty,
    setNotesMode,
    generateNewPuzzle,
    handleCellClick,
    handleNumberInput,
    togglePause,
    getHint
  };
}