import { Movie } from './movie';
import { TvShow } from './tv-show';

export type Person = {
  id: number;
  name: string;
  profile_path: string | null;
  adult: boolean;
  popularity: number;
  known_for: Movie[] | TvShow[];
};
