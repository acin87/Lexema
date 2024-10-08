import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import LeftSideBarAsync from '../../components/Sidebar/LeftSidebar/LeftSideBarAsync';
import RightSideBar from '../../components/Sidebar/RightSideBar/RightSideBar';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
    return (
        <div className={styles.lsLayout}>
            <LeftSideBarAsync />
            <div className={styles.lsWrapper}>
                <Navbar />
                <Outlet />
            </div>
            <RightSideBar />
        </div>
    );
};
