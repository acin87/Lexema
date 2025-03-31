import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import { Box, Card, CardHeader, Divider, IconButton, Popover, SxProps, Tooltip, Typography } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoute, SiteAppRoutePath } from '../../app/routes/Config';
import { AppDispatch, RootState } from '../../app/store/store';
import { uiActions } from '../../app/store/uiSlice';
import { logout } from '../../features/auth/slice/authSlice';
import { selectUser } from '../../entities/user/slice/userSlice';
import Avatar from '../../shared/ui/avatar/Avatar';
import ThemeSwitcher from '../../shared/ui/themeSwitcher/ThemeSwitcher';
const itemMenuStyles: SxProps = {
    width: '2.813rem',
    height: '2.813rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
};
/**
 * Компонент для отображения настроек пользователя
 * @returns Компонент для отображения настроек пользователя
 */
const UserSettings: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const themeState = useSelector((s: RootState) => s.ui.theme) ?? 'Светлая';
    const [theme, setTheme] = useState<string>(themeState);

    useEffect(() => {
        dispatch(uiActions.setTheme(theme));
    }, [theme, dispatch]);

    const user = useSelector(selectUser);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        navigate(SiteAppRoutePath[AppRoute.AUTH]);
        dispatch(logout());
    };

    const handleThemeChange = () => {
        setTheme(theme === 'Светлая' ? 'Темная' : 'Светлая');
    };

    const styles: SxProps = {
        minWidth: '10.75rem',
        width: '18.75rem',
    };
    return (
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
                <Avatar src={user.avatar} />
            </IconButton>
            <Popover
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ marginTop: '4.563rem' }}
            >
                <Card sx={{ ...styles }}>
                    <CardHeader
                        title={user.first_name + ' ' + user.last_name}
                        sx={{ backgroundColor: 'primary.main' }}
                        action={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={theme}>
                                    <ThemeSwitcher size="small" defaultChecked onChange={handleThemeChange} />
                                </Tooltip>
                                <Tooltip title="Выйти">
                                    <IconButton onClick={handleLogout}>
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
                        onClick={() =>
                            navigate(SiteAppRoutePath[AppRoute.PROFILE].replace(':id', user.id.toString()) + '?tab=1')
                        }
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
                        onClick={() =>
                            navigate(SiteAppRoutePath[AppRoute.PROFILE].replace(':id', user.id.toString()) + '?tab=3')
                        }
                    />
                </Card>
            </Popover>
        </Box>
    );
};

export default memo(UserSettings);
