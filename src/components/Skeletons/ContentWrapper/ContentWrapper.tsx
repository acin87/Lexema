import { Skeleton, Stack } from '@mui/material';
import { FC, memo } from 'react';

const ContentWrapper: FC = memo(() => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <Stack spacing={1} width={'100%'} flexGrow={1} marginTop={2}>
                <Skeleton
                    width={'100%'}
                    height={500}
                    variant="rounded"
                    animation="pulse"
                    sx={{ backgroundColor: 'rgb(211 210 210 / 51%)' }}
                />
            </Stack>
        </div>
    );
});
export default ContentWrapper;
