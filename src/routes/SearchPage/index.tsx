import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { useMount, useUpdateEffect } from 'react-use';
import { useInView } from 'react-intersection-observer';
import styles from './SearchPage.module.scss';

import SearchForm from 'components/SearchForm';
import MovieItem from 'components/MovieItem';
import Spinner from 'components/Spinner';
import { getMovieListApi } from 'services/movie';
import { movieListState, pageNumberState } from 'states/movie';

const NO_RESULT = '검색 결과가 없습니다.';
const TOO_MANY_RESULT = '검색 결과가 많습니다.';
const NET_ERROR = '현재 검색이 불가능합니다.';

const SearchPage = () => {
  const [isLoading, setIsLoding] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(NO_RESULT);
  const [movieList, setMovieList] = useRecoilState(movieListState);
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);

  const [searchParams] = useSearchParams();
  const [ref, inView] = useInView();

  const currentSearch = searchParams.get('s');

  const getMovieList = useCallback(() => {
    if (!currentSearch) return;

    setIsLoding(true);
    getMovieListApi({ s: currentSearch, page: pageNumber })
      .then((res) => res.data)
      .then((data) => {
        if (data.Response === 'False') {
          if (data.Error === 'Too many results.') {
            setErrorMessage(TOO_MANY_RESULT);
          }

          setErrorMessage(NO_RESULT);
          ref(null);
          return;
        }

        setMovieList((prev) => [...prev, ...data.Search]);
      })
      .catch(() => {
        setErrorMessage(NET_ERROR);
      })
      .finally(() => setIsLoding(false));
  }, [currentSearch, pageNumber, ref, setMovieList]);

  useMount(getMovieList);

  useEffect(() => {
    if (!inView) return;

    setPageNumber((prev) => prev + 1);
  }, [inView, setPageNumber]);

  useUpdateEffect(() => {
    getMovieList();
  }, [getMovieList]);

  return (
    <>
      <header className={styles.header}>
        <div aria-label='hidden' />
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
      </header>
      <section className={styles.searchList}>
        {movieList && (
          <ul>
            {movieList.map((movie, index) => {
              const key = `search-list-${movie.imdbID}-${index}`;

              return (
                <li key={key} className={styles.movieItem}>
                  <MovieItem movie={movie} />
                </li>
              );
            })}
          </ul>
        )}
        {isLoading && <Spinner />}
        {!isLoading && movieList.length === 0 && <span className={styles.noResult}>{errorMessage}</span>}
        {currentSearch && movieList.length > 0 && <div ref={ref} />}
      </section>
    </>
  );
};

export default SearchPage;
