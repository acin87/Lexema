import { Button, Paper, useTheme } from '@mui/material';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../app/reducers/uiSlice/uiSlice';
import { AppDispatch, RootState } from '../../../app/store/store';
import styles from './RightSideBar.module.css';
const RightSideBar: FC = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const themeState = useSelector((s: RootState) => s.ui.theme);
    const theme = useTheme();
    const toggleTheme = () => {
        let darkOrLight = 'light';
        if (themeState === 'light') {
            darkOrLight = 'dark';
        }
        dispatch(uiActions.setTheme(darkOrLight));
    };

    const toggleSidebar = () => {
        document.querySelector('body')?.classList.toggle('right-sidebar-close');
        document.querySelector(`.${styles.rightSidebarMini}`)?.classList.toggle(`${styles.rightSidebar}`);
    };

    return (
        <Paper className={styles.rightSidebarMini} sx={{transition: 'all 0.3s ease-in-out'}}>
            <div className={styles.rightSidebarPanel}>
                <div className="card shadow-none">
                    <div className="card-body p-0">
                        <div className={styles.mediaHeight}>
                            <Button variant="contained" onClick={toggleTheme}>
                                Toggle
                            </Button>
                        </div>
                        <div
                            className={styles.rightSidebarToggle}
                            style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary }}
                            onClick={toggleSidebar}
                        >
                            <i className={cn('fa-solid fa-arrow-left', styles.sideLeftIcon)}></i>
                            <i className={cn('fa-solid fa-arrow-right', styles.sideRightIcon)}>
                                <span className="ms-3 d-inline-block ">43535</span>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
});
export default RightSideBar;
