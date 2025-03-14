// // components/sudoku/SudokuGame.tsx
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { 
//   CellValue, 
//   SudokuBoard, 
//   generatePuzzle, 
//   isBoardValid, 
//   isBoardComplete, 
//   solveSudoku,
//   isValid
// } from './sudokuUtils';

// interface CellState {
//   value: CellValue;
//   isGiven: boolean;
//   isSelected: boolean;
//   isInvalid: boolean;
//   notes: boolean[];
// }

// type GameState = 'playing' | 'paused' | 'won';

// const SudokuGame = () => {
//   const [gameState, setGameState] = useState<'playing' | 'paused' | 'won'>('playing');
//   const [cellStates, setCellStates] = useState<CellState[][]>([]);
//   const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
//   const [notesMode, setNotesMode] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [originalBoard, setOriginalBoard] = useState<SudokuBoard>([]);
//   const [solution, setSolution] = useState<SudokuBoard>([]);

//   // Timer ref for cleanup
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
  
//   // Generate a new puzzle when component mounts or difficulty changes
//   useEffect(() => {
//     generateNewPuzzle();
//   }, [difficulty]);
  
//   // Timer logic
//   useEffect(() => {
//     if (gameState === 'playing') {
//       timerRef.current = setInterval(() => {
//         setTimer(prev => prev + 1);
//       }, 1000);
//     } else {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     }
    
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [gameState]);
  
//   // Convert board to cell states
//   const boardToCellStates = (board: SudokuBoard): CellState[][] => {
//     return board.map(row => 
//       row.map(value => ({
//         value,
//         isGiven: value !== null,
//         isSelected: false,
//         isInvalid: false,
//         notes: Array(9).fill(false)
//       }))
//     );
//   };
  
//   // Get current board values from cell states
//   const getCurrentBoard = (): SudokuBoard => {
//     return cellStates.map(row => row.map(cell => cell.value));
//   };
  
//   // Generate a new puzzle
//   const generateNewPuzzle = () => {
//     setIsLoading(true);
//     setTimer(0);
//     setGameState('playing');
    
//     // Generate puzzle with selected difficulty
//     const newBoard = generatePuzzle(difficulty);
//     setOriginalBoard(JSON.parse(JSON.stringify(newBoard)));
    
//     // Save the solution
//     const solutionBoard = JSON.parse(JSON.stringify(newBoard));
//     solveSudoku(solutionBoard);
//     setSolution(solutionBoard);
    
//     // Convert to cell states for UI
//     setCellStates(boardToCellStates(newBoard));
//     setSelectedCell(null);
//     setIsLoading(false);
//   };
  
//   // Handle cell selection
//   const handleCellClick = (row: number, col: number) => {
//     // Only allow selecting cells that aren't given in the original puzzle
//     if (!cellStates[row][col].isGiven) {
//       setSelectedCell([row, col]);
      
//       // Update selected state in the UI
//       setCellStates(prev => {
//         const newStates = [...prev];
        
//         // Deselect all cells
//         for (let r = 0; r < 9; r++) {
//           for (let c = 0; c < 9; c++) {
//             newStates[r][c] = {...newStates[r][c], isSelected: false};
//           }
//         }
        
//         // Select this cell
//         newStates[row][col] = {...newStates[row][col], isSelected: true};
//         return newStates;
//       });
//     }
//   };

//   const togglePause = () => {
//     if (gameState === 'playing') {
//       setGameState('paused');
//     } else if (gameState === 'paused') {
//       setGameState('playing');
//     }
//   };
  
//   // Handle number input
//   const handleNumberInput = (num: number | null) => {
//     if (!selectedCell || gameState !== 'playing') return;
    
//     const [row, col] = selectedCell;
    
//     // If the cell is part of the original puzzle, don't allow changes
//     if (cellStates[row][col].isGiven) return;
    
//     setCellStates(prev => {
//       const newStates = [...prev];
      
//       if (notesMode && num !== null) {
//         // Toggle note
//         const notes = [...newStates[row][col].notes];
//         notes[num - 1] = !notes[num - 1];
//         newStates[row][col] = {...newStates[row][col], notes};
//       } else {
//         // Set value
//         newStates[row][col] = {
//           ...newStates[row][col], 
//           value: num,
//           notes: Array(9).fill(false) // Clear notes when setting a value
//         };
        
