import { Card, CardActions, CardContent, CardHeader, Skeleton } from '@mui/material';
import { FC } from 'react';
import styles from './Comment.module.css';

const CommentSkeleton: FC = () => {
    return (
        <Card className={styles.skeletonContainer} sx={{boxShadow: 'none', pb: 0}}>
            <CardHeader
                className={styles.commentHeader}
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={<Skeleton variant="text" width={200} />}
                subheader={<Skeleton variant="text" width={150} />}
            />
            <CardContent className={styles.skeletonContent}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 1 }} />
            </CardContent>
            <CardActions className={styles.skeletonActions}>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
            </CardActions>
        </Card>
    );
};

export default CommentSkeleton;
