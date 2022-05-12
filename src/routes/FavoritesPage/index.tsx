import styles from './FavoritesPage.module.scss';

import { MOCK_DATA } from 'assets/data/mock';
import MovieItem from 'components/MovieList/MovieItem';

const PAGE_TITLE = '내 즐겨찾기';

const FavoritesPage = () => {
  return (
    <>
      <header className={styles.title}>
        <h1>{PAGE_TITLE}</h1>
      </header>
      <section className={styles.favoritesList}>
        <ul>
          {MOCK_DATA.Search.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default FavoritesPage;
