import { NavLink } from 'react-router-dom';
import { cx } from 'styles';
import styles from './Tab.module.scss';

import { SearchIcon, FavoriteIcon } from 'assets/svgs';

const Tab = () => {
  return (
    <nav className={styles.tab}>
      <ul className={styles.tabMenus}>
        <li>
          <NavLink to='' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <SearchIcon className={styles.icon} />
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <FavoriteIcon className={styles.icon} />
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Tab;
