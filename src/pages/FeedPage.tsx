import { Box } from '@mui/material';
import { FC } from 'react';
import Posts from '../features/feed/ui/mainFeed/MainFeed';
import useDocumentTitle from '../shared/hooks/useDocumentTitle';
import useScrollPosition from '../shared/hooks/useScrollPosition';
import styles from '../shared/styles/FeedPage.module.css';
import UpcomingBirthday from '../widgets/birthday/UpcomingBirthday';
/**
 * Страница ленты
 * @returns Страница ленты
 */
const FeedPage: FC = () => {
    useScrollPosition('FeedPage');
    useDocumentTitle('Lexema | Лента новостей');
    return (
        <Box className={styles.row}>
            <Posts context="profile" />
            <Box className={styles.col4}>
                <UpcomingBirthday />
            </Box>
        </Box>
    );
};

export default FeedPage;
