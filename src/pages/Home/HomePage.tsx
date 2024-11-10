import { Box } from '@mui/material';
import { FC, memo } from 'react';
import PostsList from '../PostsList/PostsList';
import styles from './HomePage.module.css';

const HomePage: FC = memo(() => {
    return (
        <Box className={styles.row}>
            <PostsList />
            <Box className={styles.col4}></Box>
        </Box>
    );
});

export default HomePage;
