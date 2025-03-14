import React from 'react';
import SudokuCell from './SudokuCell';
import { CellState } from './utils/types';

interface SudokuBoardProps {
  cellStates: CellState[][];
  gameState: 'playing' | 'paused' | 'won';
  onCellClick: (row: number, col: number) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ 
  cellStates, 
  gameState, 
  onCellClick 
}) => {
  return (
    <div className="relative">
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-70 z-10 flex items-center justify-center rounded">
          <div className="text-2xl font-bold text-gray-800">GAME PAUSED</div>
        </div>
      )}
      
      <div className="grid grid-cols-9 gap-0 border-2 border-gray-800 mx-auto max-w-[360px] md:max-w-[450px]">
        {cellStates.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onCellClick={onCellClick}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default SudokuBoard;