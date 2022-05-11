import { Routes, Route } from 'react-router-dom';

import SearchPage from './SearchPage';
import FavoritesPage from './FavoritesPage';
import Layout from 'components/Layout';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<SearchPage />} />
        <Route path='favorites' element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
