import { Box } from '@mui/material';
import { FC, memo } from 'react';
import PostList from '../features/feed/components/PostList';
import styles from '../shared/styles/FeedPage.module.css';
import { UpcomingBirthday } from '../widgets/birthday/UpcomingBirthday';

const FeedPage: FC = memo(() => {
    return (
        <Box className={styles.row}>
            <PostList />
            <Box className={styles.col4}>
                <UpcomingBirthday />
            </Box>
        </Box>
    );
});

export default FeedPage;
