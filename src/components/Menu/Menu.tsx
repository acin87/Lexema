import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import cn from 'classnames';
import { FC, memo } from 'react';
import { LeftSideBarProps } from '../Sidebar/LeftSidebar/LeftSideBar';
import styles from './Menu.module.css';

const Menu: FC<LeftSideBarProps> = memo((hidden: LeftSideBarProps) => {
    return (
        <div className={styles.menuList}>
            <div className={styles.menuWrap}>
                <List component="nav">
                    <ListItemButton  className={styles.menuItem}>
                        <ListItemIcon sx={{ minWidth: hidden.hidden ? '24px' : '56px' }}>
                            <OtherHousesOutlinedIcon className={cn(styles.firstMenuIcon, styles.svgIcon)} />
                        </ListItemIcon>
                        <ListItemText {...hidden} primary="Моя страница" />
                    </ListItemButton>
                    <div className={styles.menuGap}></div>
                    <ListItemButton className={styles.menuItem} href="/friends" >
                        <ListItemIcon sx={{ minWidth: hidden.hidden ? '24px' : '56px' }}>
                            <PeopleAltOutlinedIcon className={cn(styles.menuIcon, styles.svgIcon)} />
                        </ListItemIcon>
                        <ListItemText {...hidden} primary="Друзья" />
                    </ListItemButton>
                </List>
            </div>
        </div>
    );
});
export default Menu;
