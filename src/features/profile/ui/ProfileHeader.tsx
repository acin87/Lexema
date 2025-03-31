import { Avatar, Box, CardMedia, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import useDocumentTitle from '../../../shared/hooks/useDocumentTitle';
import checkImages from '../../../shared/utils/ImageUtils';
import useProfile from '../hooks/useProfile';
import FriendActions from './FriendActions';
import styles from './Profile.module.css';

const ProfileHeader: React.FC = () => {
    const {id} = useParams();
    const profileOwnerId = Number(id);
    const { response } = useProfile(profileOwnerId);
    const user_id = useSelector(selectUserId);

    const { avatarImage, mainImage } = checkImages(response?.images);

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
                            <Avatar sx={{ width: 130, height: 130 }} src={avatarImage} aria-label="avatar"></Avatar>
                        </Box>
                        <Box className={styles.profileHeadUserName}>
                            <Typography variant="h3">{response?.full_name}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {isOwner ? <></> : <FriendActions user_id={profileOwnerId} profile={response} />}
                        <Box className={styles.profileHeadInfo}>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ textAlign: 'center', backgroundColor: 'background.paper' }}
                            >
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
