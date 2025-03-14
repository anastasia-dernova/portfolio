import React from 'react';
import { formatTime } from './utils/sudokuUtils';
import { GameState } from './utils/types';

interface TimerProps {
  time: number;
  gameState: GameState;
}

const Timer: React.FC<TimerProps> = ({ time, gameState }) => {
  return (
    <div className="text-center">
      <div className="text-lg md:text-xl font-mono">{formatTime(time)}</div>
      {gameState === 'won' && (
        <div className="text-green-600 font-bold">Solved!</div>
      )}
      {gameState === 'paused' && (
        <div className="text-orange-600 font-bold">Paused</div>
      )}
    </div>
  );
};

export default Timer;