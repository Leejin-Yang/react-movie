import { Routes, Route } from 'react-router-dom';
import styles from './Routes.module.scss';

import SearchPage from './SearchPage';
import FavoritesPage from './FavoritesPage';
import Tab from 'routes/_shared/Tab';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.page}>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='favorites' element={<FavoritesPage />} />
        </Routes>
      </div>
      <Tab />
    </div>
  );
};

export default App;
