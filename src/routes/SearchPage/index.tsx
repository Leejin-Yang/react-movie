import { useState, FormEvent, ChangeEvent } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styles from './SearchPage.module.scss';

import MovieItem from 'components/MovieItem';
import { SearchIcon } from 'assets/svgs';
import { getMovieListApi } from 'services/movie';
import { movieListState } from 'states/movie';

const NO_RESULT = '검색 결과가 없습니다.';

const SearchPage = () => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [movieList, setMovieList] = useRecoilState(movieListState);
  const resetMovieList = useResetRecoilState(movieListState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getMovieListApi({ s: searchWord, page: 1 })
      .then((res) => res.data)
      .then((data) => {
        if (data.Response === 'False') {
          resetMovieList();
          return;
        }

        setMovieList(data.Search);
      });
  };

  const handleSearchWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  return (
    <>
      <header className={styles.searchForm}>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='제목 검색' onChange={handleSearchWordChange} />
          <button type='submit'>
            <SearchIcon className={styles.icon} />
          </button>
        </form>
      </header>
      <section className={styles.searchList}>
        {!movieList.length && <span className={styles.noResult}>{NO_RESULT}</span>}
        <ul>{movieList && movieList.map((movie) => <MovieItem key={movie.imdbID} movie={movie} />)}</ul>
      </section>
    </>
  );
};

export default SearchPage;
