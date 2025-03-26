import { Card, CardActions, CardContent, CardHeader, Skeleton } from '@mui/material';
import { FC } from 'react';

const CommentSkeleton: FC = () => {
    return (
        <Card sx={{ boxShadow: 'none', width: '100%', paddingBottom: 0 }}>
            <CardHeader
                sx={{ paddingBottom: 0 }}
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={<Skeleton variant="text" width={200} />}
                subheader={<Skeleton variant="text" width={150} />}
            />
            <CardContent sx={{ p: '16px 20px 5px 20px', '&:last-child': { pb: 0 } }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 1 }} />
            </CardContent>
            <CardActions sx={{ p: 0 }}>
                <Skeleton variant="text" width={100} />
            </CardActions>
        </Card>
    );
};

export default CommentSkeleton;
