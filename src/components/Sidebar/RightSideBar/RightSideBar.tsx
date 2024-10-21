import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Paper, useTheme } from '@mui/material';
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
        <Paper className={styles.rightSidebarMini} sx={{ transition: 'all 0.3s ease-in-out' }}>
            <div className={styles.rightSidebarPanel}>
                <div className="card shadow-none">
                    <div className="card-body p-0">
                        <div className={styles.mediaHeight}>
                            <Button variant="contained" onClick={toggleTheme}>
                                Toggle
                            </Button>
                        </div>
                        <Box
                            className={styles.rightSidebarToggle}
                            sx={{ backgroundColor: theme.palette.primary.main }}
                            onClick={toggleSidebar}
                        >
                            <KeyboardArrowLeftIcon
                                className={styles.sideLeftIcon}
                                sx={{ color: theme.palette.secondary.light }}
                            />
                            <KeyboardArrowRightIcon
                                className={styles.sideRightIcon}
                                sx={{ color: theme.palette.secondary.light }}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </Paper>
    );
});
export default RightSideBar;
