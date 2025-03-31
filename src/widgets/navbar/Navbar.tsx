import { Box, styled } from '@mui/material';
import { FC, memo } from 'react';
import Logo from './Logo';
import UserSettings from './UserSettings';
import SearchAutocomplete from './SearchAutocomplete';
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
                <SearchAutocomplete />
                <UserSettings />
            </Box>
        </DrawerHeader>
    );
});
export default Navbar;
