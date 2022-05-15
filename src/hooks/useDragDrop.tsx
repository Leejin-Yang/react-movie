import { DragEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

import { favoriteMovieListState } from 'states/movie';
import { FAVORITE_MOVIE_KEY, setLocalStorage } from 'services/store';

const useDragDrop = () => {
  const [grab, setGrab] = useState<HTMLElement>();
  const [favoriteMovieList, setFavoriteMovieList] = useRecoilState(favoriteMovieListState);

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    setGrab(e.currentTarget);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: DragEvent<HTMLElement>) => {
    e.dataTransfer.dropEffect = 'move';
    setGrab(undefined);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    const grabPosition = Number(grab?.dataset.position);
    const targetPosition = Number(e.currentTarget.dataset.position);

    const newList = [...favoriteMovieList];
    newList[grabPosition] = newList.splice(targetPosition, 1, newList[grabPosition])[0];

    setFavoriteMovieList(newList);
    setLocalStorage(FAVORITE_MOVIE_KEY, newList);
  };

  return { handleDragOver, handleDragStart, handleDragEnd, handleDrop };
};

export default useDragDrop;
