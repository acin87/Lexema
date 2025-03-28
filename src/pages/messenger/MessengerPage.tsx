import { Box, Paper } from '@mui/material';
import { FC, memo } from 'react';
import MessangerPanel from '../../features/messenger/components/MessangerPanel';

const MessengerPage: FC = () => {
    return (
        <Paper sx={{position: 'relative', overflow: 'hidden', height: 'calc(100vh - 155px)', transition: 'height  0.2s ease', m: '2rem'}}>
            <Box sx={{ display: 'flex', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <MessangerPanel />
                {/* <DialogueList /> */}
            </Box>
        </Paper>
    );
};

export default memo(MessengerPage);
