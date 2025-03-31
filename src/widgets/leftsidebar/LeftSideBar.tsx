import { styled, SxProps, Theme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { uiActions } from '../../app/store/uiSlice';
import Menu from '../menu/Menu';
const drawerWidth = 250;

const openedMixin = (): SxProps => ({
    width: drawerWidth,
    transition: 'all 0.3s ease-in-out',
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): SxProps => ({
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

/**
 * Левая боковая панель
 * @returns {React.ReactElement}
 */
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
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

/**
 * Левая боковая панель
 * @returns React.ReactElement
 */
const LeftSideBar: FC = () => {
    const dispatch = useDispatch();
    const openFromStore = useSelector((s: RootState) => s.ui.sidebar);

    const [isHovered, setIsHovered] = useState(false);

    const isOpen = openFromStore || isHovered;

    const handleBlur = () => {
        dispatch(uiActions.toggleSidebar());
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={isOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                handleBlur();
            }}
            onBlur={handleBlur}
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
            <Menu open={isOpen} />
        </Drawer>
    );
};

export default LeftSideBar;
