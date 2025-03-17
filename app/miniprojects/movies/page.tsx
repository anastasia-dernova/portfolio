'use client';
import { useMemo, useState} from 'react';
import Image from 'next/image';
import {Movie, SearchResults} from './types';
import SortControls, { sortMovies, SortOption } from './SortControls';
import MovieDetail from './MovieDetail';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const searchMovies = async () => {
    if (!query.trim()) return;

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    
    if (!apiKey) {
      setError('API key is missing. Please check your environment configuration.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false`
      );
      const data: SearchResults = await response.json();
      
      if (!response.ok) {
        throw new Error(data.results ? 'Error searching movies' : 'Failed to fetch movie data');
      }
      
      setMovies(data.results);
      if (data.results.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  const sortedMovies = useMemo(() => {
    return sortMovies(movies, sortOption);
  }, [movies, sortOption]);
  
  return (
    <div className="min-h-screen p-8 bg-[#f0fdf4] text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#86198f]">
          Movie Search
        </h1>
        <div className="flex flex-col gap-2 sm:flex-row mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
            placeholder="Search for movies..."
            className="flex-1 p-3 rounded-lg border border-gray-700 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={searchMovies}
            className="py-3 px-4 md:px-6 bg-[#86198f] text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-90 whitespace-nowrap"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <SortControls 
          sortOption={sortOption} 
          onSortChange={setSortOption} 
          showControls={movies.length > 0}
        />

        {error && (
          <div className="text-red-400 text-center mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-300">
            Searching for movies...
          </div>
        )}

        {sortedMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-[#D4D4D4] rounded-lg overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer" 
                onClick={() => setSelectedMovie(movie)}
              >
                <div key={movie.id} className="bg-[#D4D4D4] rounded-lg overflow-hidden transition-transform hover:-translate-y-2">
                  <div className="relative h-80 w-full">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-[#A3A3A3]">
                        <span className="text-black">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl text-[#404040] font-semibold mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-[#737373]">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        movie.vote_average >= 7 ? 'bg-green-900 text-green-100' : 
                        movie.vote_average >= 5 ? 'bg-yellow-900 text-yellow-100' : 
                        'bg-red-900 text-red-100'
                      }`}>
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-[#737373] text-sm line-clamp-3">{movie.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedMovie && (
          <MovieDetail 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default MovieSearch;