import { SearchIcon } from 'assets/svgs';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  return (
    <main className={styles.searchPage}>
      <form className={styles.searchForm}>
        <input type='text' placeholder='제목 검색' />
        <button type='submit'>
          <SearchIcon className={styles.icon} />
        </button>
      </form>
    </main>
  );
};

export default SearchPage;
