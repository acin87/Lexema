import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Badge, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoute, SiteAppRoutePath } from '../../app/routes/Config';
import { uiActions } from '../../app/store/uiSlice';
import { selectUser } from '../../entities/user/slice/userSlice';
import useNotificationsBadge from '../../features/notifications/hooks/useNotifcationBadge';
import styles from './Menu.module.css';
import { AppDispatch } from '../../app/store/store';
import GroupsIcon from '@mui/icons-material/Groups';
/**
 * Интерфейс для пропсов, открытие и закрытие панели
 */
export interface MenuProps {
    open: boolean | undefined;
}

/**
 * Меню для навигации по приложению
 * @param open - открытие и закрытие панели
 * @returns Меню для навигации по приложению
 */
const Menu: FC<MenuProps> = memo((open) => {
    const navigate = useNavigate();
    const id = useSelector(selectUser).id;
    const dispatch = useDispatch<AppDispatch>();
    const { count: friendshipNotificationsCount } = useNotificationsBadge(['friend_request', 'friend_accepted']);
    const { count: messageNotificationsCount } = useNotificationsBadge(['new_message']);

    const handleNavigate = (path: string) => {
        dispatch(uiActions.toggleSidebar());
        navigate(path);
    };

    const menuItems = [
        {
            path: SiteAppRoutePath[AppRoute.PROFILE].replace(':id', String(id)),
            icon: <AccountBoxOutlinedIcon className={styles.svgIcon} />,
            text: 'Профиль',
        },
        {
            path: SiteAppRoutePath[AppRoute.HOME],
            icon: <DynamicFeedIcon className={styles.svgIcon} />,
            text: 'Стена',
        },
        {
            path: SiteAppRoutePath[AppRoute.FRIENDS],
            icon: (
                <Badge badgeContent={friendshipNotificationsCount} color="primary">
                    <PeopleAltOutlinedIcon className={styles.svgIcon} />
                </Badge>
            ),
            text: 'Друзья',
        },
        {
            path: SiteAppRoutePath[AppRoute.MESSENGER],
            icon: (
                <Badge badgeContent={messageNotificationsCount} color="primary">
                    <ChatOutlinedIcon className={styles.svgIcon} />
                </Badge>
            ),
            text: 'Сообщения',
        },
        {
            path: SiteAppRoutePath[AppRoute.COMMUNITIES],
            icon: <GroupsIcon className={styles.svgIcon} />,
            text: 'Сообщества',
        },
    ];
    return (
        <MenuList>
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    className={styles.ListItem}
                    sx={{ pl: 2, py: 1, pr: 0, justifyContent: 'space-between' }}
                    onClick={() => handleNavigate(item.path)}
                >
                    <ListItemIcon
                        sx={[
                            {
                                minWidth: 0,
                                justifyContent: 'center',
                            },
                            open
                                ? {
                                      mr: 3,
                                  }
                                : {
                                      mr: 'auto',
                                  },
                        ]}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.text}
                        sx={[
                            open
                                ? {
                                      opacity: 1,
                                  }
                                : {
                                      opacity: 0,
                                  },
                        ]}
                    />
                </MenuItem>
            ))}
        </MenuList>
    );
});
export default memo(Menu);
