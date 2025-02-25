import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';

//интерфейс для пропсов, открытие и закрытие панели
interface MenuProps {
    open: boolean | undefined;
}

const Menu: FC<MenuProps> = memo((open) => {
    const navigate = useNavigate();
    const menuItems = [
        {
            path: '/',
            icon: <OtherHousesOutlinedIcon className={styles.svgIcon} />,
            text: 'Моя страница',
        },
        {
            path: '/friends',
            icon: <PeopleAltOutlinedIcon className={styles.svgIcon} />,
            text: 'Друзья',
        },
        {
            path: '/dialogues',
            icon: <ChatOutlinedIcon className={styles.svgIcon} />,
            text: 'Диалоги',
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
