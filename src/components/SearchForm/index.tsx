import { useState, FormEvent, ChangeEvent } from 'react';
import { useResetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import { movieListState, pageNumberState } from 'states/movie';

const PLACEHOLDER_TITLE = '👀   제목 검색   👀 ';

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const resetMovieList = useResetRecoilState(movieListState);
  const resetPageNumber = useResetRecoilState(pageNumberState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const currentSearch = searchParams.get('s');

    if (currentSearch === searchWord) return;

    resetMovieList();
    resetPageNumber();
    setSearchParams({ s: searchWord });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder={PLACEHOLDER_TITLE} onChange={handleChange} />
    </form>
  );
};

export default SearchForm;
