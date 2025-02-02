import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftSideBarProps } from '../leftsidebar/LeftSideBar';
import styles from './Menu.module.css';

const Menu: FC<LeftSideBarProps> = memo((hidden: LeftSideBarProps) => {
    const isVisible = hidden.hidden;
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
    ];
    return (
        <div className={styles.menuList}>
            <div className={styles.menuWrap}>
                <List component="nav">
                    {menuItems.map((item, index) => (
                        <ListItemButton key={index} className={styles.menuItem} onClick={() => navigate(item.path)}>
                            <ListItemIcon sx={{ minWidth: isVisible ? '24px' : '56px' }}>{item.icon}</ListItemIcon>
                            <ListItemText {...hidden} primary={item.text} sx={{ whiteSpace: 'nowrap' }} />
                        </ListItemButton>
                    ))}
                </List>
            </div>
        </div>
    );
});
export default Menu;
