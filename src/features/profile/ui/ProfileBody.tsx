import { Box, Theme, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import AdvertisingWidget from '../../../widgets/advertising/AdvertisingWidget';
import UpcomingBirthday from '../../../widgets/birthday/UpcomingBirthday';
import NotificationWidget from '../../../widgets/notificationWidget/NotificationWidget';
import ProfilePosts from '../../feed/ui/profileFeed/ProfileFeed';
import styles from './Profile.module.css';

/**
 * Компонент для отображения ленты постов пользователя
 * @returns Лента постов пользователя
 */
const ProfileBody: FC = () => {
    const params = useParams();
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    const userId = useSelector(selectUserId);

    const isOwner = userId === Number(params.id);
    return (
        <Box className={styles.profileWall}>
            <Box
                className={styles.profileWidgets}
                sx={{
                    position: isLargeScreen ? 'sticky' : 'relative',
                    alignSelf: 'flex-start',
                    top: isLargeScreen ? 'calc(4.563rem + 0.938rem)' : '0',
                    transition: 'all 0.3s ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                {isOwner ? (
                    <>
                        <UpcomingBirthday />
                        <NotificationWidget />
                        <AdvertisingWidget />
                    </>
                ) : <AdvertisingWidget />}
            </Box>
            <Box className={styles.profilePosts}>
                <ProfilePosts />
            </Box>
        </Box>
    );
};

export default ProfileBody;
