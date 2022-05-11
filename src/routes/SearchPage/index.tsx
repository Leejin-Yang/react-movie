import { FormEvent } from 'react';
import styles from './SearchPage.module.scss';

import MovieItem from 'components/MovieItem';
import { SearchIcon } from 'assets/svgs';
import { MOCK_DATA } from 'assets/data/mock';

const NO_RESULT = '검색 결과가 없습니다.';

const SearchPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <>
      <header className={styles.searchForm}>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='제목 검색' />
          <button type='submit'>
            <SearchIcon className={styles.icon} />
          </button>
        </form>
      </header>
      <section className={styles.searchList}>
        {!MOCK_DATA.Search.length && <span className={styles.noResult}>{NO_RESULT}</span>}
        <ul>
          {MOCK_DATA.Search.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default SearchPage;
