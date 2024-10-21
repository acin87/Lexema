import { createTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../app/store/store';
import Navbar from '../../components/Navbar/Navbar';
import LeftSideBarAsync from '../../components/Sidebar/LeftSidebar/LeftSideBarAsync';
import RightSideBar from '../../components/Sidebar/RightSideBar/RightSideBar';
import styles from './MainLayout.module.css';

export const MainLayout: FC = () => {
    const theme = useSelector((s: RootState) => s.ui.theme);
    const [darkOrLight, setDarkOrLight] = useState<string | null>('light');

    const loadTheme = () => {
        setDarkOrLight(theme);
    };

    useEffect(() => {
        loadTheme();
    }, [theme]);

    const darkTheme: ThemeOptions = {
        palette: {
            mode: 'dark',
            primary: {
                main: '#575d5f',
                dark: '#454744',
                light: '#575d5f',
                contrastText: '#8a8c91',
            },
            secondary: {
                main: '#777d74',
                dark: '#656a63',
                contrastText: '#ffffff',
            },
            background: {
                default: '#141414',
                paper: '#222222',
            },
            text: {
                primary: '#a0a0a0',
                secondary: '#a0a0a0',
            },
        },
        typography: {
            fontFamily: [
                'Montserrat',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ].join(','),
            h1: {
                fontSize: 'calc(1.39205rem + 1.7046vw)',
            },
            h2: {
                fontSize: 'calc(1.32625rem + 0.915vw)',
            },
            h3: {
                fontSize: 'calc(1.29589rem + 0.55065vw)',
            },
            h4: {
                fontSize: '1.225rem',
            },
            h5: {
                fontSize: '1.05rem',
            },
            h6: {
                fontSize: '875rem',
            },
        },
    };
    const lightTheme: ThemeOptions = {
        palette: {
            mode: 'light',
            primary: {
                main: '#50b5ff',
                dark: '#449ad9',
                light: '#50b5ff',
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#777d74',
                dark: '#656a63',
                contrastText: '#ffffff',
            },
            background: {
                default: '#f8f9fa',
                paper: '#ffffff',
            },
            text: {
                primary: '#3f414d',
                secondary: '#777d74',
            },
        },
        typography: {
            fontFamily: [
                'Montserrat',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ].join(','),
            h1: {
                fontSize: 'calc(1.39205rem + 1.7046vw)',
            },
            h2: {
                fontSize: 'calc(1.32625rem + 0.915vw)',
            },
            h3: {
                fontSize: 'calc(1.29589rem + 0.55065vw)',
            },
            h4: {
                fontSize: '1.225rem',
            },
            h5: {
                fontSize: '1.05rem',
            },
            h6: {
                fontSize: '875rem',
            },
        },
    };

    return (
        <ThemeProvider theme={darkOrLight === 'dark' ? createTheme(darkTheme) : createTheme(lightTheme)}>
            <CssBaseline enableColorScheme />
            <div className={styles.lsLayout}>
                <LeftSideBarAsync />
                <Navbar />
                <RightSideBar />
                <div className={styles.contentPage}>
                    <div className={styles.container}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};
