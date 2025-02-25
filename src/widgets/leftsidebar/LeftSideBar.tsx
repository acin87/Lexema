import { CssThemeVariables, styled, Theme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import Menu from '../menu/Menu';

const drawerWidth = 250;

const openedMixin = (): CssThemeVariables => ({
    width: drawerWidth,
    transition: 'all 0.3s ease-in-out',
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CssThemeVariables => ({
    transition: 'all 0.3s ease-in-out',
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    '@media (max-width: 1299px)': {
        zIndex: 99,
        left: '-260px',
        transition: 'all 0.3s ease-in-out',
    },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    width: drawerWidth,
    zIndex: 1000,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(),
                '& .MuiDrawer-paper': openedMixin(),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        },
    ],
}));

const LeftSideBar: FC = () => {
    const open = useSelector((s: RootState) => s.ui.sidebar);
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            PaperProps={{
                sx: {
                    top: '4.688rem',
                    width: 270,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    zIndex: 1000,
                },
            }}
        >
            <Menu open={open} />
        </Drawer>
    );
};

export default LeftSideBar;