//         // Check validity
//         const currentBoard = newStates.map(r => r.map(c => c.value));
//         for (let r = 0; r < 9; r++) {
//           for (let c = 0; c < 9; c++) {
//             if (newStates[r][c].value !== null) {
//               const val = newStates[r][c].value as number;
//               currentBoard[r][c] = null;
//               newStates[r][c].isInvalid = !isValid(currentBoard, r, c, val);
//               currentBoard[r][c] = val;
//             } else {
//               newStates[r][c].isInvalid = false;
//             }
//           }
//         }
//       }
      
//       return newStates;
//     });
    
//     // Check if game is won
//     const currentBoard = getCurrentBoard();
//     if (isBoardComplete(currentBoard)) {
//       setGameState('won');
//     }
//   };
  
//   // Get a hint
//   const getHint = () => {
//     if (!selectedCell || gameState !== 'playing') return;
    
//     const [row, col] = selectedCell;
//     if (cellStates[row][col].isGiven) return;
    
//     setCellStates(prev => {
//       const newStates = [...prev];
//       newStates[row][col] = {
//         ...newStates[row][col],
//         value: solution[row][col],
//         isInvalid: false,
//         notes: Array(9).fill(false)
//       };
//       return newStates;
//     });
    
//     // Check if game is won after hint
//     const updatedBoard = getCurrentBoard();
//     updatedBoard[row][col] = solution[row][col];
//     if (isBoardComplete(updatedBoard)) {
//       setGameState('won');
//     }
//   };
  
//   // Format timer display
//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };
  
//   return (
//     <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-100 to-purple-100">
//       <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-indigo-800">Sudoku Game</h1>
        
//         {/* Game status and controls */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-3 md:space-y-0">
//           <div className="flex space-x-2">
//             <select 
//               className="p-1 md:p-2 text-sm md:text-base border rounded"
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
//               disabled={gameState === 'playing'}
//             >
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>
//             <button 
//               className="px-2 md:px-3 py-1 text-sm md:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700"
//               onClick={generateNewPuzzle}
//             >
//               New Game
//             </button>
//           </div>
          
//           <div className="text-center order-first md:order-none">
//             <div className="text-lg md:text-xl font-mono">{formatTime(timer)}</div>
//             {gameState === 'won' && (
//               <div className="text-green-600 font-bold">Solved!</div>
//             )}
//             {gameState === 'paused' && (
//               <div className="text-orange-600 font-bold">Paused</div>
//             )}
//           </div>
          
//           <div className="flex space-x-2">
//             {/* Pause/Resume button */}
//             <button 
//               className={`px-2 md:px-3 py-1 text-sm md:text-base rounded 
//                 ${gameState === 'paused' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}
//               onClick={togglePause}
//               disabled={gameState === 'won'}
//             >
//               {gameState === 'paused' ? 'Resume' : 'Pause'}
//             </button>
            
//             <button 
//               className={`px-2 md:px-3 py-1 text-sm md:text-base rounded ${notesMode ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
//               onClick={() => setNotesMode(!notesMode)}
//               disabled={gameState !== 'playing'}
//             >
//               Notes
//             </button>
//             <button 
//               className="px-2 md:px-3 py-1 text-sm md:text-base bg-blue-600 text-white rounded hover:bg-blue-700"
//               onClick={getHint}
//               disabled={gameState !== 'playing' || !selectedCell}
//             >
//               Hint
//             </button>
//           </div>
//         </div>
        
//         {isLoading ? (
//           <div className="text-center py-20">Loading puzzle...</div>
//         ) : (
//           <div className="mb-6">
//             {/* Add overlay for paused state */}
//             <div className="relative">
//               {gameState === 'paused' && (
//                 <div className="absolute inset-0 bg-gray-200 bg-opacity-70 z-10 flex items-center justify-center rounded">
//                   <div className="text-2xl font-bold text-gray-800">GAME PAUSED</div>
//                 </div>
//               )}
              
//               {/* Game board */}
//               <div className="grid grid-cols-9 gap-0 border-2 border-gray-800 mx-auto max-w-[360px] md:max-w-[450px]">
//                 {cellStates.map((row, rowIndex) => (
//                   row.map((cell, colIndex) => {
//                     const borderRight = (colIndex + 1) % 3 === 0 && colIndex < 8 ? 'border-r-2 border-gray-800' : 'border-r border-gray-300';
//                     const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8 ? 'border-b-2 border-gray-800' : 'border-b border-gray-300';
                    
