import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from 'models/movie';
import { MovieCredits } from 'models/movie-credits';
import { MovieDetails } from 'models/movie-details';
import { PersonDetails } from 'models/person-details';
import { PersonMovieCredits } from 'models/person-movie-credits';
import { SearchResult } from 'models/search-result';

//endpoints
const baseUrl = 'https://api.themoviedb.org/3';

export const image500 = (path: string) => (path ? `https://image.tmdb.org/t/p/w500${path}` : '');
export const image342 = (path: string) => (path ? `https://image.tmdb.org/t/p/w342${path}` : '');
export const image185 = (path: string) => (path ? `https://image.tmdb.org/t/p/w185${path}` : '');

const trendingMoviesEndPoint = `${baseUrl}/trending/movie/day`;
const upComingMoviesEndPoint = `${baseUrl}/movie/upcoming`;
const topRatedMoviesEndPoint = `${baseUrl}/movie/top_rated`;

const movieDetailsEndPoint = (id: string) => `${baseUrl}/movie/${id}`;
const movieCreditsEndPoint = (id: string) => `${baseUrl}/movie/${id}/credits`;
const similarMoviesEndPoint = (id: string) => `${baseUrl}/movie/${id}/similar`;

const personDetailsEndPoint = (id: string) => `${baseUrl}/person/${id}`;
const personMoviesEndPoint = (id: string) => `${baseUrl}/person/${id}/movie_credits`;

async function apiCall(endpoint: string, params?: any) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
    params: params || {},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
  };

  try {
    const resp = await axios.request(options);
    return resp.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export class TmdbService {
  static async trendingMovies(): Promise<SearchResult<Movie>> {
    return await apiCall(trendingMoviesEndPoint);
  }
  static async upComingMovies(): Promise<SearchResult<Movie>> {
    return await apiCall(upComingMoviesEndPoint);
  }
  static async topRatedMovies(): Promise<SearchResult<Movie>> {
    return await apiCall(topRatedMoviesEndPoint);
  }
  static async movieDetailsByID(id: number): Promise<MovieDetails> {
    return await apiCall(movieDetailsEndPoint(String(id)));
  }
  static async movieCreditsByID(id: number): Promise<MovieCredits> {
    return await apiCall(movieCreditsEndPoint(String(id)));
  }
  static async similarMoviesByID(id: number): Promise<SearchResult<Movie>> {
    return await apiCall(similarMoviesEndPoint(String(id)));
  }
  static async personDetailsByID(id: number): Promise<PersonDetails> {
    return await apiCall(personDetailsEndPoint(String(id)));
  }
  static async personMoviesByID(id: number): Promise<PersonMovieCredits> {
    return await apiCall(personMoviesEndPoint(String(id)));
  }
}
