import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import styles from './Profile.module.css';

interface AddFriendButtonProps {
    id: number;
    handleAddFriend: (id: number) => void;
}

const AddFriendButton: FC<AddFriendButtonProps> = ({ id, handleAddFriend }) => {
    return (
        <Box className={styles.friendActionsContainer}>
            <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<AddIcon sx={{ fontSize: '10px' }} />}
                title="Добавить в друзья"
                onClick={() => handleAddFriend(id)}
            >
                <Typography variant="subtitle2">Добавить в друзья</Typography>
            </Button>
        </Box>
    );
};

export default AddFriendButton;
