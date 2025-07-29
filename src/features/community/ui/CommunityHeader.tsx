import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import CommunityFormDialog from './CommunityFormDialog';
import { useCommunityActions } from '../hooks/useCommunityActions';

const CommunityHeader = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);

    const { createCommunity } = useCommunityActions();

    const handleCreate = async (data: FormData) => {
        const success = await createCommunity(data);
        if (success) {
            setOpenDialog(false);
        }
    };

    const onClose = () => {
        setOpenDialog(false);
    };
    return (
        <Box
            sx={{
                height: 200,
                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%,  ${theme.palette.primary.light} 90%)`,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                position: 'relative',
                width: '100%',
            }}
        >
            <Typography variant="h3" color="white">
                Сообщества
            </Typography>

            <Button
                variant="contained"
                color="secondary"
                sx={{ position: 'absolute', right: 20, bottom: 20 }}
                onClick={() => setOpenDialog(true)}
            >
                Создать сообщество
            </Button>
            <CommunityFormDialog
                open={openDialog}
                onClose={onClose}
                onSubmit={handleCreate}
            />
        </Box>
    );
};

export default CommunityHeader;
