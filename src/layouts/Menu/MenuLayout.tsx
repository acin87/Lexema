import { Menu } from '../../components/Menu/Menu';
import { Navbar } from '../../components/Navbar/Navbar';
import styles from './MenuLayout.module.css';
import { Outlet } from 'react-router-dom';

export const MenuLayout = () => {
    return (
        <div className={styles.lsLayout}>
            <Menu></Menu>

            <div className={styles.lsWrapper}>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};
