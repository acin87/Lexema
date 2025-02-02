import { Box } from '@mui/material';
import ProfileHeader from '../features/profile/components/ProfileHeader';
import { FC } from 'react';
import ProfileBody from '../features/profile/components/ProfileBody';

const ProfilePage: FC = () => {
    return (
        <Box>
            <ProfileHeader />
            <ProfileBody />
        </Box>
    );
};

export default ProfilePage;
