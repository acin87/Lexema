import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, Button, CSSObject, Modal, Paper, Typography } from '@mui/material';
import { FC, memo, useState } from 'react';
import DropZone from '../dropZoneArea/DropZone';

interface CreatePostsProps {
    title: string;
}

const CreatePosts: FC<CreatePostsProps> = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const style: CSSObject = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 5,
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
                <Box sx={{ ...style }}>
                    <Typography sx={{textAlign: 'center'}} variant='h5' component='div'>Новый пост</Typography>
                    <Box sx={{ p: 1 }}>
                        <DropZone></DropZone>
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
};

export default memo(CreatePosts);
