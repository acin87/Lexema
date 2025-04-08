import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { FC } from 'react';
import { checkUrl } from '../../../shared/utils/Utils';
import useAllFriends from '../../friends/hooks/useAllFriends';

interface ChatAddMenuProps {
    open: boolean;
    anchor: null | HTMLElement;
    onClose: () => void;
}

const ChatAddMenu: FC<ChatAddMenuProps> = ({ open, anchor, onClose }) => {
    const { friends, isSuccess, totalCount, isLoading } = useAllFriends(); //временно, или сделать компонент с поддержкой ref

    return (
        <Menu
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            MenuListProps={{
                onMouseLeave: onClose,
                'aria-labelledby': 'add-friend-button',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <MenuList>
                {friends.map((user, index) => {
                    return (
                        <MenuItem onClick={onClose} key={index}>
                            <ListItemIcon>
                                <Avatar
                                    src={user.images.avatar_image && checkUrl(user.images.avatar_image)}
                                    sx={{ mr: 1, width: '40px', height: '40px' }}
                                />
                            </ListItemIcon>
                            <ListItemText> {user.full_name} </ListItemText>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default ChatAddMenu;
