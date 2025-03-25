import { Box, InputAdornment, styled, TextField } from '@mui/material';
import { FC, memo } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Logo from './Logo';
import UserSettings from './UserSettings';

/**
 * Компонент для отображения навигации
 * @returns Компонент для отображения навигации
 */
const Navbar: FC = memo(() => {
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
                <Logo />
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
                <UserSettings />
            </Box>
        </DrawerHeader>
    );
});
export default Navbar;
