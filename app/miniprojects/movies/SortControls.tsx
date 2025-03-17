import React from 'react';
import { Movie } from './types';

export type SortOption = 'none' | 'rating-asc' | 'rating-desc' | 'year-asc' | 'year-desc';

export const sortMovies = (movies: Movie[], sortOption: SortOption): Movie[] => {
  if (sortOption === 'none') return movies;
  
  return [...movies].sort((a, b) => {
    if (sortOption === 'rating-desc') {
      return b.vote_average - a.vote_average;
    } else if (sortOption === 'rating-asc') {
      return a.vote_average - b.vote_average;
    } else if (sortOption === 'year-desc') {
      const yearA = a.release_date ? new Date(a.release_date).getFullYear() : 0;
      const yearB = b.release_date ? new Date(b.release_date).getFullYear() : 0;
      return yearB - yearA;
    } else if (sortOption === 'year-asc') {
      const yearA = a.release_date ? new Date(a.release_date).getFullYear() : 0;
      const yearB = b.release_date ? new Date(b.release_date).getFullYear() : 0;
      return yearA - yearB;
    }
    return 0;
  });
};

interface SortControlsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  showControls: boolean;
}

const SortControls: React.FC<SortControlsProps> = ({ 
  sortOption, 
  onSortChange,
  showControls 
}) => {
  if (!showControls) return null;
  
  return (
    <div className="mb-4">
      <label htmlFor="sort" className="font-bold text-[#86198f] mr-2">Sort by:</label>
      <select
        id="sort"
        className="p-2 rounded bg-white text-black border border-gray-700"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        <option value="none">None</option>
        <option value="rating-desc">Rating (High to Low)</option>
        <option value="rating-asc">Rating (Low to High)</option>
        <option value="year-desc">Year (Newest to Oldest)</option>
        <option value="year-asc">Year (Oldest to Newest)</option>
      </select>
    </div>
  );
};

export default SortControls;