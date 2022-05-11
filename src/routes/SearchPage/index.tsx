import { FormEvent } from 'react';

import { SearchIcon } from 'assets/svgs';
import styles from './SearchPage.module.scss';
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
          {MOCK_DATA.Search.map((item) => (
            <li key={item.imdbID}>
              <img src={item.Poster} alt={item.Title} className={styles.moviePoster} />
              <div className={styles.movieInfo}>
                <span>{item.Title}</span>
                <span>{item.Year}</span>
                <span>{item.Type}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SearchPage;
