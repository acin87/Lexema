import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { FC, memo, useState } from 'react';
import DropZone from '../dropZoneArea/DropZone';

interface CreatePostsProps {
    title: string;
}

const CreatePosts: FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
        <Paper sx={{ display: 'flex', width: '100%', p: 2, mb: 2, justifyContent: 'center' }}>
            <Button startIcon={<PostAddIcon />} onClick={handleOpen}>
                Создать пост
            </Button>
            <Modal open={open} onClose={handleClose} component="div">
                <Box sx={{ ...style, width: '40%' }}>
                    <Typography sx={{textAlign: 'center'}} variant='body1' component='div'>Новый пост</Typography>
                    <Box sx={{ p: 2 }}>
                        <DropZone></DropZone>
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
};

export default memo(CreatePosts);
