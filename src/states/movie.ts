import { atom } from 'recoil';
import { IMovieList } from 'types/movie';

export const movieListState = atom<IMovieList[]>({
  key: '#movieListState',
  default: [],
});

export const pageNumberState = atom<number>({
  key: '#pageNumberState',
  default: 1,
});
