import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftSideBarProps } from '../Sidebar/LeftSidebar/LeftSideBar';
import styles from './Menu.module.css';

const Menu: FC<LeftSideBarProps> = memo((hidden: LeftSideBarProps) => {
    const isVisible = hidden.hidden;
    const navigate = useNavigate();
    return (
        <div className={styles.menuList}>
            <div className={styles.menuWrap}>
                <List component="nav">
                    <ListItemButton className={styles.menuItem} onClick={() => navigate('/')}>
                        <ListItemIcon sx={{ minWidth: isVisible ? '24px' : '56px' }}>
                            <OtherHousesOutlinedIcon className={styles.svgIcon} />
                        </ListItemIcon>
                        <ListItemText
                            {...hidden}
                            primary="Моя страница"
                            sx={{ whiteSpace: 'nowrap' }}
                            className="listItem"
                        />
                    </ListItemButton>
                    <div className={styles.menuGap}></div>
                    <ListItemButton className={styles.menuItem} onClick={() => navigate('friends')}>
                        <ListItemIcon sx={{ minWidth: isVisible ? '24px' : '56px' }}>
                            <PeopleAltOutlinedIcon className={styles.svgIcon} />
                        </ListItemIcon>
                        <ListItemText {...hidden} primary="Друзья" sx={{ whiteSpace: 'nowrap' }} />
                    </ListItemButton>
                </List>
            </div>
        </div>
    );
});
export default Menu;
