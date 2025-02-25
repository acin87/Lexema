import { Box, Card, Skeleton } from '@mui/material';
import { FC, memo } from 'react';

const FriendViewSkeleton: FC = () => {
    return (
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', p: 0 }}>
            <Box sx={{ position: 'relative' }}>
                <Skeleton variant="rectangular" width="100%" height="80px" />
            </Box>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: '1 1 auto',
                }}
            >
                <Skeleton variant="circular" width="120px" height="120px" sx={{ mt: '-4.75rem' }} />
                <Box sx={{ pb: 2, pt: 2 }}>
                    <Skeleton variant="text" width="100px" height="20px" />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: '100%',
                        '& > div': { textAlign: 'center' },
                    }}
                >
                    <Skeleton variant="text" width="100px" height="20px" />
                </Box>
            </Box>
        </Card>
    );
};

export default memo(FriendViewSkeleton);
