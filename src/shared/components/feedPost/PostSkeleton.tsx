import { Box, Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import { FC } from 'react';

const PostSkeleton: FC = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', marginBottom: '1rem' }}>
                <CardHeader
                    avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                    title={<Skeleton animation="wave" width={200} height={24} />}
                    subheader={<Skeleton animation="wave" width={100} height={20} />}
                />
                <CardContent>
                    <Skeleton animation="wave" height={60} />
                    <Box sx={{ mt: 2 }}>
                        <Skeleton animation="wave" height={200} />
                    </Box>
                </CardContent>
                <Box sx={{ px: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Skeleton animation="wave" width={60} height={36} />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default PostSkeleton;
