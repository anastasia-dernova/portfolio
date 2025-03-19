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
  const [cellStates, setCellStates] = useState<CellState[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timer, setTimer] = useState(0);
  const [, setOriginalBoard] = useState<SudokuBoard>([]);
  const [solution, setSolution] = useState<SudokuBoard>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const getCurrentBoard = (): SudokuBoard => {
    return cellStates.map(row => row.map(cell => cell.value));
  };
  
  const generateNewPuzzle = () => {
    setIsLoading(true);
    setTimer(0);
    setGameState('playing');
    
    const newBoard = generatePuzzle(difficulty);
    setOriginalBoard(JSON.parse(JSON.stringify(newBoard)));
    
    const solutionBoard = JSON.parse(JSON.stringify(newBoard));
    solveSudoku(solutionBoard);
    setSolution(solutionBoard);
    setCellStates(boardToCellStates(newBoard));
    setSelectedCell(null);
    setIsLoading(false);
  };
  
  const handleCellClick = (row: number, col: number) => {
    if (!cellStates[row][col].isGiven) {
      setSelectedCell([row, col]);
      
      setCellStates(prev => {
        const newStates = [...prev];
        
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            newStates[r][c] = {...newStates[r][c], isSelected: false};
          }
        }
        newStates[row][col] = {...newStates[row][col], isSelected: true};
        return newStates;
      });
    }
  };
  
  const handleNumberInput = (num: number | null) => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const [row, col] = selectedCell;
    
    if (cellStates[row][col].isGiven) return;
    
    setCellStates(prev => {
      const newStates = [...prev];
      
        newStates[row][col] = {
          ...newStates[row][col], 
          value: num,
          notes: Array(9).fill(false)
        };
        
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
      
      return newStates;
    });
    
    setTimeout(() => {
      const currentBoard = getCurrentBoard();
      const isComplete = currentBoard.every(row => row.every(cell => cell !== null));
      const hasNoInvalidCells = !cellStates.some(row => 
        row.some(cell => cell.isInvalid)
      );
      
      if (isComplete && hasNoInvalidCells) {
        setGameState('won');
      }
    }, 0);
  };
  
  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };
  
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
    
    const updatedBoard = getCurrentBoard();
    updatedBoard[row][col] = solution[row][col];
    if (isBoardComplete(updatedBoard)) {
      setGameState('won');
    }
  };
  
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
    timer,
    setDifficulty,
    generateNewPuzzle,
    handleCellClick,
    handleNumberInput,
    togglePause,
    getHint
  };
}