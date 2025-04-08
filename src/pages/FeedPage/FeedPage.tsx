import { Box } from '@mui/material';
import cn from 'classnames';
import { FC } from 'react';
import Posts from '../../features/feed/ui/mainFeed/MainFeed';
import useDocumentTitle from '../../shared/hooks/useDocumentTitle';
import useScrollPosition from '../../shared/hooks/useScrollPosition';
import UpcomingBirthday from '../../widgets/birthday/UpcomingBirthday';
import styles from './FeedPage.module.css';
/**
 * Страница ленты
 * @returns Страница ленты
 */
const FeedPage: FC = () => {
    useScrollPosition('FeedPage');
    useDocumentTitle('Lexema | Лента новостей');
    return (
        <Box className={cn(styles.flex, styles.row, styles.flexWrap__wrap)}>
            <Posts context="profile" />
            <Box className={styles.col4}>
                <UpcomingBirthday />
            </Box>
        </Box>
    );
};

export default FeedPage;
