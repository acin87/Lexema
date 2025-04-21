import { Box, Paper } from '@mui/material';
import cn from 'classnames';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Chat.module.css';
import SortWidget from './SortWidget';


/**
 * Компонент-обертка для отображения чата
 * @returns JSX.Element
 */
const ChatLayout: FC = () => {
    return (
        <Box className={cn(styles.chatContainer, styles.flex, styles.row, styles.flexWrap__wrap)}>
            <Box className={cn(styles.flex, styles.chatWrapper, styles.chatList, styles.col8)} sx={{ mb: 2 }}>
                <Paper className={cn(styles.flex, styles.col, styles.chatFeature)}>
                    <Outlet />
                </Paper>
            </Box>
            <Box className={styles.col4}>
                <SortWidget />
            </Box>
        </Box>
    );
};

export default ChatLayout;
