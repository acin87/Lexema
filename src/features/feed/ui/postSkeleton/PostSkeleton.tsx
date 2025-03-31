import { Box, Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import { FC } from 'react';
import styles from './PostSkeleton.module.css';

const PostSkeleton: FC = () => {
    return (
        <Box className={styles.skeletonContainer}>
            <Card className={styles.skeletonCard}>
                <CardHeader
                    avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                    title={<Skeleton animation="wave" width={200} height={24} />}
                    subheader={<Skeleton animation="wave" width={100} height={20} />}
                />
                <CardContent>
                    <Skeleton animation="wave" height={60} />
                    <Box className={styles.skeletonImageContainer}>
                        <Skeleton animation="wave" height={200} />
                    </Box>
                </CardContent>
                <Box className={styles.skeletonActions}>
                    <Box className={styles.skeletonActionsContent}>
                        <Skeleton animation="wave" width={60} height={36} />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default PostSkeleton;