//                     let bgColor = 'bg-white';
//                     if (cell.isSelected) {
//                       bgColor = 'bg-indigo-200';
//                     } else if (cell.isGiven) {
//                       bgColor = 'bg-gray-100';
//                     }
                    
//                     if (cell.isInvalid) {
//                       bgColor = 'bg-red-200';
//                     }
                    
//                     return (
//                       <div
//                         key={`${rowIndex}-${colIndex}`}
//                         className={`
//                           h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center relative
//                           ${borderRight} ${borderBottom} ${bgColor}
//                           ${!cell.isGiven ? 'cursor-pointer hover:bg-indigo-100' : 'cursor-default'}
//                         `}
//                         onClick={() => handleCellClick(rowIndex, colIndex)}
//                       >
//                         {cell.value !== null ? (
//                           <span className={`text-base sm:text-lg md:text-xl font-medium ${cell.isGiven ? 'text-gray-800' : 'text-indigo-600'}`}>
//                             {cell.value}
//                           </span>
//                         ) : (
//                           <div className="grid grid-cols-3 gap-0 w-full h-full p-0.5">
//                             {cell.notes.map((isActive, index) => (
//                               <div key={index} className="flex items-center justify-center">
//                                 {isActive && (
//                                   <span className="text-[6px] sm:text-[7px] md:text-[9px] text-gray-500">
//                                     {index + 1}
//                                   </span>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })
//                 ))}
//               </div>
//             </div>
            
//             {/* Number input pad */}
//             <div className="mt-4 md:mt-6 grid grid-cols-5 gap-1 md:gap-2 max-w-[300px] sm:max-w-[350px] md:max-w-md mx-auto">
//               {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//                 <button
//                   key={num}
//                   className="bg-indigo-600 text-white rounded-lg h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-lg md:text-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
//                   onClick={() => handleNumberInput(num)}
//                   disabled={gameState !== 'playing'}
//                 >
//                   {num}
//                 </button>
//               ))}
//               <button
//                 className="bg-gray-600 text-white rounded-lg h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-lg md:text-xl font-bold hover:bg-gray-700 disabled:opacity-50"
//                 onClick={() => handleNumberInput(null)}
//                 disabled={gameState !== 'playing'}
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   ); 
// };

// export default SudokuGame;


// components/sudoku/SudokuGame.tsx
'use client';
import SudokuBoard from './SudokuBoard';
import NumberPad from './NumberPad';
import GameControls from './GameControls';
import Timer from './Timer';
import { useSudokuGame } from './hooks/useSudokuGame';

const SudokuGame = () => {
  const {
    cellStates,
    isLoading,
    gameState,
    difficulty,
    notesMode,
    timer,
    setDifficulty,
    // setNotesMode,
    generateNewPuzzle,
    handleCellClick,
    handleNumberInput,
    togglePause,
    selectedCell,
    // toggleNotes,
    getHint
  } = useSudokuGame();
  
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-indigo-800">Sudoku Game</h1>
        
        <div className="flex justify-center mb-4">
          <Timer time={timer} gameState={gameState} />
        </div>
        
        <GameControls 
          difficulty={difficulty} 
          gameState={gameState}
        //   notesMode={notesMode}
          onDifficultyChange={setDifficulty}
          onNewGame={generateNewPuzzle}
          onTogglePause={togglePause}
        //   onToggleNotes={() => setNotesMode(!notesMode)}
        //   onToggleNotes={toggleNotes} 
          onHint={getHint}
          hintDisabled={gameState !== 'playing' || !selectedCell}
        //   hintDisabled={gameState !== 'playing' || !cellStates.every(row => 
        //     row.every(cell => !cell.isSelected)
        //   )}

        />
        
        {isLoading ? (
          <div className="text-center py-20">Loading puzzle...</div>
        ) : (
          <div className="mb-6">
            <SudokuBoard 
              cellStates={cellStates}
              gameState={gameState}
              onCellClick={handleCellClick}
            />
            
            <NumberPad 
              onNumberClick={handleNumberInput}
              disabled={gameState !== 'playing'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuGame;