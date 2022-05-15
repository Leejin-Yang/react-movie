import axios from 'axios';
import { IMovieAPIRes } from 'types/movie.d';

const BASE_URL = 'https://www.omdbapi.com/';

interface Params {
  s: string;
  page: number;
}

export const getMovieListApi = (params: Params) =>
  axios.get<IMovieAPIRes>(`${BASE_URL}?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`, {
    params: {
      ...params,
    },
  });
