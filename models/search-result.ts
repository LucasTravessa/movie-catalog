export type SearchResult<T> = {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
};
