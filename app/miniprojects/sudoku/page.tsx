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
    selectedCell,
    setDifficulty,
    generateNewPuzzle,
    handleCellClick,
    handleNumberInput,
    togglePause,
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
          onDifficultyChange={setDifficulty}
          onNewGame={generateNewPuzzle}
          onTogglePause={togglePause}
          onHint={getHint}
          hintDisabled={gameState !== 'playing' || !selectedCell}
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