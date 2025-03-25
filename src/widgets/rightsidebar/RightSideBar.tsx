import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Paper } from '@mui/material';
import { FC, memo } from 'react';

import styles from './RightSideBar.module.css';

const RightSideBar: FC = memo(() => {
    const toggleSidebar = () => {
        document.querySelector('body')?.classList.toggle('right-sidebar-close');
        document.querySelector(`.${styles.rightSidebarMini}`)?.classList.toggle(`${styles.rightSidebar}`);
    };

    return (
        <Paper className={styles.rightSidebarMini} sx={{ transition: 'all 0.3s ease-in-out' }}>
            <div className={styles.rightSidebarPanel}>
                <div className="card shadow-none">
                    <div className="card-body p-0">
                        <div className={styles.mediaHeight}></div>
                        <Box
                            className={styles.rightSidebarToggle}
                            sx={{ backgroundColor: 'primary.main' }}
                            onClick={toggleSidebar}
                        >
                            <KeyboardArrowLeftIcon className={styles.sideLeftIcon} sx={{ color: 'secondary.light' }} />
                            <KeyboardArrowRightIcon
                                className={styles.sideRightIcon}
                                sx={{ color: 'secondary.light' }}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </Paper>
    );
});
export default RightSideBar;
