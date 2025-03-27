import ReplyIcon from '@mui/icons-material/Reply';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { usePostButtonAction } from '../../hooks/usePostButtonAction';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../entities/user/slice/userSlice';

const RepostButton = ({ original_post_id }: { original_post_id: number }) => {
  
    const [context, setContext] = useState<'profile' | 'group'>('profile');
    const [group_id, setGroupId] = useState<number | undefined>(undefined);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { handleCreatePost } = usePostButtonAction({ context, group_id });
    const user_id = useSelector(selectUserId);

    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        handleCloseMenu();
    };

    const handleRepostPost = async () => {
        await handleCreatePost(user_id, undefined, undefined, original_post_id);
    };

    return (
        <>
            <Tooltip title="Поделиться">
                <Button
                    size="small"
                    sx={{ color: 'primary.main', '&:hover': { color: 'error.main' } }}
                    onClick={handleOpenMenu}
                >
                    <ReplyIcon />
                </Button>
            </Tooltip>
            <Menu
                open={open}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleRepostPost}>
                    <Typography>Себе на страницу</Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenDialog}>
                    <Typography>В группу</Typography>
                </MenuItem>
            </Menu>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Выберите группу</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название группы"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RepostButton;
