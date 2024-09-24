import { IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styles from './Menu.module.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';

export const Menu = () => {
    return (
        <div className={styles.lsMenu}>
            <div className={styles.lsHead}>
                <div className={styles.headIconWrap}>
                    <a href="/">
                        <img src="src/assets/icons/favicon.png" alt="SocialSite" className={styles.siteIcon} />
                    </a>
                    <span className={styles.siteTitle}>Lexema</span>
                </div>
                <IconButton>
                    <ArrowBackOutlinedIcon sx={{ color: '#f2f5f6' }} />
                </IconButton>
            </div>
            <div className={styles.menuList}>
                <div className={styles.menuWrap}>
                    <List component='nav'>
                        <ListItemButton>
                            <ListItemIcon>
                                <OtherHousesOutlinedIcon sx={{color: '#f2f5f6'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Моя страница" />
                        </ListItemButton>
                    </List>
                </div>
            </div>
        </div>
    );
};
