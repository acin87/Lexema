import { Box } from '@mui/material';
import { FC, memo } from 'react';
import UpcomingBirthday from '../../../widgets/birthday/UpcomingBirthday';
import ProfilePosts from '../../feed/ui/profileFeed/ProfileFeed';
import styles from './Profile.module.css';

/**
 * Компонент для отображения ленты постов пользователя
 * @param profileOwnerId - Идентификатор владельца профиля
 * @returns Лента постов пользователя
 */
const ProfileBody: FC = () => {
    return (
        <Box className={styles.profileWall}>
            <Box className={styles.profileWidgets}>
                <Box>
                    <UpcomingBirthday />
                </Box>
            </Box>
            <Box className={styles.profilePosts}>
                <ProfilePosts />
            </Box>
        </Box>
    );
};

export default memo(ProfileBody);
