import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CssThemeVariables,
    Divider,
    IconButton,
    InputAdornment,
    Popover,
    styled,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { FC, memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import { NavLink } from 'react-router-dom';
import { AppDispatch } from '../../app/store/store';
import ThemeSwitcher from '../../shared/components/themeSwitcher/ThemeSwitcher';
import { uiActions } from '../../shared/ui/uiSlice';

//TODO: викинуть обработку инпута в модель
const Navbar: FC = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState('Светлая');
    const toggleMenu = () => {
        dispatch(uiActions.toggleSidebar());
    };
    const handleThemeChange = () => {
        setTheme(theme === 'Светлая' ? 'Темная' : 'Светлая');
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const DrawerHeader = styled('div')(({ theme }) => ({
        position: 'sticky',
        top: 0,
        left: 'auto',
        right: 'auto',
        display: 'flex',
        alignItems: 'center',
        padding: '0 0.938rem',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        minHeight: '4.563rem',
        lineHeight: '4.563rem',
        zIndex: 1000,
        boxShadow: '0 0 1.25rem 0 rgba(0, 0, 0, 0.1)',
    }));

    const animated: CssThemeVariables = {
        position: 'absolute',
        top: '4.563rem',
        right: 0,
        zIndex: 1000,
        width: '18.75rem',
        minWidth: '10rem',
        display: open ? 'block' : 'none',
        backgroundColor: 'background.paper',
        animation: 'fadeInBottom .6s cubic-bezier(.39,.575,.565,1)',

        '@keyframes fadeInBottom': {
            from: {
                opacity: 0,
                transform: 'translateY(50px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)',
            },
        },
    };
    const itemMenuStyles: CssThemeVariables = {
        width: '2.813rem',
        height: '2.813rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
    };

    return (
        <DrawerHeader>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.938rem',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.938rem', flexGrow: 1 }}>
                    <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.938rem' }}>
                        <Box
                            component="img"
                            src="/src/assets/icons/favicon.png"
                            alt="Lexema"
                            width="2.813rem"
                            height="2..813rem"
                        ></Box>
                        <Typography component="span" fontSize="1.75rem" sx={{ flex: 1 }}>
                            Lexema
                        </Typography>
                    </NavLink>
                    <IconButton onClick={toggleMenu}>
                        <MenuOutlinedIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '30rem',
                        flexGrow: 2,
                        '@media (max-width: 600px)': { display: 'none' },
                        '@media (max-width: 900px)': { display: 'none' },
                    }}
                >
                    <TextField
                        size="small"
                        variant="outlined"
                        sx={{ width: '30rem', backgroundColor: 'rgba(80, 181, 255, .2)' }}
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
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        position: 'relative',
                    }}
                    component="nav"
                >
                    <IconButton onClick={handleOpen}>
                        <Avatar src="/src/assets/icons/avatar.jpg" />
                    </IconButton>
                    <Popover
                        open={open}
                        
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        sx={{ ...animated }}
                    >
                        <Card>
                            <CardHeader
                                title="UserName"
                                sx={{ backgroundColor: 'primary.main' }}
                                action={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title={theme}>
                                            <ThemeSwitcher size="small" defaultChecked onChange={handleThemeChange} />
                                        </Tooltip>
                                        <Tooltip title="Выйти">
                                            <IconButton>
                                                <LogoutOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            />
                            <CardHeader
                                avatar={
                                    <Box sx={{ ...itemMenuStyles, backgroundColor: 'rgba(80, 181, 255, .1)' }}>
                                        <AccountBoxOutlinedIcon sx={{ color: '#48a3e6' }} />
                                    </Box>
                                }
                                sx={{ cursor: 'pointer', ':hover': { backgroundColor: 'rgba(80, 181, 255, .1)' } }}
                                title={<Typography variant="body1">Моя страница</Typography>}
                                subheader={<Typography variant="subtitle2">Просмотр страницы</Typography>}
                            />
                            <Divider />
                            <CardHeader
                                avatar={
                                    <Box sx={{ ...itemMenuStyles, backgroundColor: 'rgba(255, 186, 104, .1)' }}>
                                        <PersonAddAltOutlinedIcon sx={{ color: '#e6a75e' }} />
                                    </Box>
                                }
                                sx={{ cursor: 'pointer', ':hover': { backgroundColor: 'rgba(255, 186, 104, .1)' } }}
                                title="Профиль"
                                subheader={<Typography variant="subtitle2">Редкатировать профиль</Typography>}
                            />
                            <Divider />
                            <CardHeader
                                avatar={
                                    <Box sx={{ ...itemMenuStyles, backgroundColor: 'rgba(213, 146, 255, .1)' }}>
                                        <SettingsApplicationsOutlinedIcon sx={{ color: '#c083e6' }} />
                                    </Box>
                                }
                                sx={{ cursor: 'pointer', ':hover': { backgroundColor: 'rgba(213, 146, 255, .1)' } }}
                                title="Настройки"
                                subheader={<Typography variant="subtitle2">Настройки страницы</Typography>}
                            />
                        </Card>
                    </Popover>
                </Box>
            </Box>
        </DrawerHeader>
    );
});
export default Navbar;
