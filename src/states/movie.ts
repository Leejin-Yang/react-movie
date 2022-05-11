import { atom } from 'recoil';
import { IMovieList } from 'types/movie';

export const movieListState = atom<IMovieList[]>({
  key: '#movieListState',
  default: [],
});
