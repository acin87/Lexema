import { Box } from '@mui/material';
import { FC, memo } from 'react';
import PostsList from '../PostsList/PostsList';
import styles from './HomePage.module.css';
import { UpcomingBirthday } from '../../widgets/birthday/UpcomingBirthday';

const HomePage: FC = memo(() => {
    return (
        <Box className={styles.row}>
            <PostsList />
            <Box className={styles.col4}>
                <UpcomingBirthday />
            </Box>
        </Box>
    );
});

export default HomePage;
