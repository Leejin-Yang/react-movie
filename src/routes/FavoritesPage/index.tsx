import { useRecoilValue } from 'recoil';
import styles from './FavoritesPage.module.scss';

import MovieList from 'components/MovieList';
import { favoriteMovieListState } from 'states/movie';

const PAGE_TITLE = '내 즐겨찾기';

const FavoritesPage = () => {
  const favoriteMovieList = useRecoilValue(favoriteMovieListState);
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
