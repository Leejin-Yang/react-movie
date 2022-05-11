import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';
import Tab from 'components/Tab';

const Layout = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Tab />
    </div>
  );
};

export default Layout;
