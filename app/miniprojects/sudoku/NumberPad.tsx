import React from 'react';

interface NumberPadProps {
  onNumberClick: (num: number | null) => void;
  disabled: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, disabled }) => {
  return (
    <div className="mt-4 md:mt-6 grid grid-cols-5 gap-1 md:gap-2 max-w-[300px] sm:max-w-[350px] md:max-w-md mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          className="bg-indigo-600 text-white rounded-lg h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-lg md:text-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
          onClick={() => onNumberClick(num)}
          disabled={disabled}
        >
          {num}
        </button>
      ))}
      <button
        className="bg-gray-600 text-white rounded-lg h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-lg md:text-xl font-bold hover:bg-gray-700 disabled:opacity-50"
        onClick={() => onNumberClick(null)}
        disabled={disabled}
      >
        ✕
      </button>
    </div>
  );
};

export default NumberPad;