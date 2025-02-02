import { Box, Paper } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';


import styles from './LeftSideBar.module.css';
import { RootState } from '../../app/store/store';
import Menu from '../menu/Menu';

/**
 * Тип для скрытия левой панели
 */
export type LeftSideBarProps = {
    hidden?: boolean;
};

const LeftSideBar: FC = () => {
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
            <Box className={styles.sidebar_header}></Box>
            <Menu />
        </Paper>
    );
};
export default memo(LeftSideBar);
