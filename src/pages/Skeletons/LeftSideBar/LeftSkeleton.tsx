import { Skeleton, Stack } from '@mui/material';
import { FC, memo } from 'react';

const LeftSkeleton: FC = memo(() => {
    return (
        <Stack spacing={2}>
            <Skeleton variant="rounded" width={270} height={65} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={35} animation="wave" />
            <Skeleton variant="rectangular" width={270} height={300} animation="wave" />
        </Stack>
    );
});
export default LeftSkeleton;
