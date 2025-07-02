import { Avatar, Box, CardMedia, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import useDocumentTitle from '../../../shared/hooks/useDocumentTitle';
import checkImages from '../../../shared/utils/ImageUtils';
import { checkUrl } from '../../../shared/utils/Utils';
import useProfile from '../hooks/useProfile';
import FriendActions from './FriendActions';
import styles from './Profile.module.css';

const ProfileHeader: React.FC = () => {
    const { id } = useParams();
    const profileOwnerId = Number(id);
    const { response } = useProfile(profileOwnerId);
    const user_id = useSelector(selectUserId);
    const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const { mainImage } = checkImages(response?.profile_image);

    useDocumentTitle(`Lexema | Профиль - ${response?.full_name}`);

    const isOwner = user_id === profileOwnerId;

    return (
        <Box className={styles.profileHeader}>
            <Box className={styles.profileHeaderCard}>
                <Box>
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia component="img" alt="" height="140" src={mainImage} sx={{ maxHeight: '100%' }} />
                    </Box>
                    <Box className={styles.profileHeadDetail}>
                        <Box className={styles.profileHeadImg}>
                            <Avatar
                                sx={{ width: 130, height: 130 }}
                                src={response?.avatar && checkUrl(response?.avatar)}
                                aria-label="avatar"
                            ></Avatar>
                        </Box>
                        <Box className={styles.profileHeadUserName}>
                            <Typography variant="h3">
                                {response?.full_name ? response?.full_name : response?.username}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {isOwner ? <></> : <FriendActions user_id={profileOwnerId} profile={response} />}
                        <Box className={styles.profileHeadInfo}>
                            <Stack direction="row" spacing={2} sx={{ textAlign: 'center', width: '100%', justifyContent: !isMediumScreen ? 'space-evenly' : 'flex-end' }}>
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
            </Box>
        </Box>
    );
};

export default memo(ProfileHeader);
