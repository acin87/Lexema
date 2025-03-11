import { Box } from '@mui/material';
import { FC, memo } from 'react';
import PostList from '../features/feed/components/PostList';
import useScrollPosition from '../shared/hooks/useScrollPosition';
import styles from '../shared/styles/FeedPage.module.css';

const FeedPage: FC = memo(() => {
    useScrollPosition('FeedPage');
    return (
        <Box className={styles.row}>
            <PostList />
            <Box className={styles.col4}>{/* <UpcomingBirthday /> */}</Box>
        </Box>
    );
});

export default FeedPage;
