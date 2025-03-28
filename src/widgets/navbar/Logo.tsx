import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store/store';
import { uiActions } from '../../shared/ui/uiSlice';

/**
 * Компонент для отображения логотипа
 * @returns Компонент для отображения логотипа
 */
const Logo: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const toggleMenu = () => {
        dispatch(uiActions.toggleSidebar());
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.938rem', flexGrow: 1 }}>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.938rem' }}>
                <Box
                    component="img"
                    src="/src/assets/icons/favicon2.png"
                    alt="Lexema"
                    width="2.813rem"
                    height="2.813rem"
                    sx={{ filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));' }}
                ></Box>
                <Typography component="span" fontSize="1.75rem" sx={{ flex: 1 }}>
                    Lexema
                </Typography>
            </NavLink>
            <IconButton onClick={toggleMenu}>
                <MenuOutlinedIcon />
            </IconButton>
        </Box>
    );
};

export default Logo;
