import { Box, Theme, useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { FC } from 'react';
import Posts from '../../features/feed/ui/mainFeed/MainFeed';
import useDocumentTitle from '../../shared/hooks/useDocumentTitle';
import useScrollPosition from '../../shared/hooks/useScrollPosition';
import AdvertisingWidget from '../../widgets/advertising/AdvertisingWidget';
import UpcomingBirthday from '../../widgets/birthday/UpcomingBirthday';
import styles from './FeedPage.module.css';
import WeatherWidget from '../../widgets/weather/WeatherWidget';
/**
 * Страница ленты
 * @returns Страница ленты
 */
const FeedPage: FC = () => {
    useScrollPosition('FeedPage');
    useDocumentTitle('Lexema | Лента новостей');
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    return (
        <Box
            className={cn(styles.flex, styles.row, styles.flexWrap__wrap)}
            sx={{
                alignItems: 'flex-start',
                minHeight: 0,
            }}
        >
            <Posts context="profile" />
            <Box
                className={cn(styles.col4, styles.flex)}
                sx={{
                    height: 'fit-content',
                    position: 'relative',
                }}
            >
                <Box
                    className={styles.widgets}
                    sx={{
                        position: isLargeScreen ? 'fixed' : 'relative',
                        top: isLargeScreen ? 'calc(4.563rem + 0.938rem)' : 0,
                        display: 'flex',
                        flexDirection: isMediumScreen ? 'column' : 'row',
                        gap: '1rem',
                    }}
                >
                    <UpcomingBirthday />
                    <WeatherWidget />
                    <AdvertisingWidget />
                    
                </Box>
            </Box>
        </Box>
    );
};

export default FeedPage;
