import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { forwardRef, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../entities/user/types/User';
import style from './FriendView.module.css';

export const FriendView = forwardRef<HTMLDivElement, User>((user, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={style.friendUserRow} ref={ref} id={String(user.id)}>
                <div className={style.friendUserPhoto}>
                    <img src={user.image} alt={user.firstName} />
                </div>
                <div className={style.friendUserInfo}>
                    <div className={style.friendTitle}>
                        <span>
                            <NavLink to={`user/${user.id}`}>
                                {user.firstName} {user.lastName}
                            </NavLink>
                        </span>
                        <span>{user.university}</span>
                    </div>
                </div>
                <div className={style.uiAction}>
                    <Button
                        color="inherit"
                        sx={{ padding: 0 }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <LinearScaleOutlinedIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Просмотр друзей</MenuItem>
                        <MenuItem onClick={handleClose}>Удалить из друзей</MenuItem>
                    </Menu>
                </div>
            </div>
            <Divider />
        </div>
    );
});
