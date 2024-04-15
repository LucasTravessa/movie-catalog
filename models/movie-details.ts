import { Collection } from './collection';
import { Company } from './company';
import { Country } from './country';
import { Genre } from './genre';
import { Language } from './language';
import { Movie } from './movie';

export type MovieDetails = Movie & {
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
};
