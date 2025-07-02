import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { FC, memo, useState } from 'react';
import { checkUrl } from '../../../shared/utils/Utils';
import useAllFriends from '../../friends/hooks/useAllFriends';
import { Friend } from '../../friends/types/FriendTypes';
import AddNewDialogue from './AddNewDialogue';

interface ChatAddMenuProps {
    open: boolean;
    anchor: null | HTMLElement;
    onClose: () => void;
}

/**
 * Компонент для добавления нового диалога
 * @param open - открытие и закрытие диалога
 * @param anchor - элемент, к которому прикрепляется меню
 * @param onClose - функция закрытия диалога
 * @returns
 */
const ChatAddMenu: FC<ChatAddMenuProps> = ({ open, anchor, onClose }) => {
    const { friends } = useAllFriends(); //временно, или сделать компонент с поддержкой ref
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState<Pick<Friend, 'friend_id' | 'avatar' | 'full_name' | 'last_login'> | undefined>();

    const handleOpen = (user: Pick<Friend, 'friend_id' | 'avatar' | 'full_name' | 'last_login'>) => {
        setOpenModal(true);
        setUser(user);
    };
    const handleClose = () => {
        setOpenModal(false);
        onClose();
    };

    return (
        <Menu
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {friends.map((user, index) => {
                return (
                    <MenuItem
                        onClick={() => handleOpen(user)}
                        key={index}
                        sx={{
                            '&.MuiMenuItem-root:not(:last-child)': {
                                borderBottom: '1px solid',
                                borderBottomColor: 'divider',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                src={user.avatar && checkUrl(user.avatar)}
                                sx={{ mr: 1, width: '40px', height: '40px' }}
                            />
                        </ListItemIcon>
                        <ListItemText> {user.full_name ? user.full_name : user.username} </ListItemText>
                    </MenuItem>
                );
            })}

            <AddNewDialogue open={openModal} onClose={handleClose} user={user} />
        </Menu>
    );
};

export default memo(ChatAddMenu);
