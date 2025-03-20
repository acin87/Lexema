import { Box } from '@mui/material';
import ProfileHeader from '../features/profile/components/ProfileHeader';
import { FC } from 'react';
import ProfileBody from '../features/profile/components/ProfileBody';
import { useParams } from 'react-router-dom';
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
