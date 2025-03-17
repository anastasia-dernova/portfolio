export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;
}
  
export interface SearchResults {
    results: Movie[];
    total_results: number;
    total_pages: number;
}