import { Paper } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import Menu from '../../Menu/Menu';
import styles from './LeftSideBar.module.css';

/**
 * Тип для скрытия левой панели
 */
export type LeftSideBarProps = {
    hidden?: boolean;
};

const LeftSideBar: FC = memo(() => {
    const sidebar = useSelector((s: RootState) => s.ui.sidebar);
    useEffect(() => {
        if (sidebar != undefined) {
            toggleSidebar();
        }
    }, [sidebar]);

    const toggleSidebar = () => {
        document.querySelector(`.${styles.lsSidebar}`)?.classList.toggle(`${styles.lsSidebarMini}`);
    };

    return (
        <Paper className={styles.lsSidebar}>
            <div className={styles.sidebar_header}></div>
            <Menu />
        </Paper>
    );
});
export default LeftSideBar;
