import { Skeleton, Stack } from '@mui/material';
import { FC, memo } from 'react';

const RightSkeleton: FC = memo(() => {
    return (
        <Stack spacing={2}>
            <Skeleton
                variant="rounded"
                width={270}
                height={300}
                animation="wave"
                sx={{ backgroundColor: 'rgb(211 210 210 / 51%)' }}
            />

            <Skeleton
                variant="rounded"
                width={270}
                height={300}
                animation="wave"
                sx={{ backgroundColor: 'rgb(211 210 210 / 51%)' }}
            />
        </Stack>
    );
});
export default RightSkeleton;
