import { Box, Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import { FC } from 'react';
import PostSkeleton from '../../../../oldFiles/PostSkeleton';
import styles from './Profile.module.css';

const ProfileSkeleton: FC = () => {
    return (
        <>
            <Box className={styles.profileHeader}>
                <Box className={styles.profileHeaderCard}>
                    <Box>
                        <Box sx={{ position: 'relative' }}>
                            <Skeleton variant="rectangular" height={140} />
                        </Box>
                        <Box className={styles.profileHeadDetail}>
                            <Box className={styles.profileHeadImg}>
                                <Skeleton variant="circular" width={130} height={130} />
                            </Box>
                            <Box
                                className={styles.profileHeadUserName}
                                sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                            >
                                <Skeleton variant="text" width={200} height={32} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ pl: 2 }}>
                                <Skeleton variant="text" width={100} height={40} />
                            </Box>
                            <Box className={styles.profileHeadInfo}>
                                <Box sx={{ display: 'flex', gap: 4 }}>
                                    <Box>
                                        <Skeleton variant="text" width={60} height={20} />
                                        <Skeleton variant="text" width={40} height={24} />
                                    </Box>
                                    <Box>
                                        <Skeleton variant="text" width={60} height={20} />
                                        <Skeleton variant="text" width={40} height={24} />
                                    </Box>
                                    <Box>
                                        <Skeleton variant="text" width={60} height={20} />
                                        <Skeleton variant="text" width={40} height={24} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, p: 0 }}>
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                        <Skeleton variant="rectangular" width="100%" height="48px" />
                    </CardContent>
                </Card>
            </Box>
            <Box className={styles.profileWall}>
                <Box className={styles.profileWidgets}>
                    <Card>
                        <CardHeader
                            avatar={<Skeleton variant="circular" width={40} height={40} />}
                            title={<Skeleton variant="text" width={200} />}
                        />
                        <CardContent>
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            avatar={<Skeleton variant="circular" width={40} height={40} />}
                            title={<Skeleton variant="text" width={200} />}
                        />
                        <CardContent>
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 1 }} />
                        </CardContent>
                    </Card>
                </Box>

                <Box className={styles.profilePosts}>
                    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                        <CardContent>
                            <Skeleton variant="text" width={150} height={36} />
                        </CardContent>
                    </Card>
                    <PostSkeleton />
                    <PostSkeleton />
                </Box>
            </Box>
        </>
    );
};

export default ProfileSkeleton;
