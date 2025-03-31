import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Paper } from '@mui/material';
import { FC, useState } from 'react';
import AddPostModal from '../addPostModal/AddPostModal';
import styles from './AddPostButton.module.css';

interface AddPostButtonProps {
    context: 'profile' | 'group';
    group_id?: number;
}

const AddPostButton: FC<AddPostButtonProps> = ({ context, group_id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Paper className={styles.addPostContainer}>
            <Button startIcon={<PostAddIcon />} onClick={handleOpen}>
                Создать пост
            </Button>
            <AddPostModal
                open={open}
                onClose={handleClose}
                title="Новый пост"
                editMode={false}
                context={context}
                group_id={group_id}
            />
        </Paper>
    );
};

export default AddPostButton;
