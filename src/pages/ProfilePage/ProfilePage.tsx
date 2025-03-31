import { Box } from '@mui/material';
import { FC, memo } from 'react';
import ProfileHeader from '../../features/profile/ui/ProfileHeader';
import ProfileBody from '../../features/profile/ui/ProfileTabs';
// import ProfileSkeleton from '../../features/profile/components/ProfileSkeleton';

/**
 * Компонент страницы профиля
 * @returns JSX.Element
 */
const ProfilePage: FC = () => {
    // return <ProfileSkeleton />;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ProfileHeader />
            <ProfileBody />
        </Box>
    );
};

export default memo(ProfilePage);
