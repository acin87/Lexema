import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Paper } from '@mui/material';
import { useState } from 'react';
import AddPostModal from './AddPostModal';

const AddPostButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Paper sx={{ display: 'flex', width: '100%', p: 2, mb: 2, justifyContent: 'center' }}>
            <Button startIcon={<PostAddIcon />} onClick={handleOpen}>
                Создать пост
            </Button>
            <AddPostModal open={open} onClose={handleClose} title="Новый пост" editMode={false} />
        </Paper>
    );
};

export default AddPostButton;
