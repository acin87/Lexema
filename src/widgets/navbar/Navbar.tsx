import { EmailOutlined, NotificationsOutlined } from '@mui/icons-material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppDispatch, RootState } from '../../app/store/store';
import styles from './Navbar.module.css';
import { uiActions } from '../../shared/ui/uiSlice';

//TODO: викинуть обработку инпута в модель
const Navbar: FC = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const sidebar = useSelector((s: RootState) => s.ui.sidebar);
    //const jwt = loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null;
    // const { data } = useGetMeQuery({ jwt: jwt });

    //const loading = isFetching || isLoading;
    const toggleNavEnd = () => {
        document.querySelector(`.${styles.navBarEnd}`)?.classList.toggle(`${styles.show}`);
    };
    const toggleMenu = () => {
        document.querySelector(`.${styles.leftMenuCollapseBtn}`)?.classList.toggle('open');
        document.querySelector('body')?.classList.toggle('sidebar-main');
        dispatch(uiActions.toggleSlidebar(sidebar ? false : true));
    };

    return (
        <Paper className={styles.lsNavbar}>
            <div className={styles.lsNavbarWrap}>
                <div className={styles.navbarLogoWrap}>
                    <NavLink to="/">
                        <img src="/src/assets/icons/favicon.png" alt="Lexema" className={styles.siteIcon} />
                        <span>Lexema</span>
                    </NavLink>
                    <Button className={styles.leftMenuCollapseBtn} onClick={toggleMenu}>
                        <MenuOutlinedIcon />
                    </Button>
                </div>

                <div className={styles.navBarCenter}>
                    <div className={styles.inputWrapper}>
                        <TextField
                            className={styles.formControl}
                            size="small"
                            variant="outlined"
                            sx={{ width: '40ch' }}
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
                <Button className={styles.collapse} onClick={toggleNavEnd}>
                    <MenuOutlinedIcon />
                </Button>
                <Paper className={cn(styles.navBarEnd, styles.show)} sx={{ boxShadow: 'none' }}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <IconButton href="/mail" size="small" color="primary">
                                <EmailOutlined />
                            </IconButton>
                        </li>
                        <li className={styles.navItem}>
                            <IconButton href="/notification" size="small" color="primary">
                                <NotificationsOutlined />
                            </IconButton>
                        </li>
                        <li className={styles.navItem}>
                            <a href="#">
                                <div className={styles.avatarWrap}>
                                    <img src="/src/assets/icons/avatar.jpg" alt="avatar" className={styles.avatar} />
                                </div>
                            </a>
                        </li>
                    </ul>
                </Paper>
            </div>
        </Paper>
    );
});
export default Navbar;
