import React from 'react';
import Image from 'next/image';
import { Movie } from './types';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#D4D4D4] bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-[#737373] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 bg-opacity-80 hover:bg-red-700 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            {movie.poster_path ? (
              <div className="relative h-[450px] w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-contain rounded"
                />
              </div>
            ) : (
              <div className="h-[450px] w-full flex items-center justify-center bg-gray-800 rounded">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            
            <div className="mb-4 flex items-center">
              {movie.release_date && (
                <span className="mr-4">{new Date(movie.release_date).getFullYear()}</span>
              )}
              <span className={`px-2 py-1 rounded text-sm ${
                movie.vote_average >= 7 ? 'bg-green-900 text-green-100' : 
                movie.vote_average >= 5 ? 'bg-yellow-900 text-yellow-100' : 
                'bg-red-900 text-red-100'
              }`}>
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;