import React from 'react';
import { Difficulty, GameState } from './utils/types';

interface GameControlsProps {
  difficulty: Difficulty;
  gameState: GameState;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  onTogglePause: () => void;
  onHint: () => void;
  hintDisabled: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  difficulty,
  gameState,
  onDifficultyChange,
  onNewGame,
  onTogglePause,
  onHint,
  hintDisabled
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-3 md:space-y-0">
      <div className="flex space-x-2">
        <select 
          className="p-1 md:p-2 text-sm md:text-base border rounded"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          disabled={gameState === 'playing'}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button 
          className="px-2 md:px-3 py-1 text-sm md:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={onNewGame}
        >
          New Game
        </button>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className={`px-2 md:px-3 py-1 text-sm md:text-base rounded 
            ${gameState === 'paused' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}
          onClick={onTogglePause}
          disabled={gameState === 'won'}
        >
          {gameState === 'paused' ? 'Resume' : 'Pause'}
        </button>
        
        <button 
          className="px-2 md:px-3 py-1 text-sm md:text-base bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onHint}
          disabled={hintDisabled}
        >
          Hint
        </button>
      </div>
    </div>
  );
};

export default GameControls;