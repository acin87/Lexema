import { Box } from '@mui/material';
import { FC, memo } from 'react';
import Posts from '../entities/post/components/Posts';
import { useInitProfile } from '../entities/profile/hooks/useInitProfile';
import useScrollPosition from '../shared/hooks/useScrollPosition';
import styles from '../shared/styles/FeedPage.module.css';
import UpcomingBirthday from '../widgets/birthday/UpcomingBirthday';
const FeedPage: FC = memo(() => {
    useScrollPosition('FeedPage');
    useInitProfile();
    return (
        <Box className={styles.row}>
            <Posts />
            <Box className={styles.col4}>
                <UpcomingBirthday />
            </Box>
        </Box>
    );
});

export default FeedPage;
