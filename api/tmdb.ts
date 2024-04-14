import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from 'models/movie';
import { SearchResult } from 'models/search-result';

//endpoints
const baseUrl = 'https://api.themoviedb.org/3';

export const image500 = (path: string) => (path ? `https://image.tmdb.org/t/p/w500${path}` : '');
export const image342 = (path: string) => (path ? `https://image.tmdb.org/t/p/w342${path}` : '');
export const image185 = (path: string) => (path ? `https://image.tmdb.org/t/p/w185${path}` : '');

const trendingMoviesEndPoint = `${baseUrl}/trending/movie/day`;
const upComingMoviesEndPoint = `${baseUrl}/movie/upcoming`;
const topRatedMoviesEndPoint = `${baseUrl}/movie/top_rated`;

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
    const response = await apiCall(upComingMoviesEndPoint);
    // console.log(response);

    return response;
  }
  static async topRatedMovies(): Promise<SearchResult<Movie>> {
    return await apiCall(topRatedMoviesEndPoint);
  }
}
