import { Box } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProfileBody from '../features/profile/components/ProfileBody';
import ProfileHeader from '../features/profile/components/ProfileHeader';
const ProfilePage: FC = () => {
    const { id } = useParams();
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ProfileHeader id={Number(id)} />
            <ProfileBody id={Number(id)} />
        </Box>
    );
};

export default ProfilePage;
