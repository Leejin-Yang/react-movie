import { useRecoilState } from 'recoil';
import { useMount } from 'react-use';
import styles from './FavoritesPage.module.scss';

import MovieList from 'components/MovieList';
import { favoriteMovieListState } from 'states/movie';
import { FAVORITE_MOVIE_KEY, getLocalStorage } from 'services/store';

const PAGE_TITLE = '내 즐겨찾기';

const FavoritesPage = () => {
  const [favoriteMovieList, setFavoriteMovieList] = useRecoilState(favoriteMovieListState);

  useMount(() => {
    setFavoriteMovieList((prev) => {
      const localMovieList = getLocalStorage(FAVORITE_MOVIE_KEY);

      if (!localMovieList) return prev;

      return localMovieList;
    });
  });

  return (
    <>
      <header className={styles.title}>
        <h1>{PAGE_TITLE}</h1>
      </header>
      <section className={styles.favoritesList}>
        {favoriteMovieList && <MovieList movieList={favoriteMovieList} />}
      </section>
    </>
  );
};

export default FavoritesPage;
