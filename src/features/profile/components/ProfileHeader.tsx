import { Avatar, Box, CardMedia, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import useProfile from '../../../entities/user/hooks/useProfile';
import styles from './Profile.module.css';

const ProfileHeader: React.FC = () => {
    const { id } = useParams();
    const { user } = useProfile(Number(id));

    return (
        <Box className={styles.profileHeader}>
            <Box className={styles.profileHeaderCard}>
                <Box>
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="/src/assets/images/profile-bg1.jpg"
                            sx={{ height: '100%' }}
                        />
                    </Box>
                    <Box className={styles.profileHeadDetail}>
                        <Box className={styles.profileHeadImg}>
                            <Avatar sx={{ width: 130, height: 130 }} src="/src/assets/icons/avatar.jpg" aria-label="avatar"></Avatar>
                        </Box>
                        <Box className={styles.profileHeadUserName}>
                            <Typography variant="h3">
                                {user?.firstName} {user?.lastName}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack className={styles.profileHeadInfo} direction="row" spacing={2} sx={{ textAlign: 'center' }}>
                        <Box>
                            <Typography variant="body2">Постов</Typography>
                            <Typography variant="subtitle2">556</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">Друзей</Typography>
                            <Typography variant="subtitle2">125</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">Подписок</Typography>
                            <Typography variant="subtitle2">182</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(ProfileHeader);
