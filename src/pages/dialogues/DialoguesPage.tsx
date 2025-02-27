import { Box, Container, Paper } from '@mui/material';
import { FC, memo } from 'react';
import DialoguesPanel from '../../features/dialogue/components/DialoguePanel';
import DialogueList from '../../features/dialogue/components/DualogueList';

const DialouesPage: FC = () => {
    return (
        <Paper sx={{position: 'relative', overflow: 'hidden', height: 'calc(100vh - 155px)', transition: 'height  0.2s ease', m: '2rem'}}>
            <Box sx={{ display: 'flex', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <DialoguesPanel />
                {/* <DialogueList /> */}
            </Box>
        </Paper>
    );
};

export default memo(DialouesPage);
