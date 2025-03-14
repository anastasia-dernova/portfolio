import React from 'react';
import { CellState } from './utils/types';

interface SudokuCellProps {
  cell: CellState;
  rowIndex: number;
  colIndex: number;
  onCellClick: (row: number, col: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({ 
  cell, 
  rowIndex, 
  colIndex, 
  onCellClick 
}) => {
  const borderRight = (colIndex + 1) % 3 === 0 && colIndex < 8 
    ? 'border-r-2 border-gray-800' 
    : 'border-r border-gray-300';
  
  const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8 
    ? 'border-b-2 border-gray-800' 
    : 'border-b border-gray-300';
  
  let bgColor = 'bg-white';
  if (cell.isSelected) {
    bgColor = 'bg-indigo-200';
  } else if (cell.isGiven) {
    bgColor = 'bg-gray-100';
  }
  
  if (cell.isInvalid) {
    bgColor = 'bg-red-200';
  }
  
  return (
    <div
      className={`
        h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center relative
        ${borderRight} ${borderBottom} ${bgColor}
        ${!cell.isGiven ? 'cursor-pointer hover:bg-indigo-100' : 'cursor-default'}
      `}
      onClick={() => !cell.isGiven && onCellClick(rowIndex, colIndex)}
    >
      {cell.value !== null ? (
        <span className={`text-base sm:text-lg md:text-xl font-medium ${cell.isGiven ? 'text-gray-800' : 'text-indigo-600'}`}>
          {cell.value}
        </span>
      ) : (
        <div className="grid grid-cols-3 gap-0 w-full h-full p-0.5">
          {cell.notes.map((isActive, index) => (
            <div key={index} className="flex items-center justify-center">
              {isActive && (
                <span className="text-[6px] sm:text-[7px] md:text-[9px] text-gray-500">
                  {index + 1}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SudokuCell;