import { Avatar, Box, CardMedia, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import useProfile from '../../../entities/profile/hooks/useProfile';
import useCheckImages from '../../../shared/hooks/useCheckImages';
import styles from './Profile.module.css';

interface ProfileHeaderProps {
    id: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ id }) => {
    const { response } = useProfile(Number(id));
    const { avatarImage, mainImage } = useCheckImages(response?.images);

    return (
        <Box className={styles.profileHeader}>
            <Box className={styles.profileHeaderCard}>
                <Box>
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            alt=""
                            height="140"
                            src={mainImage}
                            sx={{ maxHeight: '100%' }}
                        />
                    </Box>
                    <Box className={styles.profileHeadDetail}>
                        <Box className={styles.profileHeadImg}>
                            <Avatar
                                sx={{ width: 130, height: 130 }}
                                src={avatarImage}
                                aria-label="avatar"
                            ></Avatar>
                        </Box>
                        <Box className={styles.profileHeadUserName}>
                            <Typography variant="h3">
                                {response?.user.first_name} {response?.user.last_name}
                            </Typography>
                        </Box>
                    </Box>
                    <Stack className={styles.profileHeadInfo} direction="row" spacing={2} sx={{ textAlign: 'center', backgroundColor: 'background.paper' }}>
                        <Box>
                            <Typography variant="body2">Постов</Typography>
                            <Typography variant="subtitle2">{response?.posts_count} </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">Друзей</Typography>
                            <Typography variant="subtitle2">{response?.friends_count}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2">Подписок</Typography>
                            <Typography variant="subtitle2">{response?.groups_count}</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(ProfileHeader);
