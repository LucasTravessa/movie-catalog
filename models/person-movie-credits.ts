import { Language } from './language';

export type PersonMovieCredits = {
  cast: PersonMovieCredit[];
  crew: PersonMovieCredit[];
  id: number;
};

export type PersonMovieCredit = {
  overview: string;
  release_date?: string;
  adult: boolean;
  backdrop_path: null | string;
  vote_count: number;
  genre_ids: number[];
  id: number;
  original_language: Language | string;
  original_title: string;
  poster_path: null | string;
  title: string;
  video: boolean;
  vote_average: number;
  popularity: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
};
