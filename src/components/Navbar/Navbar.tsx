import { IconButton, InputAdornment, TextField } from '@mui/material';
import styles from './navbar.module.css';
import { EmailOutlined, NotificationsOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { FC, memo } from 'react';

//TODO: викинуть обработку инпута в модель
const Navbar: FC = memo(() => {
    return (
        <>
            <nav className={styles.lsNavBar}>
                <div className={styles.lsNavBarWrap}>
                    <div className="nav-start-wrap">
                        <div className={styles.inputWrapper}>
                            <TextField
                                className={styles.formControl}
                                size="small"
                                variant="outlined"
                                sx={{ width: '30ch' }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            ></TextField>
                        </div>
                    </div>
                    <div className={styles.navEndWrap}>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <IconButton href="/mail" size="small">
                                    <EmailOutlined />
                                </IconButton>
                            </li>
                            <li className={styles.navItem}>
                                <IconButton href="/notification" size="small">
                                    <NotificationsOutlined />
                                </IconButton>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#">
                                    <div className={styles.avatarWrap}>
                                        <img src="src/assets/icons/avatar.jpg" alt="avatar" className={styles.avatar} />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
});
export default Navbar;
