import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, SiteAppRoutePath } from '../../app/routes/Config';
import styles from './Menu.module.css';
import { useSelector } from 'react-redux';
import { getUser } from '../../entities/auth/slice/authSlice';

//интерфейс для пропсов, открытие и закрытие панели
interface MenuProps {
    open: boolean | undefined;
}

const Menu: FC<MenuProps> = memo((open) => {
    const navigate = useNavigate();
    const id = useSelector(getUser).user_id ?? 0;
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
            icon: <PeopleAltOutlinedIcon className={styles.svgIcon} />,
            text: 'Друзья',
        },
        {
            path: SiteAppRoutePath[AppRoute.MESSENGER],
            icon: <ChatOutlinedIcon className={styles.svgIcon} />,
            text: 'Сообщения',
        },
    ];
    return (
        <List>
            {menuItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }} className={styles.ListItem}>
                    <ListItemButton
                        sx={[
                            {
                                minHeight: 48,
                                px: 2.5,
                            },
                            open
                                ? {
                                      justifyContent: 'initial',
                                  }
                                : {
                                      justifyContent: 'center',
                                  },
                        ]}
                        onClick={() => navigate(item.path)}
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
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
});
export default Menu;
