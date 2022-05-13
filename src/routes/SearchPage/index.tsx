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

const SearchPage = () => {
  const [isLoading, setIsLoding] = useState<boolean>(false);
  const [movieList, setMovieList] = useRecoilState(movieListState);
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);

  const [searchParams] = useSearchParams();
  const [ref, inView] = useInView();

  const currentSearch = searchParams.get('s');

  const getMovieList = useCallback(async () => {
    if (!currentSearch) return;

    setIsLoding(true);
    await getMovieListApi({ s: currentSearch, page: pageNumber })
      .then((res) => res.data)
      .then((data) => {
        if (data.Response === 'False') {
          ref(null);
          return;
        }

        setMovieList((prev) => [...prev, ...data.Search]);
      });
    setIsLoding(false);
  }, [currentSearch, pageNumber, ref, setMovieList]);

  useMount(() => {
    getMovieList();
  });

  useEffect(() => {
    if (inView) {
      setPageNumber((prev) => prev + 1);
    }
  }, [inView, setPageNumber]);

  useUpdateEffect(() => {
    getMovieList();
  }, [getMovieList]);

  return (
    <>
      <header className={styles.header}>
        <div />
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
      </header>
      <section className={styles.searchList}>
        {!movieList.length && !isLoading && <span className={styles.noResult}>{NO_RESULT}</span>}
        {movieList && (
          <ul>
            {movieList.map((movie, index) => {
              const key = `${movie.imdbID}-${index}`;

              return <MovieItem key={key} movie={movie} />;
            })}
          </ul>
        )}
        {isLoading && <Spinner />}
        {currentSearch && movieList.length !== 0 && <div ref={ref} />}
      </section>
    </>
  );
};

export default SearchPage;
