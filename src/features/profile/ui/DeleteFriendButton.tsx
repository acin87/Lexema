import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { FriendStatus } from '../../friends/types/FriendTypes';
import styles from './Profile.module.css';

interface DeleteFriendButtonProps {
    id: number;
    handleRemoveFriend: (id: number) => void;
    text: string;
    friendStatus: FriendStatus;
}

const DeleteFriendButton: FC<DeleteFriendButtonProps> = ({ id, handleRemoveFriend, text, friendStatus }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteFriend = () => {
        handleRemoveFriend(id);
    };
    return (
        <Box className={styles.friendMenuContainer}>
            <IconButton
                id="add-friend-button"
                onMouseOver={handleOpen}
                aria-owns={open ? 'simple-menu' : undefined}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
            >
                <HowToRegIcon color="primary" />
                {friendStatus === FriendStatus.PENDING && (
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        Запрос отправлен
                    </Typography>
                )}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                id="simple-menu"
                slotProps={{list: {onMouseLeave: handleClose}}}
                disableScrollLock={true}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleDeleteFriend}>
                    <Box className={styles.friendMenuItem}>
                        <PersonRemoveIcon color="primary" />
                        <Typography variant="body2">{text}</Typography>
                    </Box>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default DeleteFriendButton;
